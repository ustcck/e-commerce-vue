/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ProductCategoryComponent from '@/entities/product-category/product-category.vue';
import ProductCategoryClass from '@/entities/product-category/product-category.component';
import ProductCategoryService from '@/entities/product-category/product-category.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-alert', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {}
  }
};

describe('Component Tests', () => {
  describe('ProductCategory Management Component', () => {
    let wrapper: Wrapper<ProductCategoryClass>;
    let comp: ProductCategoryClass;
    let productCategoryServiceStub: SinonStubbedInstance<ProductCategoryService>;

    beforeEach(() => {
      productCategoryServiceStub = sinon.createStubInstance<ProductCategoryService>(ProductCategoryService);
      productCategoryServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ProductCategoryClass>(ProductCategoryComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          productCategoryService: () => productCategoryServiceStub
        }
      });
      comp = wrapper.vm;
    });

    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Should call load all on init', async () => {
      // GIVEN
      productCategoryServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllProductCategorys();
      await comp.$nextTick();

      // THEN
      expect(productCategoryServiceStub.retrieve.called).toBeTruthy();
      expect(comp.productCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      productCategoryServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeProductCategory();
      await comp.$nextTick();

      // THEN
      expect(productCategoryServiceStub.delete.called).toBeTruthy();
      expect(productCategoryServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});

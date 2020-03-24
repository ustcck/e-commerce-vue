/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ProductCategoryDetailComponent from '@/entities/product-category/product-category-details.vue';
import ProductCategoryClass from '@/entities/product-category/product-category-details.component';
import ProductCategoryService from '@/entities/product-category/product-category.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('ProductCategory Management Detail Component', () => {
    let wrapper: Wrapper<ProductCategoryClass>;
    let comp: ProductCategoryClass;
    let productCategoryServiceStub: SinonStubbedInstance<ProductCategoryService>;

    beforeEach(() => {
      productCategoryServiceStub = sinon.createStubInstance<ProductCategoryService>(ProductCategoryService);

      wrapper = shallowMount<ProductCategoryClass>(ProductCategoryDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { productCategoryService: () => productCategoryServiceStub }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundProductCategory = { id: 123 };
        productCategoryServiceStub.find.resolves(foundProductCategory);

        // WHEN
        comp.retrieveProductCategory(123);
        await comp.$nextTick();

        // THEN
        expect(comp.productCategory).toBe(foundProductCategory);
      });
    });
  });
});

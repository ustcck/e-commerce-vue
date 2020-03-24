/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ProductOrderDetailComponent from '@/entities/product-order/product-order-details.vue';
import ProductOrderClass from '@/entities/product-order/product-order-details.component';
import ProductOrderService from '@/entities/product-order/product-order.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('ProductOrder Management Detail Component', () => {
    let wrapper: Wrapper<ProductOrderClass>;
    let comp: ProductOrderClass;
    let productOrderServiceStub: SinonStubbedInstance<ProductOrderService>;

    beforeEach(() => {
      productOrderServiceStub = sinon.createStubInstance<ProductOrderService>(ProductOrderService);

      wrapper = shallowMount<ProductOrderClass>(ProductOrderDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { productOrderService: () => productOrderServiceStub }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundProductOrder = { id: 123 };
        productOrderServiceStub.find.resolves(foundProductOrder);

        // WHEN
        comp.retrieveProductOrder(123);
        await comp.$nextTick();

        // THEN
        expect(comp.productOrder).toBe(foundProductOrder);
      });
    });
  });
});

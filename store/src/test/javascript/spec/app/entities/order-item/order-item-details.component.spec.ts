/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import OrderItemDetailComponent from '@/entities/order-item/order-item-details.vue';
import OrderItemClass from '@/entities/order-item/order-item-details.component';
import OrderItemService from '@/entities/order-item/order-item.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('OrderItem Management Detail Component', () => {
    let wrapper: Wrapper<OrderItemClass>;
    let comp: OrderItemClass;
    let orderItemServiceStub: SinonStubbedInstance<OrderItemService>;

    beforeEach(() => {
      orderItemServiceStub = sinon.createStubInstance<OrderItemService>(OrderItemService);

      wrapper = shallowMount<OrderItemClass>(OrderItemDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { orderItemService: () => orderItemServiceStub }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundOrderItem = { id: 123 };
        orderItemServiceStub.find.resolves(foundOrderItem);

        // WHEN
        comp.retrieveOrderItem(123);
        await comp.$nextTick();

        // THEN
        expect(comp.orderItem).toBe(foundOrderItem);
      });
    });
  });
});

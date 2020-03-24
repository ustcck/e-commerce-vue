/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import InvoiceDetailComponent from '@/entities/invoice/invoice/invoice-details.vue';
import InvoiceClass from '@/entities/invoice/invoice/invoice-details.component';
import InvoiceService from '@/entities/invoice/invoice/invoice.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Invoice Management Detail Component', () => {
    let wrapper: Wrapper<InvoiceClass>;
    let comp: InvoiceClass;
    let invoiceServiceStub: SinonStubbedInstance<InvoiceService>;

    beforeEach(() => {
      invoiceServiceStub = sinon.createStubInstance<InvoiceService>(InvoiceService);

      wrapper = shallowMount<InvoiceClass>(InvoiceDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { invoiceService: () => invoiceServiceStub }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundInvoice = { id: 123 };
        invoiceServiceStub.find.resolves(foundInvoice);

        // WHEN
        comp.retrieveInvoice(123);
        await comp.$nextTick();

        // THEN
        expect(comp.invoice).toBe(foundInvoice);
      });
    });
  });
});

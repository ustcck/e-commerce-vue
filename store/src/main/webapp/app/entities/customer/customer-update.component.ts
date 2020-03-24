import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import UserService from '@/admin/user-management/user-management.service';

import ProductOrderService from '../product-order/product-order.service';
import { IProductOrder } from '@/shared/model/product-order.model';

import AlertService from '@/shared/alert/alert.service';
import { ICustomer, Customer } from '@/shared/model/customer.model';
import CustomerService from './customer.service';

const validations: any = {
  customer: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    gender: {
      required
    },
    email: {
      required
    },
    phone: {
      required
    },
    addressLine1: {
      required
    },
    addressLine2: {},
    city: {
      required
    },
    country: {
      required
    },
    user: {
      required
    }
  }
};

@Component({
  validations
})
export default class CustomerUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('customerService') private customerService: () => CustomerService;
  public customer: ICustomer = new Customer();

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];

  @Inject('productOrderService') private productOrderService: () => ProductOrderService;

  public productOrders: IProductOrder[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.customerId) {
        vm.retrieveCustomer(to.params.customerId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.customer.id) {
      this.customerService()
        .update(this.customer)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('storeApp.customer.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.customerService()
        .create(this.customer)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('storeApp.customer.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveCustomer(customerId): void {
    this.customerService()
      .find(customerId)
      .then(res => {
        this.customer = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
    this.productOrderService()
      .retrieve()
      .then(res => {
        this.productOrders = res.data;
      });
  }
}

import Vue from 'vue';
import Component from 'vue-class-component';
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate' // for vue-router 2.2+
]);
import Router from 'vue-router';
import { Authority } from '@/shared/security/authority';
const Home = () => import('../core/home/home.vue');
const Error = () => import('../core/error/error.vue');
const Register = () => import('../account/register/register.vue');
const Activate = () => import('../account/activate/activate.vue');
const ResetPasswordInit = () => import('../account/reset-password/init/reset-password-init.vue');
const ResetPasswordFinish = () => import('../account/reset-password/finish/reset-password-finish.vue');
const ChangePassword = () => import('../account/change-password/change-password.vue');
const Settings = () => import('../account/settings/settings.vue');
const JhiUserManagementComponent = () => import('../admin/user-management/user-management.vue');
const JhiUserManagementViewComponent = () => import('../admin/user-management/user-management-view.vue');
const JhiUserManagementEditComponent = () => import('../admin/user-management/user-management-edit.vue');
const JhiConfigurationComponent = () => import('../admin/configuration/configuration.vue');
const JhiDocsComponent = () => import('../admin/docs/docs.vue');
const JhiHealthComponent = () => import('../admin/health/health.vue');
const JhiLogsComponent = () => import('../admin/logs/logs.vue');
const JhiAuditsComponent = () => import('../admin/audits/audits.vue');
const JhiMetricsComponent = () => import('../admin/metrics/metrics.vue');
const JhiGatewayComponent = () => import('../admin/gateway/gateway.vue');
/* tslint:disable */
// prettier-ignore
const Product = () => import('../entities/product/product.vue');
// prettier-ignore
const ProductUpdate = () => import('../entities/product/product-update.vue');
// prettier-ignore
const ProductDetails = () => import('../entities/product/product-details.vue');
// prettier-ignore
const ProductCategory = () => import('../entities/product-category/product-category.vue');
// prettier-ignore
const ProductCategoryUpdate = () => import('../entities/product-category/product-category-update.vue');
// prettier-ignore
const ProductCategoryDetails = () => import('../entities/product-category/product-category-details.vue');
// prettier-ignore
const Customer = () => import('../entities/customer/customer.vue');
// prettier-ignore
const CustomerUpdate = () => import('../entities/customer/customer-update.vue');
// prettier-ignore
const CustomerDetails = () => import('../entities/customer/customer-details.vue');
// prettier-ignore
const ProductOrder = () => import('../entities/product-order/product-order.vue');
// prettier-ignore
const ProductOrderUpdate = () => import('../entities/product-order/product-order-update.vue');
// prettier-ignore
const ProductOrderDetails = () => import('../entities/product-order/product-order-details.vue');
// prettier-ignore
const OrderItem = () => import('../entities/order-item/order-item.vue');
// prettier-ignore
const OrderItemUpdate = () => import('../entities/order-item/order-item-update.vue');
// prettier-ignore
const OrderItemDetails = () => import('../entities/order-item/order-item-details.vue');
// prettier-ignore
const Invoice = () => import('../entities/invoice/invoice/invoice.vue');
// prettier-ignore
const InvoiceUpdate = () => import('../entities/invoice/invoice/invoice-update.vue');
// prettier-ignore
const InvoiceDetails = () => import('../entities/invoice/invoice/invoice-details.vue');
// prettier-ignore
const Shipment = () => import('../entities/invoice/shipment/shipment.vue');
// prettier-ignore
const ShipmentUpdate = () => import('../entities/invoice/shipment/shipment-update.vue');
// prettier-ignore
const ShipmentDetails = () => import('../entities/invoice/shipment/shipment-details.vue');
// prettier-ignore
const Notification = () => import('../entities/notification/notification/notification.vue');
// prettier-ignore
const NotificationUpdate = () => import('../entities/notification/notification/notification-update.vue');
// prettier-ignore
const NotificationDetails = () => import('../entities/notification/notification/notification-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

Vue.use(Router);

// prettier-ignore
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/forbidden',
      name: 'Forbidden',
      component: Error,
      meta: { error403: true }
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: Error,
      meta: { error404: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/account/activate',
      name: 'Activate',
      component: Activate
    },
    {
      path: '/account/reset/request',
      name: 'ResetPasswordInit',
      component: ResetPasswordInit
    },
    {
      path: '/account/reset/finish',
      name: 'ResetPasswordFinish',
      component: ResetPasswordFinish
    },
    {
      path: '/account/password',
      name: 'ChangePassword',
      component: ChangePassword,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/account/settings',
      name: 'Settings',
      component: Settings,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/admin/user-management',
      name: 'JhiUser',
      component: JhiUserManagementComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/user-management/new',
      name: 'JhiUserCreate',
      component: JhiUserManagementEditComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/user-management/:userId/edit',
      name: 'JhiUserEdit',
      component: JhiUserManagementEditComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/user-management/:userId/view',
      name: 'JhiUserView',
      component: JhiUserManagementViewComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/docs',
      name: 'JhiDocsComponent',
      component: JhiDocsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/audits',
      name: 'JhiAuditsComponent',
      component: JhiAuditsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/jhi-health',
      name: 'JhiHealthComponent',
      component: JhiHealthComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/logs',
      name: 'JhiLogsComponent',
      component: JhiLogsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/jhi-metrics',
      name: 'JhiMetricsComponent',
      component: JhiMetricsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/jhi-configuration',
      name: 'JhiConfigurationComponent',
      component: JhiConfigurationComponent,
      meta: { authorities: [Authority.ADMIN] }
    }
,
    {
      path: '/admin/gateway',
      name: 'JhiGatewayComponent',
      component: JhiGatewayComponent,
      meta: { authorities: [Authority.ADMIN] }
    }
    ,
    {
      path: '/product',
      name: 'Product',
      component: Product,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/product/new',
      name: 'ProductCreate',
      component: ProductUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/product/:productId/edit',
      name: 'ProductEdit',
      component: ProductUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/product/:productId/view',
      name: 'ProductView',
      component: ProductDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/product-category',
      name: 'ProductCategory',
      component: ProductCategory,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/product-category/new',
      name: 'ProductCategoryCreate',
      component: ProductCategoryUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/product-category/:productCategoryId/edit',
      name: 'ProductCategoryEdit',
      component: ProductCategoryUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/product-category/:productCategoryId/view',
      name: 'ProductCategoryView',
      component: ProductCategoryDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/customer',
      name: 'Customer',
      component: Customer,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/customer/new',
      name: 'CustomerCreate',
      component: CustomerUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/customer/:customerId/edit',
      name: 'CustomerEdit',
      component: CustomerUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/customer/:customerId/view',
      name: 'CustomerView',
      component: CustomerDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/product-order',
      name: 'ProductOrder',
      component: ProductOrder,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/product-order/new',
      name: 'ProductOrderCreate',
      component: ProductOrderUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/product-order/:productOrderId/edit',
      name: 'ProductOrderEdit',
      component: ProductOrderUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/product-order/:productOrderId/view',
      name: 'ProductOrderView',
      component: ProductOrderDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/order-item',
      name: 'OrderItem',
      component: OrderItem,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/order-item/new',
      name: 'OrderItemCreate',
      component: OrderItemUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/order-item/:orderItemId/edit',
      name: 'OrderItemEdit',
      component: OrderItemUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/order-item/:orderItemId/view',
      name: 'OrderItemView',
      component: OrderItemDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/invoice',
      name: 'Invoice',
      component: Invoice,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/invoice/new',
      name: 'InvoiceCreate',
      component: InvoiceUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/invoice/:invoiceId/edit',
      name: 'InvoiceEdit',
      component: InvoiceUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/invoice/:invoiceId/view',
      name: 'InvoiceView',
      component: InvoiceDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/shipment',
      name: 'Shipment',
      component: Shipment,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/shipment/new',
      name: 'ShipmentCreate',
      component: ShipmentUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/shipment/:shipmentId/edit',
      name: 'ShipmentEdit',
      component: ShipmentUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/shipment/:shipmentId/view',
      name: 'ShipmentView',
      component: ShipmentDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/notification',
      name: 'Notification',
      component: Notification,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/notification/new',
      name: 'NotificationCreate',
      component: NotificationUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/notification/:notificationId/edit',
      name: 'NotificationEdit',
      component: NotificationUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/notification/:notificationId/view',
      name: 'NotificationView',
      component: NotificationDetails,
      meta: { authorities: [Authority.USER] }
    }
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ]
});

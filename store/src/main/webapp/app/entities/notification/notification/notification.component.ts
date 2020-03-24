import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { INotification } from '@/shared/model/notification/notification.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import NotificationService from './notification.service';

@Component
export default class Notification extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('notificationService') private notificationService: () => NotificationService;
  private removeId: number = null;

  public notifications: INotification[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllNotifications();
  }

  public clear(): void {
    this.retrieveAllNotifications();
  }

  public retrieveAllNotifications(): void {
    this.isFetching = true;

    this.notificationService()
      .retrieve()
      .then(
        res => {
          this.notifications = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: INotification): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeNotification(): void {
    this.notificationService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('storeApp.notificationNotification.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllNotifications();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}

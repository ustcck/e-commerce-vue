/* tslint:disable no-unused-expression */
import { browser, protractor } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import NotificationComponentsPage, { NotificationDeleteDialog } from './notification.page-object';
import NotificationUpdatePage from './notification-update.page-object';
import NotificationDetailsPage from './notification-details.page-object';

import {
  clear,
  click,
  getRecordsCount,
  isVisible,
  selectLastOption,
  waitUntilAllDisplayed,
  waitUntilAnyDisplayed,
  waitUntilCount,
  waitUntilDisplayed,
  waitUntilHidden
} from '../../../util/utils';

const expect = chai.expect;

describe('Notification e2e test', () => {
  let navBarPage: NavBarPage;
  let updatePage: NotificationUpdatePage;
  let detailsPage: NotificationDetailsPage;
  let listPage: NotificationComponentsPage;
  let deleteDialog: NotificationDeleteDialog;
  let beforeRecordsCount = 0;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    await navBarPage.login('admin', 'admin');
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });

  it('should load Notifications', async () => {
    await navBarPage.getEntityPage('notification');
    listPage = new NotificationComponentsPage();

    await waitUntilAllDisplayed([listPage.title, listPage.footer]);

    expect(await listPage.title.getText()).not.to.be.empty;
    expect(await listPage.createButton.isEnabled()).to.be.true;

    await waitUntilAnyDisplayed([listPage.noRecords, listPage.table]);
    beforeRecordsCount = (await isVisible(listPage.noRecords)) ? 0 : await getRecordsCount(listPage.table);
  });
  describe('Create flow', () => {
    it('should load create Notification page', async () => {
      await listPage.createButton.click();
      updatePage = new NotificationUpdatePage();

      await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

      expect(await updatePage.title.getAttribute('id')).to.match(/storeApp.notificationNotification.home.createOrEditLabel/);
    });

    it('should create and save Notifications', async () => {
      await updatePage.dateInput.sendKeys('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await updatePage.dateInput.getAttribute('value')).to.contain('2001-01-01T02:30');

      await updatePage.detailsInput.sendKeys('details');
      expect(await updatePage.detailsInput.getAttribute('value')).to.match(/details/);

      await updatePage.sentDateInput.sendKeys('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await updatePage.sentDateInput.getAttribute('value')).to.contain('2001-01-01T02:30');

      await selectLastOption(updatePage.formatSelect);

      await updatePage.userIdInput.sendKeys('5');
      expect(await updatePage.userIdInput.getAttribute('value')).to.eq('5');

      await updatePage.productIdInput.sendKeys('5');
      expect(await updatePage.productIdInput.getAttribute('value')).to.eq('5');

      expect(await updatePage.saveButton.isEnabled()).to.be.true;
      await updatePage.saveButton.click();

      await waitUntilHidden(updatePage.saveButton);
      expect(await isVisible(updatePage.saveButton)).to.be.false;

      await waitUntilDisplayed(listPage.successAlert);
      expect(await listPage.successAlert.isDisplayed()).to.be.true;

      await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      expect(await listPage.records.count()).to.eq(beforeRecordsCount + 1);
    });

    describe('Details, Update, Delete flow', () => {
      after(async () => {
        const deleteButton = listPage.getDeleteButton(listPage.records.last());
        await click(deleteButton);

        deleteDialog = new NotificationDeleteDialog();
        await waitUntilDisplayed(deleteDialog.dialog);

        expect(await deleteDialog.title.getAttribute('id')).to.match(/storeApp.notificationNotification.delete.question/);

        await click(deleteDialog.confirmButton);
        await waitUntilHidden(deleteDialog.dialog);

        expect(await isVisible(deleteDialog.dialog)).to.be.false;
        expect(await listPage.dangerAlert.isDisplayed()).to.be.true;

        await waitUntilCount(listPage.records, beforeRecordsCount);
        expect(await listPage.records.count()).to.eq(beforeRecordsCount);
      });

      it('should load details Notification page and fetch data', async () => {
        const detailsButton = listPage.getDetailsButton(listPage.records.last());
        await click(detailsButton);

        detailsPage = new NotificationDetailsPage();

        await waitUntilAllDisplayed([detailsPage.title, detailsPage.backButton, detailsPage.firstDetail]);

        expect(await detailsPage.title.getText()).not.to.be.empty;
        expect(await detailsPage.firstDetail.getText()).not.to.be.empty;

        await click(detailsPage.backButton);
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });

      it('should load edit Notification page, fetch data and update', async () => {
        const editButton = listPage.getEditButton(listPage.records.last());
        await click(editButton);

        await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

        expect(await updatePage.title.getText()).not.to.be.empty;

        await updatePage.dateInput.clear();
        await updatePage.dateInput.sendKeys('01/01/2019' + protractor.Key.TAB + '02:30AM');
        expect(await updatePage.dateInput.getAttribute('value')).to.contain('2019-01-01T02:30');

        await updatePage.detailsInput.clear();
        await updatePage.detailsInput.sendKeys('modified');
        expect(await updatePage.detailsInput.getAttribute('value')).to.match(/modified/);

        await updatePage.sentDateInput.clear();
        await updatePage.sentDateInput.sendKeys('01/01/2019' + protractor.Key.TAB + '02:30AM');
        expect(await updatePage.sentDateInput.getAttribute('value')).to.contain('2019-01-01T02:30');

        await clear(updatePage.userIdInput);
        await updatePage.userIdInput.sendKeys('6');
        expect(await updatePage.userIdInput.getAttribute('value')).to.eq('6');

        await clear(updatePage.productIdInput);
        await updatePage.productIdInput.sendKeys('6');
        expect(await updatePage.productIdInput.getAttribute('value')).to.eq('6');

        await updatePage.saveButton.click();

        await waitUntilHidden(updatePage.saveButton);

        expect(await isVisible(updatePage.saveButton)).to.be.false;
        expect(await listPage.infoAlert.isDisplayed()).to.be.true;
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });
    });
  });
});

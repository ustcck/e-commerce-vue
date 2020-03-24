<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('storeApp.invoiceShipment.home.title')" id="shipment-heading">Shipments</span>
            <router-link :to="{name: 'ShipmentCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-shipment">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('storeApp.invoiceShipment.home.createLabel')">
                    Create a new Shipment
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && shipments && shipments.length === 0">
            <span v-text="$t('storeApp.invoiceShipment.home.notFound')">No shipments found</span>
        </div>
        <div class="table-responsive" v-if="shipments && shipments.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('trackingCode')"><span v-text="$t('storeApp.invoiceShipment.trackingCode')">Tracking Code</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'trackingCode'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('date')"><span v-text="$t('storeApp.invoiceShipment.date')">Date</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'date'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('details')"><span v-text="$t('storeApp.invoiceShipment.details')">Details</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'details'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('invoice.code')"><span v-text="$t('storeApp.invoiceShipment.invoice')">Invoice</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'invoice.code'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="shipment in shipments"
                    :key="shipment.id">
                    <td>
                        <router-link :to="{name: 'ShipmentView', params: {shipmentId: shipment.id}}">{{shipment.id}}</router-link>
                    </td>
                    <td>{{shipment.trackingCode}}</td>
                    <td>{{shipment.date ? $d(Date.parse(shipment.date), 'short') : ''}}</td>
                    <td>{{shipment.details}}</td>
                    <td>
                        <div v-if="shipment.invoice">
                            <router-link :to="{name: 'InvoiceView', params: {invoiceId: shipment.invoice.id}}">{{shipment.invoice.code}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'ShipmentView', params: {shipmentId: shipment.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'ShipmentEdit', params: {shipmentId: shipment.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(shipment)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="storeApp.invoiceShipment.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-shipment-heading" v-text="$t('storeApp.invoiceShipment.delete.question', {'id': removeId})">Are you sure you want to delete this Shipment?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-shipment" v-text="$t('entity.action.delete')" v-on:click="removeShipment()">Delete</button>
            </div>
        </b-modal>
        <div v-show="shipments && shipments.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./shipment.component.ts">
</script>

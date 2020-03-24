<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('storeApp.customer.home.title')" id="customer-heading">Customers</span>
            <router-link :to="{name: 'CustomerCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-customer">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('storeApp.customer.home.createLabel')">
                    Create a new Customer
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
        <div class="alert alert-warning" v-if="!isFetching && customers && customers.length === 0">
            <span v-text="$t('storeApp.customer.home.notFound')">No customers found</span>
        </div>
        <div class="table-responsive" v-if="customers && customers.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('firstName')"><span v-text="$t('storeApp.customer.firstName')">First Name</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'firstName'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('lastName')"><span v-text="$t('storeApp.customer.lastName')">Last Name</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'lastName'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('gender')"><span v-text="$t('storeApp.customer.gender')">Gender</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'gender'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('email')"><span v-text="$t('storeApp.customer.email')">Email</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'email'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('phone')"><span v-text="$t('storeApp.customer.phone')">Phone</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'phone'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('addressLine1')"><span v-text="$t('storeApp.customer.addressLine1')">Address Line 1</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'addressLine1'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('addressLine2')"><span v-text="$t('storeApp.customer.addressLine2')">Address Line 2</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'addressLine2'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('city')"><span v-text="$t('storeApp.customer.city')">City</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'city'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('country')"><span v-text="$t('storeApp.customer.country')">Country</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'country'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('user.login')"><span v-text="$t('storeApp.customer.user')">User</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'user.login'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="customer in customers"
                    :key="customer.id">
                    <td>
                        <router-link :to="{name: 'CustomerView', params: {customerId: customer.id}}">{{customer.id}}</router-link>
                    </td>
                    <td>{{customer.firstName}}</td>
                    <td>{{customer.lastName}}</td>
                    <td v-text="$t('storeApp.Gender.' + customer.gender)">{{customer.gender}}</td>
                    <td>{{customer.email}}</td>
                    <td>{{customer.phone}}</td>
                    <td>{{customer.addressLine1}}</td>
                    <td>{{customer.addressLine2}}</td>
                    <td>{{customer.city}}</td>
                    <td>{{customer.country}}</td>
                    <td>
                        {{customer.user ? customer.user.login : ''}}
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'CustomerView', params: {customerId: customer.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'CustomerEdit', params: {customerId: customer.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(customer)"
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
            <span slot="modal-title"><span id="storeApp.customer.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-customer-heading" v-text="$t('storeApp.customer.delete.question', {'id': removeId})">Are you sure you want to delete this Customer?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-customer" v-text="$t('entity.action.delete')" v-on:click="removeCustomer()">Delete</button>
            </div>
        </b-modal>
        <div v-show="customers && customers.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./customer.component.ts">
</script>

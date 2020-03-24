import { IInvoice } from '@/shared/model/invoice/invoice.model';

export interface IShipment {
  id?: number;
  trackingCode?: string;
  date?: Date;
  details?: string;
  invoice?: IInvoice;
}

export class Shipment implements IShipment {
  constructor(public id?: number, public trackingCode?: string, public date?: Date, public details?: string, public invoice?: IInvoice) {}
}

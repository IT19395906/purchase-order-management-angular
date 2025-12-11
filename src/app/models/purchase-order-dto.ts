export enum POStatus {
  Draft = 'Draft',
  Approved = 'Approved',
  Shipped = 'Shipped',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}

export interface PurchaseOrderDto {
  id?: number;
  poNumber: string;
  description: string;
  supplierName: string;
  orderDate: string;
  totalAmount: number;
  status: 'Draft' | 'Approved' | 'Shipped' | 'Completed' | 'Cancelled';
}

export interface PurchaseOrderDto {
  id?: number;
  poNumber: string;
  description: string;
  supplierName: string;
  orderDate: string;
  totalAmount: number;
  status: 'Draft' | 'Approved' | 'Shipped' | 'Completed' | 'Cancelled';
}

import { Component, OnInit } from '@angular/core';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { PurchaseOrderDto } from '../../models/purchase-order-dto';

@Component({
  selector: 'app-purchase-order-list',
  standalone: false,
  templateUrl: './purchase-order-list.component.html',
  styleUrl: './purchase-order-list.component.css'
})
export class PurchaseOrderListComponent implements OnInit {

  purchaseOrders: PurchaseOrderDto[] = [];
  totalItems: number = 0;
  page: number = 1;
  pageSize: number = 10;
  supplier: string = '';
  status: string = '';

  constructor(private poService: PurchaseOrderService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  onFilterChange() {
    this.page = 1;
    this.getAllOrders();
  }

  onPageChange(event: any) {
    this.page = event.target.value;
    this.getAllOrders();
  }

  getAllOrders() {
    this.poService.getOrdersAll(this.supplier, this.status, this.page, this.pageSize).subscribe(response => {
      this.purchaseOrders = response?.data;
      this.totalItems = response?.total;
    });
  }

  deleteOrder(id: number) {
    if (confirm(`Are you sure you want to delete order ${id}?`)) {
      this.poService.deleteOrder(id).subscribe(() => {
        this.getAllOrders();
      });
    }
  }
}

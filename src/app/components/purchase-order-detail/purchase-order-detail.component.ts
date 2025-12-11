import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { PurchaseOrderDto } from '../../models/purchase-order-dto';

@Component({
  selector: 'app-purchase-order-detail',
  standalone: false,
  templateUrl: './purchase-order-detail.component.html',
  styleUrl: './purchase-order-detail.component.css'
})
export class PurchaseOrderDetailComponent implements OnInit {

  purchaseOrder: PurchaseOrderDto | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private poService: PurchaseOrderService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.fetchOrder(id);
    } else {
      this.error = 'invalid id';
      this.loading = false;
    }
  }

  fetchOrder(id: number) {
    this.poService.getOrdersById(id).subscribe(
      (response) => {
        this.purchaseOrder = response;
        this.loading = false;
      }, (error) => {
        this.error = 'fetch order failed';
        this.loading = false;
      }
    );
  }

  deleteOrder() {
    if (this.purchaseOrder && this.purchaseOrder.id && confirm(`Are you sure want to delete this order ${this.purchaseOrder.id}?`)) {
      this.poService.deleteOrder(this.purchaseOrder.id).subscribe(
        (response) => {
          this.router.navigate(['/orders']);
        }, (error) => {
          this.error = 'failed to delete order';
        });
    }
  }
}

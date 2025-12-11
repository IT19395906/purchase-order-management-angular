import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { PurchaseOrderDto } from '../../models/purchase-order-dto';

@Component({
  selector: 'app-purchase-order-form',
  standalone: false,
  templateUrl: './purchase-order-form.component.html',
  styleUrl: './purchase-order-form.component.css'
})
export class PurchaseOrderFormComponent implements OnInit {

  purchaseOrder: PurchaseOrderDto = {
    id: 0,
    poNumber: '',
    description: '',
    supplierName: '',
    orderDate: '',
    totalAmount: 0,
    status: 'Draft'
  };
  isEditMode: boolean = false;
  error: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private poService: PurchaseOrderService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.getOrderById(Number(id));
    }
  }

  getOrderById(id: number) {
    this.poService.getOrdersById(id).subscribe(
      (response) => {
        this.purchaseOrder = response;
      }, (error) => {
        this.error = 'failed to load order';
      });
  }

  createOrder() {
    this.poService.createOrder(this.purchaseOrder).subscribe(
      (response) => {
        this.router.navigate(['/orders']);
      }, (error) => {
        this.error = 'failed to create order';
      });
  }

  updateOrder() {
    if (this.purchaseOrder && this.purchaseOrder.id) {
      this.poService.updateOrder(this.purchaseOrder.id, this.purchaseOrder).subscribe(
        (response) => {
          this.router.navigate(['/orders']);
        }, (error) => {
          this.error = 'failed to update existing order';
        });
    }
  }

  save() {
    if (this.isEditMode) {
      this.updateOrder();
    } else {
      this.createOrder();
    }
  }
}

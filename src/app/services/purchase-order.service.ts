import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PurchaseOrderDto } from '../models/purchase-order-dto';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  private apiUrl = 'http://localhost:5000/api/purchaseorders';
  constructor(private http: HttpClient) { }

  createOrder(order: PurchaseOrderDto): Observable<PurchaseOrderDto> {
    return this.http.post<PurchaseOrderDto>(`${this.apiUrl}/create`, order);
  }

  getOrdersAll(supplier?: string, status?: string, page: number = 1, pageSize: number = 10): Observable<any> {
    const params: any = {supplier,status,page,pageSize};
    return this.http.get<any>(this.apiUrl, { params });
  }

  getOrdersById(id: number): Observable<PurchaseOrderDto> {
    return this.http.get<PurchaseOrderDto>(`${this.apiUrl}/byId/${id}`);
  }

  updateOrder(id: number, order: PurchaseOrderDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update/${id}`, order);
  }
  
  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}


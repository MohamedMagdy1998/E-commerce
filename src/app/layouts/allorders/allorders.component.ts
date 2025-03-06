import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { UserOrders } from '../../shared/interfaces/user-orders';

@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {

  private readonly ordersService = inject(OrdersService)
  
  cartOwnerId:string = '';
  userOrders!: UserOrders[] ;

  


  ngOnInit(): void {
   this.getAllOrders();
  }

  getAllOrders():void
  {
    this.cartOwnerId= localStorage.getItem('cartOwnerId')!;
    
     this.ordersService.getUserOrders( this.cartOwnerId).subscribe({
      next:(response)=>{
        console.log(response);
        
       
       this.userOrders = response; 
        
      },
     
    })
  }

}

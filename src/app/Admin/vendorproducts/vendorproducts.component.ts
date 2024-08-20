import { Component, OnInit } from '@angular/core';
import { EkartadminService } from 'app/Services/ekartadmin.service';
declare const $: any;


@Component({
  selector: 'vendorproducts',
  templateUrl: './vendorproducts.component.html',
  styleUrls: ['./vendorproducts.component.css']
})
export class VendorproductsComponent implements OnInit {
  vendorProductList: any;
  viewVendorProduct: any;
  // s:any = 1;
  // serialCount : Number = 5;
  

  constructor(private ekartService : EkartadminService) { }

  ngOnInit(): void {
    this.getVendorProductDetails();
  }

  getVendorProductDetails(){
    this.ekartService.getVendorProduct().subscribe((vendorResp) =>{
      if(vendorResp.StatusCode==200){
        this.vendorProductList = vendorResp.vendorProductsList
        console.log('vendor', this.vendorProductList);
      }
    })
  }

  onView(data){
    $("#ViewProductModal").modal("show");

    this.viewVendorProduct = data;
  }

  // indexNo(index,pageindex){
// console.log(index,pageindex)
// let count = 5;
// if(pageindex==1){
// return index+1
// }else{
//  this.serialCount = this.serialCount + index + 1

//   return this.serialCount
// }
//   }

}

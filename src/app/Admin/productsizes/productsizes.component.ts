import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EkartadminService } from 'app/Services/ekartadmin.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare const $:any

@Component({
  selector: 'productsizes',
  templateUrl: './productsizes.component.html',
  styleUrls: ['./productsizes.component.css']
})
export class ProductsizesComponent implements OnInit {
  addproductSize: FormGroup;
  getallProductsizes: any;
  sizeId: any;
  editSizeForm: any;
  public hasError: boolean = false;



  constructor(private emKartServices: EkartadminService, private router: Router) { 
    this.addproductSize = new FormGroup ({
      size: new FormControl('', [Validators.required])
    })

    this.editSizeForm = new FormGroup ({
      editSize: new FormControl('', [Validators.required])

    })
  }

  ngOnInit(): void {
    this.getallSizes();
  }

  addsize() {
    let prodsizeObj = {
      size: this.addproductSize.value.size
    }

    this.emKartServices.addproductSizes(prodsizeObj).subscribe((Resp) => {
      if(Resp.statusCode == 200) {
        console.log("testerdsd")
        Swal.fire({
          title: 'success',
          text: 'Product size added successfully',
          timer: 3000,
          showConfirmButton: false
        })
        $('#exampleModal').modal('hide');
        this.addproductSize.reset();
        this.getallSizes();
      }  else {
        console.log("error");
        Swal.fire({
          icon: "error",
          text: "Please Add Unique Product Size",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    })
      // else {
      //   console.log("Error")
      // }
  
  }

  getallSizes() {
    this.emKartServices.getproductSizes().subscribe((allsizesResp) => {
      if(allsizesResp.StatusCode == 200) {
        this.getallProductsizes = allsizesResp.Data.sizesList
        console.log("List", this.getallProductsizes)
      }
    })
  }

  
  Delete(item){
    console.log('id', item);
    let deleteObj = {
      sizeId: item.sizeId,
    };
    Swal.fire({
      title: "Are you Sure?",
      text: "Want To Delete This Item..!",
      icon: "warning",
      confirmButtonText: "Yes, Delete it",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.emKartServices.productSizeDelete(deleteObj).subscribe((deleteResp) => {
          if (deleteResp.statusCode == 200) {
            Swal.fire({
              icon: "success",
              text: "Product Size Deleted Successfully",
              showConfirmButton: false,
              timer: 2000,
            });
          }
          this.getallSizes();
        });
      } else if (result.isDenied) {
        Swal.fire("something went wrong..!", "error");
      }
    });

  }

  OnEdit(data){
    $("#EditProductModal").modal("show");
    console.log("data", data)
    this.editSizeForm.controls["editSize"].setValue(data.size);

    this.sizeId = data.sizeId;
    console.log("lengthId",this.sizeId)
  }

  UpdateSize(){
    if(this.editSizeForm.valid){
      let updateLengthObj = {
        sizeId : this.sizeId,
        size : this.editSizeForm.value.editSize,
      }

      this.emKartServices.editproductSize(updateLengthObj).subscribe((updateResp) =>{
        if(updateResp.statusCode == 200){
          console.log("success")
          Swal.fire({
            icon:'success',
            text:'Product Size Updated Successfuly',
            timer: 2000,
            showConfirmButton: false
          })
          $("#EditProductModal").modal("hide");
          this.getallSizes();
        }
        else {
          console.log("error");
          Swal.fire({
            icon: "error",
            text: "Please update Unique Product Size",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      })




    }

  }

  modelClose(){
    this.addproductSize.reset();
  }

}

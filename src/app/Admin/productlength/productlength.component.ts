import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EkartadminService } from 'app/Services/ekartadmin.service';
import Swal from 'sweetalert2';
declare const $: any;

@Component({
  selector: 'productlength',
  templateUrl: './productlength.component.html',
  styleUrls: ['./productlength.component.css']
})
export class ProductlengthComponent implements OnInit {
  addingLength: FormGroup;
  getlenghts: any;
  editLengthForm: FormGroup;
  public hasError: boolean = false;
  lengthId: any;


  constructor(private EMkartServices: EkartadminService) { 
    this.addingLength = new FormGroup({
      length: new FormControl('', [Validators.required])
    })

    this.editLengthForm = new FormGroup({
      editlength: new FormControl('',[Validators.required])
    })
   }

  ngOnInit(): void {
    this.getallProductLenghts();
  }

  createLength() {
    let lengthObj = {
      length: this.addingLength.value.length
    }

    // console.log("lengthObj", lengthObj)

    this.EMkartServices.addproductLength(lengthObj).subscribe((lenghtResp) => {
      if(lenghtResp.statusCode == 200) {
        Swal.fire({
          icon: 'success',
          text: 'Length Added Successfully',
          timer: 2000,
          showConfirmButton: true
        })
        $('#exampleModal').modal('hide');
        this.addingLength.reset();
        this.getallProductLenghts();
      } else {
        console.log("error");
        Swal.fire({
          icon: "error",
          text: "Please Add Unique product Length",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    })
      // else {
      //   console.log("Error");
      //   Swal.fire('Something went wrong')
      // }
    
  }

  getallProductLenghts() {
    this.EMkartServices.getallproductlenghts().subscribe((getlengthResp) => {
      if(getlengthResp.StatusCode == 200) {
        this.getlenghts = getlengthResp.Data.lengthList;
      }
    })
  }

  Delete(item){
    console.log('id', item);
    let deleteObj = {
      lengthId: item.lengthId,
    };
    Swal.fire({
      title: "Are you Sure?",
      text: "Want To Delete This Item..!",
      icon: "warning",
      confirmButtonText: "Yes, Delete it",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.EMkartServices.productLengthDelete(deleteObj).subscribe((deleteResp) => {
          if (deleteResp.statusCode == 200) {
            Swal.fire({
              icon: "success",
              text: "Product Length Deleted Successfully",
              showConfirmButton: false,
              timer: 2000,
            });
          }
          this.getallProductLenghts();
        });
      } else if (result.isDenied) {
        Swal.fire("something went wrong..!", "error");
      }
    });

  }

  OnEdit(data){
    $("#EditProductModal").modal("show");
    console.log("data", data)
    this.editLengthForm.controls["editlength"].setValue(data.length);

    this.lengthId = data.lengthId;
    console.log("lengthId",this.lengthId)
  }

  UpdateLength(){
    if(this.editLengthForm.valid){
      let updateLengthObj = {
        lengthId : this.lengthId,
        length : this.editLengthForm.value.editlength,

      }

      this.EMkartServices.editProductLength(updateLengthObj).subscribe((updateResp) =>{
        if(updateResp.statusCode == 200){
          console.log("success")
          Swal.fire({
            icon:'success',
            text:'Language Updated Successfuly',
            timer: 2000,
            showConfirmButton: false
          })
          $("#EditProductModal").modal("hide");
          this.getallProductLenghts();
        } else {
          console.log("error");
          Swal.fire({
            icon: "error",
            text: "Please Update Unique product Length",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      })




    }

  }

  modelClose(){
    this.addingLength.reset();
  }

}

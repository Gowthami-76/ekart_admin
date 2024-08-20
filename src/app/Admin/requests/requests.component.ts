import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EkartadminService } from 'app/Services/ekartadmin.service';
import Swal from 'sweetalert2';
declare const $: any;


@Component({
  selector: 'requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  requestData: any;
  requestView: any;
  vendorProductList: any;
  storedVendorDetails: Object = {}
  reqData: any;
  requestUserData: any;
  locationData: any;
  locationView: any;
  reqlocationData: any;


  constructor(private ekartServices: EkartadminService,
    private router: Router) { }

  ngOnInit(): void {
    this.getRequest();
    this.getLocation();
  }

  getRequest(){
    this.ekartServices.getRequestList().subscribe((requestResp) => {
      if(requestResp.statusCode == 200){
        this.requestData = requestResp.data
        console.log(this.requestData)
        // this.requestUserData = requestResp.data.userId
        // console.log(this.requestUserData, "efff")
      }

    })
  }

  getLocation(){
    this.ekartServices.getLocationList().subscribe((locationResp) => {
      if(locationResp.statusCode == 200){
        this.locationData = locationResp.data
        console.log(this.locationData)
        // this.requestUserData = requestResp.data.userId
        // console.log(this.requestUserData, "efff")
      }

    })
  }

  // product request view
  onView(data){
    $("#requestViewModal").modal("show");
    this.requestView = data;
  }

  // location Request view

  onViewLocation(data){
    $("#locationViewModal").modal("show");
    this.locationView = data;
  }


  // product request delete

  Ondelete(item){
    console.log('id', item);
    const deleteObj = {
      reqId: item.reqId,
    };
    Swal.fire({
      title: "Are you Sure?",
      text: "Want To Delete This Item..!",
      icon: "warning",
      confirmButtonText: "Yes, Delete it",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.ekartServices.RequestDelete(deleteObj).subscribe((deleteResp) => {
          if (deleteResp.statusCode == 200) {
            Swal.fire({
              icon: "success",
              text: "Requests Deleted Successfully",
              showConfirmButton: false,
              timer: 2000,
            });
          }
          this.getRequest();
        });
      } else if (result.isDenied) {
        Swal.fire("something went wrong..!", "error");
      }
    });

  }


  // location request delete

  OndeleteLocation(item){
    console.log('id', item);
    const deleteObj = {
      reqId: item.reqId,
    };
    Swal.fire({
      title: "Are you Sure?",
      text: "Want To Delete This Item..!",
      icon: "warning",
      confirmButtonText: "Yes, Delete it",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.ekartServices.LocationDelete(deleteObj).subscribe((deleteResp) => {
          if (deleteResp.statusCode == 200) {
            Swal.fire({
              icon: "success",
              text: "Requests Deleted Successfully",
              showConfirmButton: false,
              timer: 2000,
            });
          }
          this.getLocation();
        });
      } else if (result.isDenied) {
        Swal.fire("something went wrong..!", "error");
      }
    });

  }


  getVenderDetails(requests){
    this.storedVendorDetails = requests
    this.getVendorProductDetails(requests);
      }
      getVendorProductDetails(requests){
        let params ={
          userId: requests['userId']
        }
        this.ekartServices.getVendorDetailsById(params).subscribe((vendorResp) =>{
          if(vendorResp.statusCode==200){
            this.vendorProductList = vendorResp.userFeedbackResponse
            console.log('vendor', this.vendorProductList);
          }
          $("#exampleModalCenter").modal("show");
        })
      }

      requestVendorDetails(requests){
        this.reqData= requests.userId[0]
        // console.log(this.reqData)
        $("#requestModalDetails").modal("show");


      }

      modalRequestClose(){
        this.reqData={};

      }

      getlocationDetails(locationReq){
        this.reqlocationData= locationReq.userId[0]
        // console.log(this.reqData)
        $("#locationModalDetails").modal("show");
      }

      modalLocationClose(){
        this.reqlocationData={};
      }

}

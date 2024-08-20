import { Component, OnInit } from '@angular/core';
import { EkartadminService } from 'app/Services/ekartadmin.service';
import Swal from 'sweetalert2';
declare const $: any;


@Component({
  selector: 'feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbackServices: any;
  vendorProductList: any;
  storedVendorDetails: Object = {}

  constructor(private EMKartServices: EkartadminService) { }

  ngOnInit(): void {
    this.getFeedback();
  }

  getFeedback() {
    this.EMKartServices.getFeedbacklist().subscribe((getfeedbackResp) => {
      if(getfeedbackResp.statusCode == 200) {
        this.feedbackServices = getfeedbackResp.data
      }
    })
  }

  getVenderDetails(feedbacklist){
    this.storedVendorDetails = feedbacklist
    this.getVendorProductDetails(feedbacklist);
      }
      getVendorProductDetails(feedbacklist){
        let params ={
          userId: feedbacklist['userId']
        }
        this.EMKartServices.getVendorDetailsById(params).subscribe((vendorResp) =>{
          if(vendorResp.statusCode==200){
            this.vendorProductList = vendorResp.userFeedbackResponse
            console.log('vendor', this.vendorProductList);
          }
          $("#exampleModalCenter").modal("show");
        })
      }

      delete(item) {
        console.log("id", item);
        let deleteObj = {
          _id: item._id,
        };
        Swal.fire({
          title: "Are you Sure?",
          text: "Want To Delete This Item..!",
          icon: "warning",
          confirmButtonText: "Yes, Delete it",
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            this.EMKartServices.deleteFeedBack(deleteObj).subscribe((deleteResp) => {
              if (deleteResp.statusCode == 200) {
                Swal.fire({
                  icon: "success",
                  text: "FeedBack Deleted Successfully",
                  showConfirmButton: false,
                  timer: 2000,
                });
              }
              this.getFeedback();
            });
          } else if (result.isDenied) {
            Swal.fire("something went wrong..!", "error");
          }
        });
      }

}

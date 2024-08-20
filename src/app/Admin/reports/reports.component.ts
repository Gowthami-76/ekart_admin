import { Component, OnInit } from '@angular/core';
import { EkartadminService } from 'app/Services/ekartadmin.service';
import Swal from 'sweetalert2';
declare const $: any;


@Component({
  selector: 'reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  ReportsList: any;
  vendorProductList: any;
  storedVendorDetails: Object = {}

  constructor(private EMkartServices: EkartadminService) { }

  ngOnInit(): void {
    this.getReports();
  }

  getReports() {
    this.EMkartServices.getRepots().subscribe((reportsResp) => {
      if(reportsResp.statusCode == 200) {
        this.ReportsList = reportsResp.data
      }
    })
  }

  getVenderDetails(reports){
    this.storedVendorDetails = reports
    this.getVendorProductDetails(reports);
      }
      getVendorProductDetails(reports){
        let params ={
          userId: reports['userId']
        }
        this.EMkartServices.getVendorDetailsById(params).subscribe((vendorResp) =>{
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
          reportId: item.reportId,
        };
        Swal.fire({
          title: "Are you Sure?",
          text: "Want To Delete This Item..!",
          icon: "warning",
          confirmButtonText: "Yes, Delete it",
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            this.EMkartServices.deleteRequest(deleteObj).subscribe((deleteResp) => {
              if (deleteResp.statusCode == 200) {
                Swal.fire({
                  icon: "success",
                  text: "Request Deleted Successfully",
                  showConfirmButton: false,
                  timer: 2000,
                });
              }
              this.getReports();
            });
          } else if (result.isDenied) {
            Swal.fire("something went wrong..!", "error");
          }
        });
      }

}

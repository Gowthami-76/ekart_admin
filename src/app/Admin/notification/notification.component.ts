import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EkartadminService } from "app/Services/ekartadmin.service";
import Swal from "sweetalert2";
declare const $: any;

@Component({
  selector: "notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.css"],
})
export class NotificationComponent implements OnInit {
  hasError: any = false;
  createnotification: FormGroup;
  EMkartServices: any;
  getlocations: any;
  getavaillocations: any;
  getprimaryLocations: any;
  listuser: any;
  dropdownSettings: {
    idField: string;
    textField: string;
    singleSelection: boolean;
    allowSearchFilter: boolean;
  };
  searchKey: String = "";
  searchList: any;
  notificationUserDetails: Array<any> = [];
  dropdownSettingss: {
    idField: string;
    textField: string;
    singleSelection: boolean;
    allowSearchFilter: boolean;
  };
  userStatusDetails: any;
  notifyDetails: any;
  arrayUserIds: any;
  notificationView: any;

  constructor(private EmkartServices: EkartadminService) {
    this.createnotification = new FormGroup({
      searchUser: new FormControl("", [Validators.required]),
      msg: new FormControl("", [Validators.required]),
      selectLocation: new FormControl("", [Validators.required]),
      date: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getPushNotification();
    this.getUsers();
    this.userStatus();

    this.dropdownSettings = {
      idField: "userId",
      textField: "firstName",
      singleSelection: false,
      allowSearchFilter: true,
    };

    this.dropdownSettingss = {
      idField: "userId",
      textField: "primaryLocation",
      singleSelection: false,
      allowSearchFilter: true,
    };
  }

  getUsers() {
    this.EmkartServices.UsersList().subscribe((getResp) => {
      if (getResp.statusCode == 200) {
        this.listuser = getResp.Data;
        console.log("list users", this.listuser);
      }
    });

    // createNotif() {
    //   // let notiflocObj = {
    //   //   api1: this.createnotification.value.selectState,
    //   //   api2: this.createnotification.value.selectState
    //   // }

    //   // console.log("obj", notiflocObj)

    //   // this.EmkartServices.locationAdding(DistrictObj).subscribe((DistrictResp) => {
    //   //   if(DistrictResp.statusCode == 200) {
    //   //     Swal.fire({
    //   //       icon: 'success',
    //   //       text: 'District Successfully Added',
    //   //       showConfirmButton: false,
    //   //       timer: 2500
    //   //     })
    //   //     this.districtaddModal.reset();
    //   //     $('#exampleModal').modal('hide');
    //   //     this.getDistricts();
    //   //   }
    //   //   else {
    //   //     console.log("error")
    //   //   }
    //   // })
    // }
  }

  getPushNotification() {
    this.EmkartServices.getNotificationDetails().subscribe((getResp) => {
      if (getResp.statusCode == 200) {
        this.notifyDetails = getResp.data;
        console.log("notify details", this.notifyDetails);
      }
    });
  }

  searchProduct() {
    let productData = {
      productName2: this.searchKey,
      productName1: this.searchKey,
      productName: this.searchKey,
      productAliasName: this.searchKey,
    };
    // console.log('search', this.searchKey)
    this.EmkartServices.searchUser(productData).subscribe((prodResp) => {
      if (prodResp.statusCode == 200) {
        this.searchList = prodResp.data.details;
      }
    });
  }

  userStatus() {
    let params = {
      status: "1",
    };
    this.EmkartServices.getUserStatusDetails(params).subscribe((dataResp) => {
      if (dataResp.statusCode) {
        this.userStatusDetails = dataResp.userStatusResponse;
      } else {
        this.userStatusDetails;
      }
    });
  }

  userSelect() {
    console.log(this.createnotification.get("selectLocation").value,"userId");
    this.arrayUserIds = this.createnotification
      .get("selectLocation")
      .value.map((e) => {
        return e.userId;
      });
    let params = {
      userId: this.arrayUserIds,
    };
    console.log(params, "params")
    this.EmkartServices.notificationGetUserDetails(params).subscribe(
      (dataRes) => {
        if (dataRes.statusCode == 200) {
          this.notificationUserDetails = dataRes.data;
        } else {
          this.notificationUserDetails = [];
        }
      }
    );
  }

  sentNotification() {
    console.log(this.notificationUserDetails);
    let arrayOfTokens = this.notificationUserDetails.map((e) => {
      return e.token;
    });
    console.log(this.createnotification.get("msg").value);
    console.log(
      this.notificationUserDetails && this.createnotification.get("msg").value
    );

    if (
      this.notificationUserDetails &&
      this.createnotification.get("msg").value
    ) {
      let params = {
        title: "",
        body: this.createnotification.get("msg").value,
        token: arrayOfTokens,
        userId: this.arrayUserIds,
      };

      this.EmkartServices.bulkNotificationSentByUser(params).subscribe(
        (dataRes) => {
          console.log(dataRes);
          if (dataRes) {
            this.createnotification.reset();
            //  this.notificationUserDetails = dataRes.data;
            alert("Msg Sent Successfully");
          } else {
            // this.notificationUserDetails = {}
          }
        }
      );
    }
  }

  onView(data){
    $("#notifyViewModal").modal("show");
    console.log("data", data)
    this.notificationView = data;
  }

  onDelete(item){
    console.log(item)
    let deleteObj = {
      _id: item._id,
    };
    Swal.fire({
      title: "Are You Sure?",
      text: "Want To Delete This Item..!",
      icon: "warning",
      confirmButtonText: "Yes, Delete it",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.EmkartServices.deleteNotificationAdmin(deleteObj).subscribe((deleteResp) => {
          // console.log(deleteResp)
          if (deleteResp.statusCode == 200) {
            // console.log("kumar");
            Swal.fire({
              icon: "success",
              text: "State successfully deleted",
              showConfirmButton: false,
              timer: 3000,
            });
            this.getPushNotification();
          } else {
            Swal.fire("Something went wrong...!");

          }
        });
      }
    });
    // });
  }
}

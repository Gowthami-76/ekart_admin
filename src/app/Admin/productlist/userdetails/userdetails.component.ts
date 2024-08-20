import { Component, OnInit } from "@angular/core";
import { EkartadminService } from "app/Services/ekartadmin.service";
import { Router } from "@angular/router";
import { environment } from "environments/environment";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import Swal from "sweetalert2";
import { isEmpty } from "rxjs";
import { element } from "protractor";
declare const $: any;

@Component({
  selector: "userdetails",
  templateUrl: "./userdetails.component.html",
  styleUrls: ["./userdetails.component.css"],
})
export class UserdetailsComponent implements OnInit {
  usersList: any;
  UserDetailsView: any;
  public hasError: boolean = false;

  BaseUrl: string = environment.BaseUrl;
  vendorForm: FormGroup;
  imageFile: any;
  imageFile1: any;
  editvendorForm: FormGroup;
  EditVendorForm: any;
  userId: any;
  editingImage: this;
  editingentityImage: any;
  vendorProductList: any;
  storedVendorDetails: Object = {};
  passValidator: boolean = false;
  mobilemsgValidator: boolean = false;
  editMobileMsgValidator: boolean = false;
  editPassValidator: boolean = false;
  verifyOtp: number;
  otpRes: any;
  mobileOtp: boolean = false;
  registerUserData: any;
  langDetails: any;
  addLocationForm: FormControl;
  userLocations: FormGroup;
  getDistrictList: any;
  GetMandalsDetails: any;
  getStatesList: any;
  setUsetLocations: Array<any> = [];
  GetVillagesDetails: any;
  addselectlocation: Array<any> = [];
  IsVendorImage: boolean = true;
  imageFile2: any;
  IsEntityImage: boolean = true;
  imageFile3: any;
  editingVendorImage: any;
  editingEntityImage: any;
  addReqiuredLocation: boolean = false;
  test: string = "";
  constructor(
    private EkartServices: EkartadminService,
    private router: Router,
    private fb: FormBuilder
  ) {
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    this.vendorForm = new FormGroup({
      vendorFirstName: new FormControl("", [Validators.required]),
      vendorLastName: new FormControl("", [Validators.required]),
      mobileNum: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      emailId: new FormControl("", [Validators.pattern(emailRegex)]),
      altMobileNo: new FormControl("", [
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      entityName: new FormControl(""),
      // language: new FormControl("", [Validators.required]),
      primaryLocation: this.fb.array([]),
      // vendorProducts: new FormControl('', [Validators.required]),
      vendorImage: new FormControl(""),
      entityImage: new FormControl(""),
      password1: new FormControl("", [Validators.required]),
      password2: new FormControl("", [Validators.required]),
      Langname: new FormControl(""),
      // primaryLocationId: new FormControl(""),
    });

    this.userLocations = new FormGroup({
      StateName: new FormControl(""),
      DistrictName: new FormControl(""),
      MandalName: new FormControl(""),
      VillageName: new FormControl(""),
    });

    this.editvendorForm = new FormGroup({
      vFirstName: new FormControl("", [Validators.required]),
      vLastName: new FormControl("", [Validators.required]),
      vmobileNum: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      vemailId: new FormControl("", [Validators.pattern(emailRegex)]),
      valtMobileNo: new FormControl("", [
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      ventityName: new FormControl(""),
      vLocation: new FormControl(""),
      vlanguage: new FormControl(""),
      choosepwd: new FormControl("", [Validators.required]),
      choosepwd1: new FormControl("", [Validators.required]),

      editvendorimage: new FormControl(""),
      editEntityImage: new FormControl(""),

      editvendorimage1: new FormControl(""),
      editEntityImage1: new FormControl(""),

      // vImage: new FormControl("", [Validators.required]),
      // ventityImage: new FormControl("", [Validators.required]),
    });
  }

  urls: any[] = [];
  index: any;
  imageDeleteFrom!: FormGroup;
  imagePath: any;
  RemoveImage: boolean = false;

  selectFiles(event: any) {
    if (event.target.files.length <= 2 && this.urls.length <= 2) {
      for (var i = 0; i < event.target.files.length; i++) {
        this.imageFile = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (event: any) => {
          this.urls = [];
          this.urls.push(event.target.result);
          this.RemoveImage = true;
        };
      }
    } else this.RemoveImage = false;
  }
  removeSelectedFile(index: any) {
    this.urls.splice(index, 1);
  }

  urls1: any[] = [];
  index1: any;
  imageDeleteFrom1!: FormGroup;
  imagePath1: any;
  RemoveImage1: boolean = false;

  selectFiles1(event: any) {
    if (event.target.files.length <= 2 && this.urls.length <= 2) {
      for (var i = 0; i < event.target.files.length; i++) {
        this.imageFile1 = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (event: any) => {
          this.urls1 = [];
          this.urls1.push(event.target.result);
          this.RemoveImage1 = true;
        };
      }
    } else this.RemoveImage1 = false;
  }
  removeSelectedFile1(index: any) {
    this.urls1.splice(index, 1);
  }

  // brand image Edit
  urls2: any[] = [];
  index2: any;
  imageDeleteFrom2!: FormGroup;
  imagePath2: any;
  RemoveImage2: boolean = false;

  selectFiles2(event: any) {
    if (event.target.files.length <= 2 && this.urls.length <= 2) {
      this.IsVendorImage = false;
      for (var i = 0; i < event.target.files.length; i++) {
        this.imageFile2 = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (event: any) => {
          this.urls2 = [];
          this.urls2.push(event.target.result);
          this.RemoveImage2 = true;
        };
      }
      console.log(this.imageFile2);
    } else this.RemoveImage2 = false;
  }
  removeSelectedFile2(index: any) {
    this.urls2.splice(index, 1);
    console.log(this.urls2);
    this.imageFile2 = "";
    console.log(this.imageFile2);
    this.IsVendorImage = true;
  }

  // Edit Brand Logo
  urls3: any[] = [];
  index3: any;
  imageDeleteFrom3!: FormGroup;
  imagePath3: any;
  RemoveImage3: boolean = false;

  selectFiles3(event: any) {
    if (event.target.files.length <= 2 && this.urls.length <= 2) {
      this.IsEntityImage = false;
      for (var i = 0; i < event.target.files.length; i++) {
        this.imageFile3 = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (event: any) => {
          this.urls3 = [];
          this.urls3.push(event.target.result);
          this.RemoveImage3 = true;
        };
      }
    } else this.RemoveImage3 = false;
  }
  removeSelectedFile3(index: any) {
    this.urls3.splice(index, 1);
    console.log(this.urls3);
    this.imageFile3 = "";
    console.log(this.imageFile3);
    this.IsEntityImage = true;
  }

  ngOnInit(): void {
    this.getStates();
    this.getUserDetails();
    this.getLanguageDetails();
  }
  getVenderDetails(userDetails) {
    this.storedVendorDetails = userDetails;
    this.getVendorProductDetails(userDetails);
  }
  getVendorProductDetails(userDetails) {
    let params = {
      userId: userDetails["userId"],
    };
    this.EkartServices.getVendorProdDetailsById(params).subscribe(
      (vendorResp) => {
        if (vendorResp.statusCode == 200) {
          this.vendorProductList = vendorResp.data.vendorProductList;

          console.log("vendor", this.vendorProductList);
        }
        $("#vendorProductDetails").modal("show");
      }
    );
  }

  getUserDetails() {
    this.EkartServices.UsersList().subscribe((Userresp) => {
      if (Userresp.statusCode == 200) {
        this.usersList = Userresp.Data;
        console.log("Users List", this.usersList);
      }
    });
  }

  UserView(data) {
    $("#ViewProductModal").modal("show");

    this.UserDetailsView = data;
  }

  addVendor() {
    // let storedLocation = this.setUsetLocations.map(element => {
    //   return {locationId:element['locationId']}
    // });

    (Object as any).keys(this.vendorForm.controls).forEach((control) => {
      this.vendorForm.get(`${control}`).markAsTouched();
    });
    if (
      this.setUsetLocations.length < 1 &&
      this.vendorForm.get("entityName").value
    ) {
      return (this.addReqiuredLocation = true);
    }
    // let data =[{"locationId":"d40af2ee-227b-46b6-8018-260a8b8f7e01"}];

    // if(this.setUsetLocations.length>0){
    //  this.test=this.setUsetLocations[0].locationId;
    // console.log('id',this.test);
    // }

    console.log(this.vendorForm.valid);
    // this.vendorForm.setControl("primaryLocation", this.setUsetLocations);
    if (this.vendorForm.valid && !this.passValidator) {
      const vendorData = new FormData();
      vendorData.append("firstName", this.vendorForm.value.vendorFirstName);
      vendorData.append("lastName", this.vendorForm.value.vendorLastName);
      vendorData.append("mobileNum", this.vendorForm.value.mobileNum);
      vendorData.append("emailId", this.vendorForm.value.emailId);
      vendorData.append("altNumber", this.vendorForm.value.altMobileNo);
      vendorData.append("entityName", this.vendorForm.value.entityName);
      // vendorData.append("chooseLanguage", this.vendorForm.value.language);
      vendorData.append("password", this.vendorForm.value.password1);
      vendorData.append("chooseLanguage", this.vendorForm.value.Langname);
      // vendorData.append("primaryLocation", this.test);

      for (let i = 0; i < this.setUsetLocations.length; i++) {
        vendorData.append(
          "primaryLocation",
          `${this.setUsetLocations[i].locationId}`
        );
      }
      // vendorData.append("primaryLocation", JSON.stringify(this.setUsetLocations));

      // vendorData.append("primaryLocation", this.vendorForm.value.primaryLocationId);

      // this.vendorForm.get("primaryLocation").setValue(this.setUsetLocations);

      // vendorData.append("chooseLanguage", this.vendorForm.value.Password1);
      // vendorData.append(
      //   "availableLocation",
      //   this.vendorForm.value.vendorLocation
      // );
      if (this.imageFile) {
        vendorData.append("userImage", this.imageFile);
      }
      if (this.imageFile1) {
        vendorData.append("entityImage", this.imageFile1);
      }
      console.log("123", vendorData);
      this.EkartServices.VendorsAdd(vendorData).subscribe(
        (vendorResp) => {
          if (vendorResp.statusCode == 200) {
            this.registerUserData = vendorResp["registerResponse"];
            Swal.fire({
              icon: "success",
              text: "Vendor Details Add Successfully",
              timer: 2000,
              showCancelButton: false,
            });
            $("#verifyOtpModal").modal("show");
            this.vendorForm.reset();
            $("#exampleModal").modal("hide");
            this.getUserDetails();
            this.setUsetLocations = [];
            this.urls = [];
            this.urls1 = [];
            this.imageFile = {};
            this.imageFile1 = {};
            this.test = "";
            this.addReqiuredLocation = false;
            this.passValidator = false;
            this.mobilemsgValidator = false;
          } else {
            console.log("error");
            Swal.fire({
              icon: "error",
              text: "Mobile Number already exists",
              showConfirmButton: false,
              timer: 3000,
            });
          }
        },
        (err) => {
          console.log(err, "error message......");
          Swal.fire({
            icon: "error",
            text: err.error.message,
            showConfirmButton: false,
            timer: 3000,
          });
        }
      );
    } else {
      console.log("Errrrrr");
    }
  }

  Delete(item) {
    console.log("id", item);
    let deleteObj = {
      userId: item.userId,
    };
    Swal.fire({
      title: "Are you Sure?",
      text: "Want To Delete This Item..!",
      icon: "warning",
      confirmButtonText: "Yes, Delete it",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.EkartServices.VenderDelete(deleteObj).subscribe((deleteResp) => {
          if (deleteResp.statusCode == 200) {
            Swal.fire({
              icon: "success",
              text: "Vendor Deleted Successfully",
              showConfirmButton: false,
              timer: 2000,
            });
          }
          this.getUserDetails();
        });
      } else if (result.isDenied) {
        Swal.fire("something went wrong..!", "error");
      }
    });
  }

  userEdit(data) {
    $("#EditVendorModal").modal("show");
    console.log("data", data);
    this.editvendorForm.controls["vFirstName"].setValue(data.firstName);
    this.editvendorForm.controls["vLastName"].setValue(data.lastName);
    this.editvendorForm.controls["vmobileNum"].setValue(data.mobileNum);
    this.editvendorForm.controls["valtMobileNo"].setValue(data.altNumber);
    this.editvendorForm.controls["vemailId"].setValue(data.emailId);
    this.editvendorForm.controls["ventityName"].setValue(data.entityName);
    this.editvendorForm.controls["vLocation"].setValue(data.primaryLocation);
    this.editvendorForm.controls["vlanguage"].setValue(data.chooseLanguage);
    this.editvendorForm.controls["choosepwd"].setValue(data.password);
    this.editvendorForm.controls["choosepwd1"].setValue(data.password);

    this.editvendorForm.controls["editvendorimage1"].setValue(
      data.userImage[0]
    );
    this.editingVendorImage =
      this.editvendorForm.controls["editvendorimage1"].value;
    this.editvendorForm.controls["editEntityImage1"].setValue(data.entityImage);
    this.editingEntityImage =
      this.editvendorForm.controls["editEntityImage1"].value;
    this.setUsetLocations = data.primaryLocation;
    this.setUsetLocations.forEach((element) => {
      element["VillageName"] = element["village"];
    });
    // this.editvendorForm.controls["vImage"].setValue(data.userImage);

    // this.editingImage = this.editvendorForm.controls["vImage"].value;

    // this.editvendorForm.controls["ventityImage"].setValue(data.ventityImage);

    // this.editingentityImage =
    //   this.editvendorForm.controls["ventityImage"].value;

    this.EditVendorForm = data;
    this.userId = data.userId;
    console.log("Id", this.userId);
  }

  UpdateVendor() {
    // (Object as any).keys(this.editvendorForm.controls).forEach(control => {
    //   this.editvendorForm.get(`${control}`).markAsTouched();
    // });

    if (
      this.setUsetLocations.length < 1 &&
      this.editvendorForm.get("ventityName").value
    ) {
      return (this.addReqiuredLocation = true);
    }

    // if(this.setUsetLocations.length>0){
    //   this.setUsetLocations[0].locationId;
    //  console.log('id',this.test);
    //  }

    // console.log('shan',this.editvendorForm.valid)
    // console.log('shan',!this.editPassValidator)
    // console.log('shan',this.editvendorForm.get('vFirstName').valid);
    // console.log('shan',this.editvendorForm.get('vLastName').valid);
    // console.log('shan',this.editvendorForm.get('vmobileNum').valid);
    // console.log('shan',this.editvendorForm.get('choosepwd').valid);

    if (!this.editPassValidator) {
      const vendorUpdateData = new FormData();
      vendorUpdateData.append("userId", this.EditVendorForm.userId);
      console.log("ID", this.userId);
      vendorUpdateData.append(
        "firstName",
        this.editvendorForm.value.vFirstName
      );
      vendorUpdateData.append("lastName", this.editvendorForm.value.vLastName);
      vendorUpdateData.append(
        "mobileNum",
        this.editvendorForm.value.vmobileNum
      );
      vendorUpdateData.append("emailId", this.editvendorForm.value.vemailId);
      vendorUpdateData.append(
        "altNumber",
        this.editvendorForm.value.valtMobileNo
      );
      vendorUpdateData.append(
        "entityName",
        this.editvendorForm.value.ventityName
      );
      // vendorUpdateData.append(
      //   "this.setUsetLocations?.VillageName",
      //   this.editvendorForm.value.vLocation
      // );
      // vendorUpdateData.append("primaryLocation", this.setUsetLocations);
      vendorUpdateData.append(
        "chooseLanguage",
        this.editvendorForm.value.vlanguage
      );
      vendorUpdateData.append("password", this.editvendorForm.value.choosepwd);

      if (this.setUsetLocations.length > 0) {
        for (let i = 0; i < this.setUsetLocations.length; i++) {
          vendorUpdateData.append(
            "primaryLocation",
            `${this.setUsetLocations[i].locationId}`
          );
        }
        // vendorUpdateData.append("primaryLocation",this.setUsetLocations[0].locationId);
        // console.log('id',this.test);
      } else {
        vendorUpdateData.append("primaryLocation", "");
      }

      if (this.imageFile2) {
        vendorUpdateData.append("userImage", this.imageFile2);
      }
      if (this.imageFile3) {
        vendorUpdateData.append("entityImage", this.imageFile3);
      }

      this.EkartServices.VendorUpdate(vendorUpdateData).subscribe(
        (updateResp) => {
          if (updateResp.statusCode == 200) {
            Swal.fire({
              icon: "success",
              text: "Vendor Details Updated Successfully",
              timer: 2000,
              showConfirmButton: false,
            });
            $("#verifyOtpModal").modal("show");
            $("#EditVendorModal").modal("hide");
            // this.EditVendorModal.reset();

            this.getUserDetails();
            this.setUsetLocations = [];

            this.urls2 = [];
            this.urls3 = [];
            this.imageFile2 = {};
            this.imageFile3 = {};
            this.addReqiuredLocation = false;
            this.editPassValidator = false;
            this.editMobileMsgValidator = false;
          }
        }
      );
    } else {
      this.hasError = true;
      console.log("dsdsdd");
    }
  }

  omit_special_char(event: any) {
    var k;
    k = event.charCode; //         k = event.keyCode;  (Both can be used)
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      (k >= 48 && k <= 57)
    );
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  passwordValidator() {
    let password1 = this.vendorForm.get("password1")?.value;
    let password2 = this.vendorForm.get("password2")?.value;
    if (
      password1 != null &&
      password1 != "" &&
      password2 != null &&
      password2 != ""
    ) {
      if (password1 != password2) {
        this.passValidator = true;
      } else {
        this.passValidator = false;
      }
    }
  }

  editPasswordValidator() {
    let password1 = this.editvendorForm.get("choosepwd")?.value;
    let password2 = this.editvendorForm.get("choosepwd1")?.value;
    if (
      password1 != null &&
      password1 != "" &&
      password2 != null &&
      password2 != ""
    ) {
      if (password1 != password2) {
        this.editPassValidator = true;
      } else {
        this.editPassValidator = false;
      }
    }
  }

  editEntityValidator() {
    let editEntityNameValidation = this.editvendorForm.get("ventityName").value;
    editEntityNameValidation ? true : (this.setUsetLocations = []);
  }

  mobileValidator() {
    let mobileNum = this.vendorForm.get("mobileNum")?.value;
    let altMobileNo = this.vendorForm.get("altMobileNo")?.value;

    if (mobileNum == altMobileNo) {
      this.mobilemsgValidator = true;
    } else {
      this.mobilemsgValidator = false;
    }
  }

  editMobileValidator() {
    let vmobileNum = this.editvendorForm.get("vmobileNum")?.value;
    let valtMobileNo = this.editvendorForm.get("valtMobileNo")?.value;

    if (vmobileNum == valtMobileNo) {
      this.editMobileMsgValidator = true;
    } else {
      this.editMobileMsgValidator = false;
    }
  }

  optSubmit() {
    if (this.verifyOtp.toString().length == 6) {
      let phoneNumber = this.registerUserData.mobileNum.replace("+91", "");
      this.EkartServices.verifyOtp({
        otp: this.verifyOtp,
        mobileNum: phoneNumber,
      }).subscribe((res: any) => {
        console.log(res);
        if (res["statusCode"] == 200) {
          $("#verifyOtpModal").modal("hide");
          this.registerUserData = {};
        } else {
          this.otpRes = res["message"];
        }
      });
    }
  }

  getLanguageDetails() {
    this.EkartServices.getVendorLanguages().subscribe((Langresp) => {
      if (Langresp.StatusCode == 200) {
        this.langDetails = Langresp.Data.selectedLanguages;
        console.log("language List", this.langDetails);
      }
    });
  }

  modalClose() {
    this.vendorForm.reset();
    this.urls = [];
    this.urls1 = [];
    this.setUsetLocations = [];
    this.hasError = false;
  }
  editModalClose() {
    this.editvendorForm.reset();
    this.urls2 = [];
    this.urls3 = [];
    this.setUsetLocations = [];
    this.hasError = false;
  }
  addVendorLocation() {
    this.addselectlocation = this.setUsetLocations;
    $("#addLocationModal").modal("show");
  }

  locationModalClose() {
    this.userLocations.reset();
    this.addselectlocation = [];
  }

  getStates() {
    this.EkartServices.getStoreLocationsList().subscribe((getStatesResp) => {
      this.getStatesList = getStatesResp.Data.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.state === value.state)
      );
      console.log("states", this.getStatesList);
    });
  }

  getDistrictName() {
    console.log(" 123");
    let params = {
      state: this.userLocations.get("StateName").value,
    };
    this.EkartServices.getDistrict(params).subscribe((res: any) => {
      if (res["statusCode"] == 200) {
        this.getDistrictList = res["data"];
        this.getDistrictList = this.getDistrictList.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.district === value.district)
        );
        this.getDistrictList = this.getDistrictList.filter(
          (value) =>
            value["district"] != null &&
            value["district"] != undefined &&
            value["district"] != ""
        );
      } else {
        this.getDistrictList = [];
      }
    });
  }
  getMandalName() {
    let params = {
      state: this.userLocations.get("StateName").value,
      district: this.userLocations.get("DistrictName").value,
    };
    this.EkartServices.getMandalData(params).subscribe((res: any) => {
      if (res["statusCode"] == 200) {
        this.GetMandalsDetails = res["data"];
        this.GetMandalsDetails = this.GetMandalsDetails.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.mandal === value.mandal)
        );
        this.GetMandalsDetails = this.GetMandalsDetails.filter(
          (value) =>
            value["mandal"] != null &&
            value["mandal"] != undefined &&
            value["mandal"] != ""
        );
      } else {
        this.GetMandalsDetails = [];
      }
    });
  }
  getVillageName() {
    let params = {
      state: this.userLocations.get("StateName").value,
      district: this.userLocations.get("DistrictName").value,
      mandal: this.userLocations.get("MandalName").value,
      // "village": this.userLocations.get('VillageName').value,
    };
    this.EkartServices.getVillagesData(params).subscribe((res: any) => {
      if (res["statusCode"] == 200) {
        this.GetVillagesDetails = res["data"];
        this.GetVillagesDetails = this.GetVillagesDetails.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.village === value.village)
        );
        this.GetVillagesDetails = this.GetVillagesDetails.filter(
          (value) =>
            value["village"] != null &&
            value["village"] != undefined &&
            value["village"] != ""
        );
      } else {
        this.GetVillagesDetails = [];
      }
    });
  }

  setUserLocations() {
    this.setUsetLocations = this.addselectlocation;
    console.log(this.setUsetLocations);
    $("#addLocationModal").modal("hide");
    this.userLocations.reset();
    this.addselectlocation = [];
    this.addReqiuredLocation = false;
  }

  addLocations() {
    if (this.userLocations.get("VillageName").value) {
      if (this.addselectlocation) {
        // console.log("123");
        let textMatch = this.addselectlocation.findIndex((element) => {
          // console.log(element);
          return (
            element["VillageName"] ==
            this.userLocations.get("VillageName").value
          );
        });
        console.log(textMatch);
        if (textMatch != -1) {
          alert("Loation already exist");
        } else {
          let villageMatch = this.GetVillagesDetails.find(
            (element) =>
              element["village"] == this.userLocations.get("VillageName").value
          );
          console.log("villagematch", villageMatch);
          this.addselectlocation.push({
            locationId: villageMatch.locationId,
            ...this.userLocations.value,
          });
          console.log("loctaion", this.addselectlocation);
        }
      } else {
        this.addselectlocation.push(this.userLocations.value);
      }
    }
  }

  deleteVendorImg() {
    let deleteImg = {
      userId: this.userId,
      productImage: this.editingVendorImage[0],
    };
    this.EkartServices.vendorImageDelete(deleteImg).subscribe((delResp) => {
      if (delResp.statusCode == 200) {
      } else {
      }
    });
  }

  deleteEntityImg() {
    let deleteImg = {
      userId: this.userId,
      productImage: this.editingEntityImage[0],
    };
    this.EkartServices.entityImageDelete(deleteImg).subscribe((delResp) => {
      if (delResp.statusCode == 200) {
      } else {
      }
    });
  }

  loctionDelete(i) {
    this.setUsetLocations.splice(i, 1);
  }

  entityNameDel() {
    let entityValidation = this.vendorForm.get("entityName").value;
    entityValidation ? true : (this.setUsetLocations = []);
  }
}

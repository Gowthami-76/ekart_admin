import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EkartadminService } from "app/Services/ekartadmin.service";
import Swal from "sweetalert2";
declare const $: any;

@Component({
  selector: "mandal",
  templateUrl: "./mandal.component.html",
  styleUrls: ["./mandal.component.css"],
})
export class MandalComponent implements OnInit {
  mandalForm: FormGroup;
  hasError: any = false;
  StateLocationKey: any = 1;
  DistrictLocationKey: any = 2;
  getStatesList: any;
  getDistrictList: any;
  MandalLocationKey: any = 3;
  GetMandalsDetails: any;
  editMandalForm: FormGroup;
  MandalId: any;
  dropDownStateList: Array<any> = [];
  mandalType: string = "add";

  constructor(private EMkartServices: EkartadminService) {
    this.mandalForm = new FormGroup({
      stateName: new FormControl("", [Validators.required]),
      DistrictName: new FormControl("", [Validators.required]),
      mandal: new FormControl("", [Validators.required]),
    });
    this.editMandalForm = new FormGroup({
      stName: new FormControl("", [Validators.required]),
      distName: new FormControl("", [Validators.required]),
      mandalName: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {
    // this.getMandalsList();
    this.getStates();
    // this.getDistricts();
  }

  getStates() {
    this.EMkartServices.getStoreLocationsList().subscribe((getStatesResp) => {
      this.getStatesList = getStatesResp.Data.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.mandal === value.mandal)
      );
      this.dropDownStateList = getStatesResp.Data.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.state === value.state)
      );
      this.getStatesList = this.getStatesList.filter(
        (element) =>
          element["mandal"] != "" &&
          element["mandal"] != null &&
          element["mandal"] != undefined
      );
      console.log("states", this.getStatesList);
    });
  }

  getDistricts() {
    let StategetObj = {
      locationKey: this.DistrictLocationKey,
    };

    this.EMkartServices.getStoreLocationsList().subscribe((getStatesResp) => {
      this.getDistrictList = getStatesResp.productByIdResp;
      console.log("states", this.getStatesList);
    });
  }

  getMandalsList() {
    let StategetObj = {
      locationKey: this.MandalLocationKey,
    };

    this.EMkartServices.getStoreLocationsList().subscribe((getStatesResp) => {
      this.GetMandalsDetails = getStatesResp.productByIdResp;
      console.log("states", this.getStatesList);
    });
  }

  addingmandal() {
    (Object as any).keys(this.mandalForm.controls).forEach((control) => {
      this.mandalForm.get(`${control}`).markAsTouched();
    });
    if (this.mandalForm.valid) {
      let mandalObj = {
        state: this.mandalForm.value.stateName,
        district: this.mandalForm.value.DistrictName,
        mandal: this.mandalForm.value.mandal.toUpperCase(),
      };

      let index = this.getStatesList.findIndex(
        (x) =>
          x.mandal.toUpperCase() === this.mandalForm.value.mandal.toUpperCase()
      );

      console.log("mandal", index);

      if (index != -1) {
        Swal.fire("Mandal Already Added...!");
      } else {
        this.EMkartServices.locationAdding(mandalObj).subscribe(
          (mandalResp) => {
            if (mandalResp.statusCode == 200) {
              Swal.fire({
                icon: "success",
                text: "Mandal Added Successfully",
                timer: 2500,
                showConfirmButton: false,
              });
              this.mandalForm.reset();
              $("#exampleModal").modal("hide");
              this.getStates();
            } else {
              console.log("Error");
              Swal.fire("something went wrong");
            }
          }
        );
      }
    } else {
      this.hasError = true;
    }
  }

  MandalEdit(Data) {
    $("#mandalEditModal").modal("show");
    console.log("id", Data);
    this.editMandalForm.controls["stName"].setValue(Data.state);
    this.editMandalForm.controls["distName"].setValue(Data.district);
    this.editMandalForm.controls["mandalName"].setValue(Data.mandal);
    // this.getMandalsList();
    // this.getDistricts();
    this.mandalType = "edit";
    this.getDistrictName();
    this.MandalId = Data.locationId;
    console.log("Madal-Id", this.MandalId);
  }
  updateMandal() {
    (Object as any).keys(this.editMandalForm.controls).forEach((control) => {
      this.editMandalForm.get(`${control}`).markAsTouched();
    });
    if (this.editMandalForm.valid) {
      let updateMandalObj = {
        locationId: this.MandalId,
        state: this.editMandalForm.value.stName,
        district: this.editMandalForm.value.distName,
        mandal: this.editMandalForm.value.mandalName.toUpperCase(),
      };
      console.log("test", updateMandalObj);

      let index = this.getStatesList.findIndex(
        (x) =>
          x.mandal.toUpperCase() ===
          this.editMandalForm.value.mandalName.toUpperCase()
      );

      console.log("mandal", index);

      if (index != -1) {
        Swal.fire("Mandal Already Added...!");
      } else {
        this.EMkartServices.locationStateUpdate(updateMandalObj).subscribe(
          (mandalResp) => {
            if (mandalResp.statusCode == 200) {
              console.log("sucess");
              Swal.fire({
                icon: "success",
                text: "Mandal Updated Successfuly",
                timer: 2000,
                showConfirmButton: false,
              });
              $("#mandalEditModal").modal("hide");
              // this.getMandalsList();
              this.getStates();
              // this.getDistricts();
            }
          }
        );
      }
    }
  }

  MandalDelete(data) {
    let MandalDeleteObj = {
      mandal: data.mandal,
    };

    Swal.fire({
      title: "Are you sure want to Delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.EMkartServices.deleteMandal(MandalDeleteObj).subscribe(
          (deleteStateResp) => {
            if (deleteStateResp.statusCode == 200) {
              Swal.fire({
                icon: "success",
                text: "Mandal successfully deleted",
                showConfirmButton: false,
                timer: 3000,
              });
              this.getStates();
            } else {
              Swal.fire("Something went wrong...!");
            }
          }
        );
      }
    });
  }
  getDistrictName() {
    console.log(this.mandalType);
    let params = {};
    if (this.mandalType == "add") {
      params = {
        state: this.mandalForm.get("stateName").value,
      };
    } else if (this.mandalType == "edit") {
      params = {
        state: this.editMandalForm.get("stName").value,
      };
    }

    this.EMkartServices.getDistrict(params).subscribe((res: any) => {
      if (res["statusCode"] == 200) {
        this.getDistrictList = res["data"];
        this.getDistrictList = this.getDistrictList.filter(
          (value) =>
            value["district"] != null &&
            value["district"] != undefined &&
            value["district"] != ""
        );
        this.getDistrictList = this.getDistrictList.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.district === value.district)
        );
      } else {
        this.getDistrictList = [];
      }
    });
  }

  filteredAgencyList() {
    let filteredAgencyList = [];
    console.log(this.dropDownStateList);
    // if (this.dropDownStateList.length < 2 && (this.dropDownStateList != undefined && this.dropDownStateList != null)){
    //   console.log('shanmukh')
    //   return filteredAgencyList = this.dropDownStateList.filter((value, index, self) =>
    //   index === self.findIndex((t) => (
    //     t.state === value.state
    //   )));
    // }else{
    //   return this.dropDownStateList;
    // }
    return (filteredAgencyList = this.dropDownStateList.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.state === value.state)
    ));
  }

  modalClose() {
    this.mandalForm.reset();
  }
}

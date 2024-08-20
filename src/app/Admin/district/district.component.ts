import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EkartadminService } from "app/Services/ekartadmin.service";
import { element } from "protractor";
import Swal from "sweetalert2";
declare const $: any;

@Component({
  selector: "district",
  templateUrl: "./district.component.html",
  styleUrls: ["./district.component.css"],
})
export class DistrictComponent implements OnInit {
  districtaddModal: FormGroup;
  hasError: any = false;
  getDistrictsList: any;
  LocationKey: any = 2;
  getStatesList: Array<any> = [];
  StateLocationKey: any = 1;
  editDistrictForm: FormGroup;
  districtId: any;
  dropDownStateList: Array<any> = [];
  constructor(private EmkartServices: EkartadminService) {
    this.districtaddModal = new FormGroup({
      selectState: new FormControl("", [Validators.required]),
      district: new FormControl("", [Validators.required]),
    });
    this.editDistrictForm = new FormGroup({
      stateName: new FormControl("", [Validators.required]),
      distName: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {
    // this.getDistricts();
    this.getStates();
  }

  getStates() {
    this.EmkartServices.getStoreLocationsList().subscribe((getStatesResp) => {
      this.getStatesList = getStatesResp.Data.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.district === value.district)
      );
      this.dropDownStateList = getStatesResp.Data.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.state === value.state)
      );
      this.getStatesList = this.getStatesList.filter(
        (element) =>
          element["district"] != "" &&
          element["district"] != null &&
          element["district"] != undefined
      );
      console.log("states", this.getStatesList);
    });
  }

  addingDistrict() {
    (Object as any).keys(this.districtaddModal.controls).forEach((control) => {
      this.districtaddModal.get(`${control}`).markAsTouched();
    });

    if (this.districtaddModal.valid) {
      let DistrictObj = {
        state: this.districtaddModal.value.selectState,
        district: this.districtaddModal.value.district.toUpperCase(),
        // locationKey: this.LocationKey
      };

      console.log("obj", DistrictObj);

      let index = this.getStatesList.findIndex(
        (x) =>
          x.district.toUpperCase() ===
          this.districtaddModal.value.district.toUpperCase()
      );

      console.log("district", index);
      if (index != -1) {
        Swal.fire("District Already Added...!");
      } else {
        this.EmkartServices.locationAdding(DistrictObj).subscribe(
          (DistrictResp) => {
            if (DistrictResp.statusCode == 200) {
              Swal.fire({
                icon: "success",
                text: "District Successfully Added",
                showConfirmButton: false,
                timer: 2500,
              });
              this.districtaddModal.reset();
              $("#exampleModal").modal("hide");
              this.getStates();
              // console.log()
            } else {
              console.log("error");
            }
          }
        );
      }
    } else {
      console.log("error");
    }
  }

  getDistricts() {
    // this.EmkartServices.getDistricts().subscribe((getStatesResp) => {
    //   if(getStatesResp.StatusCode == 200) {
    //     this.getDistrictsList = getStatesResp.Data.locationsList
    //   }
    // })

    let StategetObj = {
      locationKey: this.LocationKey,
    };

    this.EmkartServices.getStoreLocationsList().subscribe((getStatesResp) => {
      this.getDistrictsList = getStatesResp.productByIdResp;
      console.log("states", this.getDistrictsList);
    });
  }

  DistrictEdit(item) {
    $("#districtEditModal").modal("show");
    console.log("id", item);
    this.editDistrictForm.controls["stateName"].setValue(item.state);
    this.editDistrictForm.controls["distName"].setValue(item.district);
    this.districtId = item.locationId;
    console.log("districtId", this.districtId);
  }

  updateDistrict() {
    (Object as any).keys(this.editDistrictForm.controls).forEach((control) => {
      this.editDistrictForm.get(`${control}`).markAsTouched();
    });
    if (this.editDistrictForm.valid) {
      let updateDistObj = {
        locationId: this.districtId,
        state: this.editDistrictForm.value.stateName,
        district: this.editDistrictForm.value.distName.toUpperCase(),
      };
      console.log("test", updateDistObj);

      let index = this.getStatesList.findIndex(
        (x) =>
          x.district.toUpperCase() ===
          this.editDistrictForm.value.distName.toUpperCase()
      );

      console.log("district", index);

      if (index != -1) {
        Swal.fire("district already added...!");
      } else {
        this.EmkartServices.locationStateUpdate(updateDistObj).subscribe(
          (distResp) => {
            if (distResp.statusCode == 200) {
              console.log("sucess");
              Swal.fire({
                icon: "success",
                text: "District Updated Successfuly",
                timer: 2000,
                showConfirmButton: false,
              });
              $("#districtEditModal").modal("hide");
              this.getDistricts();
              this.getStates();
            }
          }
        );
      }
    }
  }

  DistrictDelete(data) {
    let DistrictDeleteObj = {
      district: data.district,
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
        this.EmkartServices.deleteDistrict(DistrictDeleteObj).subscribe(
          (deleteStateResp) => {
            if (deleteStateResp.statusCode == 200) {
              Swal.fire({
                icon: "success",
                text: "District successfully deleted",
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

  stateSelect() {
    console.log("", this.districtaddModal.get("selectState").value);
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
    this.districtaddModal.reset();
  }
}

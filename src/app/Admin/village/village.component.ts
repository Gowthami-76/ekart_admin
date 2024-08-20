import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EkartadminService } from "app/Services/ekartadmin.service";
import Swal from "sweetalert2";
declare const $: any;

@Component({
  selector: "village",
  templateUrl: "./village.component.html",
  styleUrls: ["./village.component.css"],
})
export class VillageComponent implements OnInit {
  getTotalDetails: any;
  VillageModal: FormGroup;
  hasError: any = false;
  StateLocationKey: any = 1;
  DistrictLocationKey: any = 2;
  MandalLocationKey: any = 3;
  getStatesList: any;
  getDistrictList: any;
  GetMandalsDetails: any;
  VillageLocationkey: any = 4;
  getTotalVillageDetails: any;
  editVillageForm: FormGroup;
  VillageId: any;
  villageTableData: any;
  villageType: string = "add";

  constructor(private EMkartServices: EkartadminService) {
    this.VillageModal = new FormGroup({
      StateName: new FormControl("", [Validators.required]),
      DistrictName: new FormControl("", [Validators.required]),
      MandalName: new FormControl("", [Validators.required]),
      VillageName: new FormControl("", [Validators.required]),
    });
    this.editVillageForm = new FormGroup({
      stName: new FormControl("", [Validators.required]),
      distName: new FormControl("", [Validators.required]),
      MName: new FormControl("", [Validators.required]),
      VName: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {
    // this.getVillageDetails();
    this.getStates();
    // this.getDistricts();
    // this.getMandalsList();
  }

  getVillageDetails() {
    let StategetObj = {
      locationKey: this.VillageLocationkey,
    };

    this.EMkartServices.getStoreLocationsList().subscribe((getStatesResp) => {
      this.getTotalVillageDetails = getStatesResp.productByIdResp;
      // console.log("villages", this.getStatesList)
    });
  }

  getStates() {
    this.EMkartServices.getStoreLocationsList().subscribe((getStatesResp) => {
      this.villageTableData = getStatesResp.Data.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.village === value.village)
      );
      this.getStatesList = getStatesResp.Data.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.state === value.state)
      );
      this.villageTableData = this.villageTableData.filter(
        (element) =>
          element["village"] != "" &&
          element["village"] != null &&
          element["village"] != undefined
      );
      console.log("states", this.villageTableData);
    });
  }

  getDistricts() {
    let StategetObj = {
      locationKey: this.DistrictLocationKey,
    };

    this.EMkartServices.getStoreLocationsList().subscribe((getStatesResp) => {
      this.getDistrictList = getStatesResp.productByIdResp;
      console.log("district", getStatesResp);
      // console.log("districts", this.getDistrictList)
    });
  }

  getMandalsList() {
    let StategetObj = {
      locationKey: this.MandalLocationKey,
    };

    this.EMkartServices.getStoreLocationsList().subscribe((getStatesResp) => {
      this.GetMandalsDetails = getStatesResp.productByIdResp;
      // console.log("mandals", this.GetMandalsDetails)
    });
  }

  addingvillage() {
    (Object as any).keys(this.VillageModal.controls).forEach((control) => {
      this.VillageModal.get(`${control}`).markAsTouched();
    });
    if (this.VillageModal.valid) {
      let VillageObj = {
        state: this.VillageModal.value.StateName,
        district: this.VillageModal.value.DistrictName,
        mandal: this.VillageModal.value.MandalName,
        village: this.VillageModal.value.VillageName.toUpperCase(),
        // locationKey: this.VillageLocationkey
      };
      console.log("Obj", VillageObj);

      let index = this.villageTableData.findIndex(
        (x) =>
          x.village.toUpperCase() ===
          this.VillageModal.value.VillageName.toUpperCase()
      );
      console.log("Village", index);

      if (index != -1) {
        Swal.fire("Village Already Added...!");
      } else {
        this.EMkartServices.locationAdding(VillageObj).subscribe(
          (VillgaeResp) => {
            if (VillgaeResp.statusCode == 200) {
              Swal.fire({
                icon: "success",
                text: "Village Successfully Added",
                timer: 2500,
                showConfirmButton: false,
              });
              // this.getVillageDetails();
              this.VillageModal.reset();
              $("#exampleModal").modal("hide");
              this.getStates();
            } else {
              Swal.fire("something went wrong");
            }
          }
        );
      }
    } else {
      this.hasError = true;
    }
  }

  VillageEdit(Data) {
    $("#villageEditModal").modal("show");
    console.log("id", Data);
    this.editVillageForm.controls["stName"].setValue(Data.state);
    this.editVillageForm.controls["distName"].setValue(Data.district);
    this.editVillageForm.controls["MName"].setValue(Data.mandal);
    this.editVillageForm.controls["VName"].setValue(Data.village);

    this.villageType = "edit";

    this.getDistrictName();
    this.getMandalName();

    this.VillageId = Data.locationId;
    console.log("Village-id", this.VillageId);
  }

  updatevillage() {
    (Object as any).keys(this.editVillageForm.controls).forEach((control) => {
      this.editVillageForm.get(`${control}`).markAsTouched();
    });
    if (this.editVillageForm.valid) {
      let updateVillageObj = {
        locationId: this.VillageId,
        state: this.editVillageForm.value.stName,
        district: this.editVillageForm.value.distName,
        mandal: this.editVillageForm.value.MName,
        village: this.editVillageForm.value.VName.toUpperCase(),
      };
      console.log("test", updateVillageObj);

      let index = this.villageTableData.findIndex(
        (x) =>
          x.village.toUpperCase() ===
          this.editVillageForm.value.VName.toUpperCase()
      );

      console.log("Village", index);

      if (index != -1) {
        Swal.fire("Village Already Added...!");
      } else {
        this.EMkartServices.locationStateUpdate(updateVillageObj).subscribe(
          (villageResp) => {
            if (villageResp.statusCode == 200) {
              console.log("sucess");
              Swal.fire({
                icon: "success",
                text: "Village Updated Successfuly",
                timer: 2000,
                showConfirmButton: false,
              });
              $("#villageEditModal").modal("hide");
              // this.getVillageDetails();
              this.getStates();
              // this.getDistricts();
              // this.getMandalsList();
            }
          }
        );
      }
    }
  }

  VillageDelete(data) {
    let VillageDeleteObj = {
      village: data.village,
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
        this.EMkartServices.deleteVillage(VillageDeleteObj).subscribe(
          (deleteStateResp) => {
            if (deleteStateResp.statusCode == 200) {
              Swal.fire({
                icon: "success",
                text: "State successfully deleted",
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
    let params = {};
    if (this.villageType == "add") {
      params = {
        state: this.VillageModal.get("StateName").value,
      };
    } else if (this.villageType == "edit") {
      params = {
        state: this.editVillageForm.get("stName").value,
      };
    }
    this.EMkartServices.getDistrict(params).subscribe((res: any) => {
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
    let params = {};
    if (this.villageType == "add") {
      params = {
        state: this.VillageModal.get("StateName").value,
        district: this.VillageModal.get("DistrictName").value,
      };
    } else if (this.villageType == "edit") {
      params = {
        state: this.editVillageForm.get("stName").value,
        district: this.editVillageForm.get("distName").value,
      };
    }

    // let params ={
    //   "state": this.VillageModal.get('StateName').value,
    //   "district": this.VillageModal.get('DistrictName').value,
    // }

    this.EMkartServices.getMandalData(params).subscribe((res: any) => {
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

  modalClose() {
    this.VillageModal.reset();
  }
}

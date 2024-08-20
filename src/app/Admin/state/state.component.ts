import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EkartadminService } from "app/Services/ekartadmin.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
declare const $: any;

@Component({
  selector: "state",
  templateUrl: "./state.component.html",
  styleUrls: ["./state.component.css"],
})
export class StateComponent implements OnInit {
  AddStateForm: FormGroup;
  hasError: any = false;
  getStatesList: any;
  LocationKey: any = 1;
  editStateForm: FormGroup;
  stateId: any;
  dbstate: any;

  constructor(
    private EMkartServices: EkartadminService,
    private router: Router
  ) {
    this.AddStateForm = new FormGroup({
      state: new FormControl("", [Validators.required]),
    });
    this.editStateForm = new FormGroup({
      stateName: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getStates();
  }

  addingState() {
    if (this.AddStateForm.valid) {
      let stateObj = {
        state: this.AddStateForm.value.state.toUpperCase(),
      };

      // for(var data of this.getStatesList){
      //   console.log('data',data);
      //   this.dbstate=data?.state
      //   console.log('list',this.dbstate);
      //   if(stateObj.state==this.dbstate){
      //     Swal.fire('state already added...!');
      //     break;
      //   }else{
      //     console.log('elseifblock....!');
      //   }
      // }

      let index = this.getStatesList.findIndex(
        (x) =>
          x.state.toUpperCase() === this.AddStateForm.value.state.toUpperCase()
      );
      console.log("state", index);
      if (index != -1) {
        Swal.fire("state already added...!");
      } else {
        this.EMkartServices.locationAdding(stateObj).subscribe((StateResp) => {
          if (StateResp.statusCode == 200) {
            Swal.fire({
              icon: "success",
              text: "State Successfully Added",
              timer: 2500,
              showConfirmButton: true,
            });
            this.getStates();
            this.AddStateForm.reset();
            $("#exampleModal").modal("hide");
          }
        });
      }
    } else {
      this.hasError = true;
    }
  }

  getStates() {
    this.EMkartServices.getStoreLocationsList().subscribe((getStatesResp) => {
      this.getStatesList = getStatesResp.Data.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.state === value.state)
      );
      console.log("states", this.getStatesList);
    });
  }

  stateEdit(Data) {
    $("#stateEditModal").modal("show");
    console.log("id", Data);
    this.editStateForm.controls["stateName"].setValue(Data.state);
    this.stateId = Data.locationId;
    console.log("stateId", this.stateId);
  }

  updateState() {
    if (this.editStateForm.valid) {
      // const updateStateObj = new FormData();
      // updateStateObj.append('locationId', this.stateId)
      // updateStateObj.append('state', this.editStateForm.value.stateName)

      let updateStateObj = {
        locationId: this.stateId,
        state: this.editStateForm.value.stateName.toUpperCase(),
      };

      let index = this.getStatesList.findIndex(
        (x) =>
          x.state.toUpperCase() ===
          this.editStateForm.value.stateName.toUpperCase()
      );
      console.log("state", index);

      console.log("test", updateStateObj);

      if (index != -1) {
        Swal.fire("state already added...!");
      } else {
        this.EMkartServices.locationStateUpdate(updateStateObj).subscribe(
          (stateResp) => {
            if (stateResp.statusCode == 200) {
              console.log("sucess");
              Swal.fire({
                icon: "success",
                text: "State Updated Successfuly",
                timer: 2000,
                showConfirmButton: false,
              });
              $("#stateEditModal").modal("hide");
              this.getStates();
            }
          }
        );
      }
    }
  }

  stateDeletion(data) {
    console.log("test");
    let StateRemoveObj = {
      state: data.state,
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
        this.EMkartServices.Locationdelete(StateRemoveObj).subscribe(
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

  modalClose() {
    this.AddStateForm.reset();
  }
}

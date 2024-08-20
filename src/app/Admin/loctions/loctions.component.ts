import { Component, OnInit } from '@angular/core';
import { EkartadminService } from 'app/Services/ekartadmin.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
declare const $: any

@Component({
  selector: 'loctions',
  templateUrl: './loctions.component.html',
  styleUrls: ['./loctions.component.css']
})
export class LoctionsComponent implements OnInit {
  createLocation: FormGroup;
  LocationsList: any;
  hasError: any = false

  constructor(private router: Router, private ekartServices: EkartadminService) {
    this.createLocation = new FormGroup({
      villageName: new FormControl('', [Validators.required]),
      mandalName: new FormControl('', [Validators.required]),
      districtName: new FormControl('', [Validators.required]),
      stateName: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.getallLocations();
  }

  addLocation() {
    $('#CreateLocationModel').modal('show');
  }

  LocationAdd() {
    if (this.createLocation.valid) {
      let locationObj = {
        village: this.createLocation.value.villageName,
        mandal: this.createLocation.value.mandalName,
        district: this.createLocation.value.districtName,
        state: this.createLocation.value.stateName
      }

      this.ekartServices.locationAdding(locationObj).subscribe((locationResp) => {
        if (locationResp.statusCode == 200) {
          Swal.fire({
            icon: 'success',
            text: 'Location Successfully Added',
            showConfirmButton: false,
            timer: 3000
          })
          this.createLocation.reset();
          $('#CreateLocationModel').modal('hide');
          this.getallLocations();
        }

        else {
          Swal.fire('Something went wrong..!')
        }
      })
    }
    else {
      this.hasError = true;
    }
  }


  getallLocations() {
    this.ekartServices.getLocations().subscribe((getLocationResp) => {
      if (getLocationResp.StatusCode == 200) {
        this.LocationsList = getLocationResp.Data.locationsList
      }
    })
  }

  deleteLocation(data) {
    let deleteLocationobj = {
      locationId: data.locationId
    }

    Swal.fire({
      title: 'Are you sure want to Delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ekartServices.Locationdelete(deleteLocationobj).subscribe((deleteLocationResp) => {
          if (deleteLocationResp.statusCode == 200) {
            Swal.fire({
              icon: 'success',
              text: 'Location successfully deleted',
              showConfirmButton: false,
              timer: 3000
            })
            this.getallLocations();
          }
          else {
            Swal.fire('Something went wrong...!')
          }
        })
      }
    })
  }

}

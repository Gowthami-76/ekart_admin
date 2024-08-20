import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EkartadminService } from 'app/Services/ekartadmin.service';
declare const $: any


@Component({
  selector: 'createsms',
  templateUrl: './createsms.component.html',
  styleUrls: ['./createsms.component.css']
})
export class CreatesmsComponent implements OnInit {
  createSms: FormGroup;
  dropdownSettings: { idField: string; textField: string; singleSelection
    : boolean; allowSearchFilter : boolean };
  userStatusDetails: any;
  createSmsDetails: any;

  constructor(private EmkartServices: EkartadminService) {
    this.createSms = new FormGroup({
      msg: new FormControl('', [Validators.required]),
      selectLocation: new FormControl('', [Validators.required]),
      mobileNo: new FormControl('', [Validators.required])
    })
   }

  ngOnInit(): void {
    this.getCreateSms();

    this.dropdownSettings = {
      idField: 'userId',
      textField: 'firstName',
      singleSelection: false,
      allowSearchFilter: true
    };
  }

  getCreateSms(){
    this.EmkartServices.getCreateSmsList().subscribe((getResp) => {
      if(getResp.statusCode == 200) {
        this.createSmsDetails = getResp.data;
        console.log("Get SMS Details",this.createSmsDetails)
        
      }
    })
  }
  
  userStatus(){
    let params = {
      "status":"1"
    }
    this.EmkartServices.getUserStatusDetails(params).subscribe((dataResp) => {
      if(dataResp.statusCode){
        this.userStatusDetails = dataResp.userStatusResponse;
      }else{
        this.userStatusDetails
      }
      
    })
  }
  
  // userSelect(){

  //   let arrayMobileNo = this.createSms.get('selectLocation').value.map(e =>{
  //     return e.mobileNum
  //   });

  // }

    sentSms(){
      let arrayOfTokens = this.userStatusDetails.map(e =>{
        return e.mobileNum
      });
      
if(this.userStatusDetails && this.createSms.get('msg').value && this.createSms.get('msg').value ){
  let params = {
    "title": '',
    "body" : this.createSms.get('msg').value,
    "phoneNum": arrayOfTokens
  }

  this.EmkartServices.bulkSmsSentByUser(params).subscribe((dataRes) => {
    console.log(dataRes)
    if(dataRes){
      this.createSms.reset();
    //  this.notificationUserDetails = dataRes.data;
    alert("Msg Sent Successfully")
    }else{
      // this.notificationUserDetails = {}
    }
    })}



    }
  
}

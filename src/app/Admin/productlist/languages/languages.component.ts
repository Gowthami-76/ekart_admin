import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EkartadminService } from "app/Services/ekartadmin.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
// import { timeStamp } from "console";
declare const $: any;

@Component({
  selector: "languages",
  templateUrl: "./languages.component.html",
  styleUrls: ["./languages.component.css"],
})
export class LanguagesComponent implements OnInit {
  LanguageForm: FormGroup;
  getlistofLanguages: any;
  languageView: any;
  public hasError: boolean = false;
  editLanguageForm: any;
  LangId: any;
  languageId: any;
  userId: any;

  constructor(
    private ekartServices: EkartadminService,
    private router: Router
  ) {
    this.LanguageForm = new FormGroup({
      languageName: new FormControl("", [Validators.required]),
      localkey: new FormControl("", [Validators.required, Validators.minLength(2),
      Validators.maxLength(2)],)
      // keyName: new FormControl("", [Validators.required]),
    });

    this.editLanguageForm = new FormGroup({
      langName: new FormControl("", [Validators.required]),
      // kName: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getLanguages();
  }

  languageAdd() {
    (Object as any).keys(this.LanguageForm.controls).forEach((control) => {
      this.LanguageForm.get(`${control}`).markAsTouched();
    });
    let languageObj = {
      locale: this.LanguageForm.value.localkey.toLowerCase(),
      language: this.LanguageForm.value.languageName.toUpperCase(),
      // keys: this.LanguageForm.value.keyName,
    };

    this.ekartServices.addLanguage(languageObj).subscribe((languageResp) => {
      if (languageResp.statusCode == 200) {
        Swal.fire({
          icon: "success",
          text: "Language Added Successfully",
          timer: 3000,
          showConfirmButton: false,
        });
        $("#exampleModal").modal("hide");
        // this.LanguageForm.reset();
        this.getLanguages();
        this.LanguageForm.reset();

      } else {
        console.log("error");
        Swal.fire({
          icon: "error",
          text: "Please Add Unique Languages",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    })
      //  else {
      //   this.hasError = true;
      // }
  
  }

  // Get List of Languages
  getLanguages() {
    this.ekartServices.getLanguages().subscribe((languageResp) => {
      if (languageResp.StatusCode == 200) {
        this.getlistofLanguages = languageResp.Data.selectedLanguages;
        console.log("languages", this.getlistofLanguages);
      }
    });
  }

  Onview(data) {
    $("#languageViewModal").modal("show");
    console.log("data", data)
    this.languageView = data;
  }
  
  OnEdit(data) {
    $("#EditLanguageModal").modal("show");
    console.log("data", data);
    this.editLanguageForm.controls["langName"].setValue(data.language);
    // this.editLanguageForm.controls["kName"].setValue(data.keys);

    this.languageId = data.languageId;
    // this.userId = data.userId
    console.log("idd", this.languageId);
  }

  updateLanguage() {
    if (this.editLanguageForm.valid) {
      // const updatelangObj = new FormData();
      // updatelangObj.append('languageId', this.languageId)
      // updatelangObj.append('userId', this.userId)
      
      // updatelangObj.append('language', this.editLanguageForm.value.langName)
      // updatelangObj.append('keys', this.editLanguageForm.value.kName)
      let updatelangObj = {
        languageId: this.languageId,
        language: this.editLanguageForm.value.langName,
      }
      
      console.log(updatelangObj, "dsdsdssdsd")

      this.ekartServices.LanguageUpdate(updatelangObj).subscribe((updateResp) =>{
        if(updateResp.statusCode == 200){
          console.log("success")
          Swal.fire({
            icon:'success',
            text:'Language Updated Successfuly',
            timer: 2000,
            showConfirmButton: false
          })
          $("#EditLanguageModal").modal("hide");
          this.getLanguages();
        } else {
          console.log("error");
          Swal.fire({
            icon: "error",
            text: "Please Add Unique language",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      })
    }
  }

  OnDelete(item) {
    console.log("ID", item);
    let deleteObj = {
      languageId: item.languageId,
    };
    Swal.fire({
      title: "Are You Sure?",
      text: "Want To Delete This Item..!",
      icon: "warning",
      confirmButtonText: "Yes, Delete it",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.ekartServices.LanguageDelete(deleteObj).subscribe((deleteresp) => {
          if (deleteresp.statusCode == 200) {
            Swal.fire({
              icon: "success",
              text: "Language Deleted Successfully",
              showConfirmButton: false,
              timer: 2000,
            });
          }
          this.getLanguages();
        });
      } else if (result.isDenied) {
        Swal.fire("Something went wrong..!", "error");
      }
    });
  }

  modelClose(){
    this.LanguageForm.reset();
  }
}

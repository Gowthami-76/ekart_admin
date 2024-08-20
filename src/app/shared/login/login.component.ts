import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { EkartadminService } from "app/Services/ekartadmin.service";
import Swal from "sweetalert2";
declare const $: any


@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public LoginForm: FormGroup;
  public hasError: boolean = false;
  editLoginForm: FormGroup;

  constructor(private router: Router, private ekartservice: EkartadminService) {
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    this.LoginForm = new FormGroup({
      Email: new FormControl("", [
        Validators.required,
        Validators.pattern(emailRegex),
      ]),
      password: new FormControl("", [Validators.required]),
    });

    this.editLoginForm = new FormGroup({
      changePassword: new FormControl("")
    })
  }

  ngOnInit(): void {}

  adminLogin() {
    if (this.LoginForm.valid) {
      let adminObj = {
        email: this.LoginForm.value.Email,
        password: this.LoginForm.value.password,
      };

      this.ekartservice.adminLogin(adminObj).subscribe((loginResp) => {
        console.log(loginResp);
        if (loginResp.statusCode == 200) {
          localStorage.setItem("userDetails", loginResp.logindetails._id);
          Swal.fire({
            icon: "success",
            text: "Successfully Logged in",
            showConfirmButton: false,
            timer: 3000,
          });
          this.router.navigateByUrl("Dashboard");
          // this.userDetails = loginResp.
        } else {
          console.log("error");
          Swal.fire({
            icon: "error",
            text: "Invalid Credentials, Please enter valid credentails",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      });
    } else {
      this.hasError = true;
      console.log("error");
      alert("Hello! I am an alert box!!");    }
  }

  // EditLogin(){
  //   $("#exampleModal").modal("show");
  //   if(this.editLoginForm.valid){
  //     let changePasswordObj = {
  //       "adminId":"babbe8c2-2b33-4641-869e-bf7c24df2b4e",
  //       password: this.editLoginForm.value.changePassword
  //     }
  //     this.ekartservice.editPasswordAdmin(changePasswordObj).subscribe((passwordResp) => {
  //       if(passwordResp.statusCode == 200){
  //         Swal.fire({
  //           icon:"success",
  //           text: "Successfully Logged in",
  //           showConfirmButton: false,
  //           timer: 3000,
  //         })
  //         $("#exampleModal").modal("hide");
  //       }else{
          
  //       }
  //     })
  //   }
  // }
}

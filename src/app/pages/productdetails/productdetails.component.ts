import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EkartadminService } from 'app/Services/ekartadmin.service';
@Component({
  selector: 'productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  public hasError : boolean = false
  productForm: FormGroup;

  constructor(
       private router: Router,
       private ekartservice: EkartadminService,
       ) { 
         this.productForm = new FormGroup({
          pname: new FormControl('', [Validators.required]),
          psize: new FormControl('', [Validators.required]),
          pquantity: new FormControl('', [Validators.required]),
          plength: new FormControl('', [Validators.required]),
          plocation:new FormControl('', [Validators.required]),
         });
       }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
} from "@angular/forms";
import { Router } from "@angular/router";
import { EkartadminService } from "app/Services/ekartadmin.service";
import Swal from "sweetalert2";
import { environment } from "environments/environment";
import { filter, forkJoin } from "rxjs";
import { IDropdownSettings } from "ng-multiselect-dropdown";
declare const $: any;

interface EditProductDetails {
  productInfo: {}[];
}
interface Tab {
  id: number;
  title: string;
  content: string;
}

@Component({
  selector: "productlist",
  templateUrl: "./productlist.component.html",
  styleUrls: ["./productlist.component.css"],
})
export class ProductlistComponent implements OnInit {
  public hasError: boolean = false;
  imageFile: any;
  productsList: any;
  BaseUrl: string = environment.BaseUrl;
  podView: any;
  EkartadminService: any;
  editProductForm: FormGroup;
  //EditProductForm: any;
  productID: any;
  searchfilter: FormGroup;
  languageList: any;
  languages: any;
  productForm: FormGroup;
  productAddForm: FormGroup;
  editingImage: any;
  productId: any;
  IsproductImage: boolean;
  imageFile1: any;
  searchKey: String = "";
  values = [];
  storedValues = [];
  prodType: string = "add";
  IsproductImage1: boolean = true;
  IsproductImage2: boolean = true;

  // imageFile2: any = {};
  // imageFile3: any = {};
  imageFile2: any;
  imageFile3: any;

  editingProductImage1: any;
  editingProductImage2: any;

  editImageValid: boolean = true;

  storedVendorDetails: Object = {};
  vendorProductList: any;
  langDetails: any;
  getProductId: string;
  sortDir = 1; //1= 'ASE' -1= DSC
  langId: any;
  productImageForm: FormGroup;
  productLangForm: FormGroup;
  prodLangId: any;
  requestType: string;
  editProductDetails: EditProductDetails = {
    productInfo: [],
  };
  activeTabId: number = 0;
  tabs: Tab[] = [
    { id: 1, title: "Tab 1", content: "Tab 1 Content" },
    { id: 2, title: "Tab 2", content: "Tab 2 Content" },
    { id: 3, title: "Tab 3", content: "Tab 3 Content" },
  ];

  constructor(
    private ekartServices: EkartadminService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.productImageForm = new FormGroup({
      pimage: new FormControl(""),
      pimage2: new FormControl(""),
    });
    this.productForm = new FormGroup({
      productName: new FormControl("", [Validators.required]),
      productName1: new FormControl(""),
      productAliasName: this.fb.array([]),

      Langname: new FormControl(""),
      // pimage2: new FormControl('', [Validators.required]),
      // pcode: new FormControl('', [Validators.required]),
      // aliasNames: new FormControl([], [Validators.required]),
    });
    this.productLangForm = new FormGroup({
      productName: new FormControl("", [Validators.required]),
      productName1: new FormControl(""),
      productAliasName: this.fb.array([]),
      Langname: new FormControl(""),
    });
    // this.productForm = this.fb.group({
    //   pname1: ['', [Validators.required]],
    //   pname2: [''],
    //   pimage: [''],
    //   aliesGroup: this.fb.array([])
    // });

    // this.editProductForm = new FormGroup({
    //   productName1: new FormControl("", [Validators.required]),
    //   productName2: new FormControl(""),
    //   editProdimage: new FormControl(""),
    //   editProdimage1: new FormControl(""),
    //   productAliasName: this.fb.array([this.fb.control("")]),

    //   // prodCode: new FormControl('', [Validators.required]),
    // });

    this.editProductForm = this.fb.group({
      productName1: ["", Validators.required],
      productName2: [""],
      editProdimage: [""],
      editProdimage1: [""],
      productAliasName: this.fb.array([this.fb.control("")]),

      // prodCode: new FormControl('', [Validators.required]),
    });
    this.searchfilter = new FormGroup({
      searchInput: new FormControl("", Validators.required),
    });
  }

  clearFormArray = (productAliasNameArray: FormArray) => {
    while (productAliasNameArray.length !== 0) {
      productAliasNameArray.removeAt(0);
    }
  };
  setActiveTab(tabId: number, editProductObject): void {
    console.log(editProductObject, "editProductObject..................");
    this.clearFormArray(this.productAliasNameArray);
    this.activeTabId = tabId;

    // console.log(aliasNames, "133.............");
    this.editProductForm.controls["productName1"].setValue(
      editProductObject?.productName1
    );
    this.editProductForm.controls["productName2"].setValue(
      editProductObject?.productName2
    );
    //this.clearFormArray(this.productAliasNameArray);
    console.log(editProductObject, "editobject..");

    if (editProductObject.productAliasName.length !== 0) {
      console.log("entered if.......................");
      console.log(
        editProductObject.productAliasName,
        "before for loop............"
      );
      // this.productAliasNameArray = []
      for (var i = 0; i < editProductObject?.productAliasName.length; i++) {
        this.productAliasNameArray.push(
          this.fb.control(editProductObject?.productAliasName[i])
        );
        // this.productAliasNameArray.push(
        //   new FormControl (editProductObject?.productAliasName[i])
        // );
        console.log(
          this.productAliasNameArray,
          "146.................................."
        );
      }
    }

    console.log("this.editProductForm_", this.editProductForm);

    // if (aliasNames) {
    //   for (var i = 0; i < editProductObject?.productAliasName.length; i++) {
    //     this.alternateAliesGroup.push(
    //       this.fb.control(editProductObject?.productAliasName[i])
    //     );
    //   }
    //   this.editProductForm.setControl(
    //     "productAliasName",
    //     this.alternateAliesGroup
    //   );
    // }
  }

  get productAliasNameArray(): FormArray {
    return this.editProductForm.get("productAliasName") as FormArray;
  }

  // set productAlias(arrayValue): FormArray {
  //   this.productAliasNameArray
  // }
  get alternateAliesGroup() {
    if (this.requestType == "create") {
      return this.productForm.get("productAliasName") as FormArray;
    } else if (this.requestType == "langAdd") {
      return this.productLangForm.get("productAliasName") as FormArray;
    } else {
      return this.editProductForm.get("productAliasName") as FormArray;
    }
  }

  addAlternateAliesGroup(requestType) {
    this.requestType = requestType;
    this.alternateAliesGroup.push(this.fb.control(""));
  }

  dropdownSettings: IDropdownSettings = {};

  urls: any[] = [];
  index: any;
  imageDeleteFrom!: FormGroup;
  imagePath: any;
  RemoveImage: boolean = false;

  selectFiles(event: any) {
    if (event.target.files.length <= 2 && this.urls.length <= 2) {
      for (var i = 0; i < event.target.files.length; i++) {
        console.log(event.target.files, "event.....");
        this.imageFile = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (event: any) => {
          this.urls = [];
          this.urls.push(event.target.result);
          console.log(this.urls, "urls.....");
          this.RemoveImage = true;
        };
      }
    } else this.RemoveImage = false;
  }
  removeSelectedFile(index: any) {
    this.urls = this.urls.slice(index + 1);
    console.log(this.urls.slice(index), ".......slice");
    this.imageFile = "null";
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
          console.log(this.urls1);
          this.RemoveImage1 = true;
        };
      }
    } else this.RemoveImage1 = false;
  }
  removeSelectedFile1(index: any) {
    this.urls1 = this.urls1.slice(index + 1);
    console.log(this.urls1.slice(index), ".......slice");
    this.imageFile1 = "null";
  }

  // brand image Edit
  urls2: any[] = [];
  index2: any;
  imageDeleteFrom2!: FormGroup;
  imagePath2: any;
  RemoveImage2: boolean = false;

  selectFiles2(event: any) {
    if (event.target.files.length <= 2 && this.urls.length <= 2) {
      this.IsproductImage1 = false;
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
    this.IsproductImage1 = true;
  }

  // Edit Brand Logo
  urls3: any[] = [];
  index3: any;
  imageDeleteFrom3!: FormGroup;
  imagePath3: any;
  RemoveImage3: boolean = false;

  selectFiles3(event: any) {
    if (event.target.files.length <= 2 && this.urls.length <= 2) {
      this.IsproductImage2 = false;
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
    this.IsproductImage2 = true;
  }

  ngOnInit(): void {
    // this.getProductId = localStorage.getItem("productId");

    this.getProductList();
    // this.getLanguages();
    this.getLanguageDetails();

    // $("select").selectpicker();
    // this.dropdownSettings = {
    //   idField: "fileId",
    //   textField: "fileLanguage",
    // };
  }

  //get Products List
  getProductList() {
    this.ekartServices.ListofProducts().subscribe((resp) => {
      if (resp.StatusCode == 200) {
        this.productsList = resp.adminProductsList.filter(
          (item) => item.productInfo.length > 0
        );
        //this.productsList = resp.adminProductsList;
        console.log("List", this.productsList);
      }
    });
  }

  onSortClick(event) {
    let target = event.currentTarget,
      classList = target.classList;

    if (classList.contains("fa-chevron-up")) {
      classList.remove("fa-chevron-up");
      classList.add("fa-chevron-down");
      this.sortDir = -1;
    } else {
      classList.add("fa-chevron-up");
      classList.remove("fa-chevron-down");
      this.sortDir = 1;
    }
    this.sortArr("productName1");
  }

  sortArr(colName: any) {
    this.productsList.sort((a, b) => {
      a = a[colName].toLowerCase();
      b = b[colName].toLowerCase();
      return a.localeCompare(b) * this.sortDir;
    });
  }

  // add image product

  addProductImages() {
    if (this.productImageForm.valid) {
      const productsData = new FormData();

      productsData.append("productImage", this.imageFile);
      productsData.append("productImage2", this.imageFile1);

      console.log(productsData, "productsdata............");
      this.ekartServices
        .adminProductImage(productsData)
        .subscribe((productsResp) => {
          console.log(productsResp);
          console.log(
            productsResp.addVehicleRes.productImage2.length,
            "length.."
          );
          if (productsResp.statusCode == 200) {
            Swal.fire({
              icon: "success",
              text: " Product Images added successfully ",
              timer: 3000,
              showConfirmButton: false,
            });
          } else {
            Swal.fire({
              icon: "error",
              text: "ProductName1 is already existed",
              timer: 3000,
              showConfirmButton: false,
            });
          }
          $("#ProductlistModal").modal("show");
          this.productImageForm.reset();
          $("#exampleModal").modal("hide");
          localStorage.setItem(
            "productId",
            productsResp.addVehicleRes.productId
          );
          this.getProductId = localStorage.getItem("productId");
          this.urls = [];
          this.urls1 = [];
          this.imageFile = {};
          this.imageFile1 = {};
        });
    } else {
      this.hasError = true;
    }
  }

  changeWebsite(languageId) {
    if (languageId > 0) {
      this.langId = this.langDetails[languageId - 1].languageId;
    }
  }

  //add product
  addProduct() {
    // console.log(this.productForm.value);
    // console.log(this.imageFile);
    // console.log("alias-Name", this.productForm.value.productAliasName);
    if (this.productForm.valid) {
      let productListAdd = {
        productId: this.getProductId,
        productName1: this.productForm.value.productName,
        productName2: this.productForm.value.productName1
          ? this.productForm.value.productName1
          : "",
        languageId: this.langId,
        productAliasName: this.productForm.value.productAliasName,

        // productsData.append("productAliasName", this.productForm.value.productAliasName)

        // productsData.append("productImage", this.imageFile)

        // productsData.append("productCode", this.productForm.value.pcode)
        // if (this.imageFile) {
        //   for (var i = 0; i <  this.imageFile.length; i++) {
        //     productsData.append("productImage",  this.imageFile[i]);
        //   }
        //   // productsData.append("productImage", this.imageFile)
        // }

        //new comment
        // if (this.imageFile) {
        //   productsData.append("productImage", this.imageFile)
        // }
        // if (this.imageFile4) {
        //   productsData.append("productImage2", this.imageFile4)
        // }

        // productsData.append("productImage", this.imageFile);
        // productsData.append("productImage2", this.imageFile1);
        // languageId:this.productForm.value.Langname,
        // console.log("lan", this.productForm.value.languageId);

        // let formData = new FormData;
        // formData.append('file', JSON.stringify(this.imageFile));
        // let params = {
        //   ...this.productForm.value
        // };
        // params['productImage'] = formData;
      };

      // if (this.productForm.value.productAliasName) {
      //   for (
      //     var i = 0;
      //     i < this.productForm.value.productAliasName.length;
      //     i++
      //   ) {

      //   }
      // }

      // console.log("object", productListAdd )

      // const productsData = new FormData();

      this.ekartServices.adminProductListDetails(productListAdd).subscribe(
        (productsResp) => {
          if (productsResp.statusCode == 200) {
            // console.log("kumar");
            Swal.fire({
              icon: "success",
              text: "product added successfully",
              timer: 3000,
              showConfirmButton: false,
            });
          } else {
            Swal.fire({
              icon: "error",
              text: "ProductName1 is already existed",
              timer: 3000,
              showConfirmButton: false,
            });
          }
          this.getProductList();
          this.productForm.reset();
          this.alternateAliesGroup.clear();
          $("#ProductlistModal").modal("hide");
          // this.urls = [];
          // this.urls1 = [];

          // this.imageFile = {};
          // this.imageFile1 = {};
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
      this.hasError = true;
    }
  }

  editimageclear() {
    this.editImageValid = false;
    console.log("clearImage");
  }

  OnView(data: any) {
    console.log(data);
    $("#ViewProductModal").modal("show");
    this.podView = data;
  }

  onLangAdd(data: any) {
    $("#ProductlangModal").modal("show");
    this.prodLangId = data.productId;
  }

  addProductLang() {
    console.log(this.productLangForm.value);
    if (this.productLangForm.valid) {
      let productLangAdd = {
        // locale: "en",
        productId: this.prodLangId,
        productName1: this.productLangForm.value.productName,
        productName2: this.productLangForm.value.productName1
          ? this.productLangForm.value.productName1
          : "",
        languageId: this.langId,
        productAliasName: this.productLangForm.value.productAliasName,
      };
      // console.log("object", productLangAdd)

      this.ekartServices
        .adminProductListDetails(productLangAdd)
        .subscribe((productsResp) => {
          console.log("msg", productsResp);
          if (productsResp.statusCode == 200) {
            Swal.fire({
              icon: "success",
              text: "product Details added successfully",
              timer: 3000,
              showConfirmButton: false,
            });
          } else {
            Swal.fire({
              icon: "error",
              text: productsResp.message,
              timer: 3000,
              showConfirmButton: false,
            });
          }
          this.getProductList();
          this.productLangForm.reset();
          this.alternateAliesGroup.clear();
          $("#ProductlangModal").modal("hide");
          // this.urls = [];
          // this.urls1 = [];

          // this.imageFile = {};
          // this.imageFile1 = {};
        });
    } else {
      this.hasError = true;
    }
  }

  // delete(item) {
  //   console.log("ID", item);
  //   let deleteObj = {
  //     productId: item.productId,
  //   };

  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "Want To Delete This Item..!",
  //     icon: "warning",
  //     confirmButtonText: "Yes, Delete it",
  //     showCancelButton: true,
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       forkJoin(
  //         this.ekartServices.ProductDelete(deleteObj),
  //         this.ekartServices.adminVendorProductDelete(deleteObj)
  //       ).subscribe((deleteresp) => {
  //         {
  //           Swal.fire({
  //             icon: "success",
  //             text: "Product Deleted Successfully",
  //             showConfirmButton: false,
  //             timer: 2000,
  //           });
  //         }
  //         this.getProductList();
  //       });
  //     } else if (result.isDenied) {
  //       Swal.fire("Something went wrong..!", "error");
  //     }
  //   });
  // }

  delete(item) {
    let deleteObj = {
      productId: item.productId,
    };
    Swal.fire({
      title: "Are You Sure?",
      text: "Want To Delete This Item..!",
      icon: "warning",
      confirmButtonText: "Yes, Delete it",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.ekartServices.ProductDelete(deleteObj).subscribe((deleteResp) => {
          // console.log(deleteResp)
          if (deleteResp.statusCode == 200) {
            // console.log("kumar");
            Swal.fire({
              icon: "success",
              text: "product delete successfully",
              timer: 3000,
              showConfirmButton: false,
            });
          } else {
            Swal.fire({
              icon: "error",
              text: "Product cannot be deleted as it was added by vendor",
              timer: 3000,
              showConfirmButton: false,
            });
          }
          this.getProductList();
        });
      } else if (result.isDenied) {
        Swal.fire("Something went wrong..!", "error");

        // else{

        // }
      }
    });
    // });
  }
  debugger;
  OnEdit(data) {
    console.log("data", data);
    // this.productForm.patchValue(data);
    this.productId = data.productId;
    this.editProductDetails = data;
    this.setActiveTab(
      0,
      data.productInfo[0]
      // data.productInfo[0].productAliasName
    );
    $("#EditProductModal").modal("show");
    // console.log("typeof", this.editProductDetails);
    // this.editProductDetails.productInfo.forEach((item) => {});
    // this.editProductForm.controls["productName1"].setValue(data.productName);
    // this.editProductForm.controls["productName"].setValue(data.productName1);

    // this.editProductForm.controls["productImage1"].setValue(data.productImage);
    // this.editingProductImage1 =
    //   this.editProductForm.controls["productImage1"].value;
    // this.editProductForm.controls["productImage2"].setValue(data.productImage2);
    // this.editingProductImage2 =
    //   this.editProductForm.controls["productImage2"].value;

    // if (data.productAliasName) {
    //   for (var i = 0; i < data.productAliasName.length; i++) {
    //     this.alternateAliesGroup.push(
    //       this.fb.control(data.productAliasName[i])
    //     );
    //   }
    // this.editProductForm.setControl(
    //   "productAliasName",
    //   this.alternateAliesGroup
    // );
    // }
  }

  UpdateVendor() {
    if (this.editProductForm.valid) {
      const prodUpdateData = new FormData();
      prodUpdateData.append("productId", this.productId);
      console.log("ID", this.productId);
      prodUpdateData.append(
        "productName1",
        this.editProductForm.value.productName
      );
      prodUpdateData.append(
        "productName",
        this.editProductForm.value.productName1
      );

      //   if(this.editImageValid = true){

      //       console.log("ifcondition")
      //       prodUpdateData.append('productImage', this.imageFile2)

      //   }
      // else {
      //         console.log('editImage')
      //         prodUpdateData.append("productImage", null);

      //       }

      if (this.imageFile2) {
        prodUpdateData.append("productImage", this.imageFile2);
      }

      if (this.imageFile3) {
        prodUpdateData.append("productImage2", this.imageFile3);
      }

      // prodUpdateData.append("productCode", this.editProductForm.value.prodCode);

      //IMAGE 2 IF CONDITION
      // if (Object.keys(this.imageFile2).length > 0) {
      //   prodUpdateData.append("productImage", this.imageFile2);
      // }
      // else if(this.editingProductImage1.length < 0){
      //  prodUpdateData.append("productImage", null);
      // }
      // else{
      //   prodUpdateData.append("productImage", this.imageFile2);
      // }

      // else {
      //   prodUpdateData.append("productImage", null);
      // }

      //images 3 if condition
      // if (Object.keys(this.imageFile3).length > 0) {
      //   prodUpdateData.append("productImage2", this.imageFile3);
      // }
      // else if(this.editingProductImage2.length < 0){
      //   prodUpdateData.append("productImage2", null);

      //  }
      //  else{
      //    prodUpdateData.append("productImage2", this.imageFile3);
      //  }

      //new Comments
      // console.log(this.imageFile);
      //   console.log(Object.keys(this.imageFile).length != 0);
      // if(Object.keys(this.imageFile).length != 0) {
      //   prodUpdateData.append('productImage', this.imageFile)
      // }

      // if(this.urls && !this.imageFile) {
      //   let url: Array<any> = this.urls[0].replace(this.BaseUrl, '')
      //   prodUpdateData.append('productImage', url)
      // }

      if (this.editProductForm.value.productAliasName) {
        for (
          var i = 0;
          i < this.editProductForm.value.productAliasName.length;
          i++
        ) {
          prodUpdateData.append(
            "productAliasName",
            this.editProductForm.value.productAliasName[i]
          );
        }
        // productsData.append("productImage", this.imageFile)
      }
      // let params = {
      //   ...this.productForm.value
      // };
      // params['productImage'] = this.imageFile;
      // params['productId'] = this.EditProductForm.productId;

      this.ekartServices
        .ProductUpdate(prodUpdateData)
        .subscribe((updateResp) => {
          if (updateResp.statusCode == 200) {
            Swal.fire({
              icon: "success",
              text: "product Details Updated Successfully",
              timer: 2000,
              showConfirmButton: false,
            });
            // $("#EditVendorModal").modal("hide");
            this.getProductList();
            this.alternateAliesGroup.clear();
            this.urls2 = [];
            this.urls3 = [];
            // this.imageFile2 = {};
            // this.imageFile3 = {};

            $("#EditProductModal").modal("hide");
            this.editProductForm.reset();
          }
        });
    }
    // else(this.hasError = true)
    else {
      console.log("error");
    }
  }

  deleteProduct1() {
    let deleteImg = {
      productId: this.productId,
      productImage: this.editingProductImage1[0],
    };
    this.ekartServices.productImageDelete(deleteImg).subscribe((delResp) => {
      if (delResp.statusCode == 200) {
      } else {
      }
    });
  }

  deleteProduct2() {
    let deleteImg = {
      productId: this.productId,
      productImage2: this.editingProductImage2[0],
    };
    this.ekartServices.productImageDelete1(deleteImg).subscribe((delResp) => {
      if (delResp.statusCode == 200) {
      } else {
      }
    });
  }

  // OnEdit(data) {
  //   console.log("data", data);
  //   this.editProductForm.controls['prodName'].setValue(data.productName)
  //   this.editProductForm.controls['prodCode'].setValue(data.productCode)
  //   this.editProductForm.controls['prodImage'].setValue(data.productImage);
  //  // console.log("Img", this.EditProductUpload.controls['prodimage'].value);
  //   this.editingImage = this.editProductForm.controls['prodImage'].value;
  //   console.log("product image",this.editingImage);

  //   this.EditProductForm = data;

  //   this.productId = data.productId;
  //   console.log("IDD", this.productId);
  // }

  // updateProduct() {
  //   if (this.editProductForm.valid) {
  //     const productUpdateData = new FormData();
  //     productUpdateData.append('productId', this.EditProductForm.productId);
  //     console.log("ID", this.productId);
  //     productUpdateData.append('productName', this.editProductForm.value.prodName);
  //     productUpdateData.append('productCode', this.editProductForm.value.prodCode);
  //     // if (this.imageFile) {
  //     //   productUpdateData.append('productImage', this.imageFile);
  //     // }
  //     console.log('product',productUpdateData);

  //     this.ekartServices.ProductUpdate(productUpdateData).subscribe((updateResp) => {
  //       if (updateResp.statusCode == 200) {
  //         Swal.fire({
  //           icon: 'success',
  //           text: 'Product Updated Successfully',
  //           timer: 2000,
  //           showConfirmButton: false
  //         })
  //         $('#EditProductModal').modal('hide');
  //         this.getProductList();
  //       }
  //     })
  //   }
  //   else{console.log("err");}
  // }

  // searchFilter() {
  //   let filterObj = {
  //     size: this.searchfilter.value.searchInput,
  //     quantity: this.searchfilter.value.searchInput,
  //     productName: this.searchfilter.value.searchInput
  //   }

  //   forkJoin(this.ekartServices.getProductsbySize(filterObj), this.ekartServices.getproductbyQunaity(filterObj), this.ekartServices.getproductsbyproductName(filterObj)).subscribe((filterResp) => {
  //     if (filterResp) {
  //       this.productsList = filterResp[0].userProdResponse;
  //       this.productsList = filterResp[1].userProdResponse;
  //       this.productsList = filterResp[2].userProdResponse;
  //       console.log("Filter Response", this.productsList)
  //     }
  //     else {
  //       console.log("error");
  //     }
  //   })
  // }

  //get Languages
  getLanguages() {
    // console.log("test");
    this.ekartServices.getLanguages().subscribe((langResp) => {
      if (langResp.StatusCode == 200) {
        this.languageList = langResp.Data.languagesDoc;
        // console.log("Get Langs", this.languageList);
        this.languages = this.languageList.fileLanguage;
        // console.log("langs", this.languages);
      }
    });
  }

  getLanguageDetails() {
    this.ekartServices.getVendorLanguages().subscribe((Langresp) => {
      if (Langresp.StatusCode == 200) {
        this.langDetails = Langresp.Data.selectedLanguages;
        console.log("language List", this.langDetails);
      }
    });
  }

  searchProduct() {
    let productData = {
      productName2: this.searchKey,
      productName1: this.searchKey,
      productName: this.searchKey,
      productAliasName: this.searchKey,
    };
    // console.log('search1', productData)
    // console.log('search', this.searchKey)
    this.ekartServices.searchProduct(productData).subscribe((prodResp) => {
      if (prodResp.StatusCode == 200) {
        this.productsList = prodResp.userProdResponse;
      }
    });
  }

  removevalue(i: number, obj) {
    // this.productForm.controls.productAliasName[i].removeControl();
    // this.alternateAliesGroup.splice(i, 1);
    this.alternateAliesGroup.removeAt(i);
    console.log(i, obj, "removeValue..........");
  }

  // addvalue(){
  //   const creds = this.productForm.controls.aliesGroup as FormArray;
  //   console.log(creds);
  //   creds.push(this.fb.group({
  //     pdAliasName: '',
  //   }));
  //   creds.push(new FormControl(''));
  // }

  // valueStore(event,index){
  //   console.log(event.value)
  //  let findindex =  this.storedValues.findIndex((e,i) => i==index)
  //  console.log(findindex)
  //  if(findindex != -1){
  //   this.storedValues.push(event.value)

  //  }
  //  console.log(this.storedValues)
  // }
  ProductModalClose() {
    this.productForm.reset();
    this.alternateAliesGroup.clear();
    this.urls = [];
    this.urls1 = [];
    this.imageFile = {};
    this.imageFile1 = {};
    this.hasError = false;
  }

  editModalReset() {
    console.log("clear");
    this.editProductForm.reset();
    this.alternateAliesGroup.clear();
    this.urls2 = [];
    this.urls3 = [];
    this.imageFile2 = {};
    this.imageFile3 = {};
    this.hasError = false;
  }

  getVendorProductDetails(productsList) {
    console.log(productsList);
    this.storedVendorDetails = productsList;
    this.getVendorProductDetailsById(productsList);
  }
  getVendorProductDetailsById(productsList) {
    // let params ={
    //   productId: productsList.productId
    // }
    var params = productsList.productId;

    // console.log("shan", params);

    this.ekartServices
      .getVendorProductDetailsByIds(params)
      .subscribe((vendorResp) => {
        if (vendorResp.statusCode == 200) {
          // console.log("kumar", vendorResp);
          this.vendorProductList = vendorResp.resp;
          // console.log("vendor", this.vendorProductList);
        }
        $("#exampleModalCenter").modal("show");
      });
  }

  languageFilter(lang) {}
  // reloadpage(){
  //   setTimeout("location.reload(true);",200);
  // }
}

import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { data } from "jquery";

@Injectable({
  providedIn: "root",
})
export class EkartadminService {
  productId(deleteObj: { productId: any }) {
    throw new Error("Method not implemented.");
  }

  constructor(private httpClient: HttpClient) {}

  //Admin Login
  public adminLogin(data: any): Observable<any> {
    try {
      return this.httpClient.post(environment.BaseUrl + "admin/login", data);
    } catch (error) {}
  }

  // admin Product Kart Add
  public productAdd(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin-product/addAdminProduct",
        data
      );
    } catch (error) {}
  }

  // admin Product List
  public ListofProducts(): Observable<any> {
    try {
      return this.httpClient.get(
        environment.BaseUrl + "admin-product/getAdminProductsListInfo"
      );
    } catch (error) {}
  }

  //delete Product
  public ProductDelete(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin-product/deleteadminproduct",
        data
      );
    } catch (error) {}
  }

  //delete admin vendor Product
  public adminVendorProductDelete(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin-product/deletevendorProduct",
        data
      );
    } catch (error) {}
  }

  //update product
  public ProductUpdate(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin-product/updateadminproduct",
        data
      );
    } catch (error) {}
  }

  // Get Users List
  public UsersList(): Observable<any> {
    try {
      return this.httpClient.get(environment.BaseUrl + "users/listUsers");
    } catch (error) {}
  }

  //search user
  public searchUser(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "users/getusersbylocation",
        data
      );
    } catch (error) {}
  }

  //vendor list add

  public VendorsAdd(data: any): Observable<any> {
    try {
      return this.httpClient.post(environment.BaseUrl + "users/register", data);
    } catch (error) {
      console.log(error, "error message.........");
    }
  }

  // vendor delete

  public VenderDelete(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "users/removeUser",
        data
      );
    } catch (error) {}
  }

  // vendor Update

  public VendorUpdate(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "users/updateUser",
        data
      );
    } catch (error) {}
  }

  // Add Language
  public addLanguage(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "languages/addLang",
        data
      );
    } catch (error) {}
  }

  // Get Languages
  public getLanguages(): Observable<any> {
    try {
      return this.httpClient.get(environment.BaseUrl + "languages/getLang");
    } catch (error) {}
  }

  // Get User Products
  public getuserProdcts(data): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "product/getUserProducts",
        data
      );
    } catch (error) {}
  }

  // get Products by size
  public getProductsbySize(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "product/getProductBySize",
        data
      );
    } catch (error) {}
  }

  // get Products by Quantity
  public getproductbyQunaity(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "product/getProductBySize",
        data
      );
    } catch (error) {}
  }

  // get products by productname
  public getproductsbyproductName(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "product/getProductByName",
        data
      );
    } catch (error) {}
  }

  // delete language
  public LanguageDelete(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "languages/deleteLanguage",
        data
      );
    } catch (error) {}
  }

  // language update
  public LanguageUpdate(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "languages/updateLan",
        data
      );
    } catch (error) {}
  }

  // Add Location
  public locationAdding(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin/addLocation",
        data
      );
    } catch (error) {}
  }

  // Add Mandal
  public addMandal(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin/addLocation",
        data
      );
    } catch (error) {}
  }

  // get Mandal data
  public getMandalData(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin/getLocationbyDistrict",
        data
      );
    } catch (error) {}
  }

  // Get Locations
  public getLocations(): Observable<any> {
    try {
      return this.httpClient.get(environment.BaseUrl + "admin/getLocations");
    } catch (error) {}
  }

  // Get Locations
  public getStoreLocationsList(): Observable<any> {
    try {
      return this.httpClient.get(environment.BaseUrl + "admin/getLocations");
    } catch (error) {}
  }

  // Delete State
  public Locationdelete(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin/deleteLocationbyState",
        data
      );
    } catch (error) {}
  }

  // Delete District
  public deleteDistrict(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin/deleteLocationbyDistrict",
        data
      );
    } catch (error) {}
  }

  // Delete Mandal
  public deleteMandal(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin/deleteLocationByMandal",
        data
      );
    } catch (error) {}
  }

  // Delete Village
  public deleteVillage(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin/deleteLocationByVillage",
        data
      );
    } catch (error) {}
  }

  // Get Reports List
  public getRepots(): Observable<any> {
    try {
      return this.httpClient.get(
        environment.BaseUrl + "users/getusersByReport"
      );
    } catch (error) {}
  }

  // Get all Feedback List
  public getFeedbacklist(): Observable<any> {
    try {
      return this.httpClient.get(
        environment.BaseUrl + "users/getusersByFeedback"
      );
    } catch (error) {}
  }

  // get all request list
  public getRequestList(): Observable<any> {
    try {
      return this.httpClient.get(
        environment.BaseUrl + "requests/getproductrequestslist"
      );
    } catch (error) {}
  }

  // delete Request

  public RequestDelete(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "requests/deleteproductrequest",
        data
      );
    } catch (error) {}
  }

  // get all location list
  public getLocationList(): Observable<any> {
    try {
      return this.httpClient.get(
        environment.BaseUrl + "requests/getlocationrequestslist"
      );
    } catch (error) {}
  }

  // delete Location

  public LocationDelete(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "requests/deletelocationrequest",
        data
      );
    } catch (error) {}
  }

  // Add Product Sizes
  public addproductSizes(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin/addProductSize",
        data
      );
    } catch (error) {}
  }

  // Get Product Sizes
  public getproductSizes(): Observable<any> {
    try {
      return this.httpClient.get(environment.BaseUrl + "admin/getProductSize");
    } catch (error) {}
  }

  // edit product size
  public editproductSize(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin/updateSize",
        data
      );
    } catch (error) {}
  }

  // Delete Product Size
  public productSizeDelete(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin/removeSize",
        data
      );
    } catch (error) {}
  }

  // add Product Length
  public addproductLength(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin/addProductLength",
        data
      );
    } catch (error) {}
  }

  // Edit Product Length
  public editProductLength(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin/editProductLength",
        data
      );
    } catch (error) {}
  }

  // get all products lenghts
  public getallproductlenghts(): Observable<any> {
    return this.httpClient.get(environment.BaseUrl + "admin/getProductLength");
  }

  //delete product length
  public productLengthDelete(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin/removeLength",
        data
      );
    } catch (error) {}
  }

  //State Update
  public locationStateUpdate(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin/updateLocation",
        data
      );
    } catch (error) {}
  }

  // get vendor product details

  public getVendorProduct(): Observable<any> {
    try {
      return this.httpClient.get(
        environment.BaseUrl + "admin-product/getVendorProductsList"
      );
    } catch (error) {}
  }

  // Search product details

  public searchProduct(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin-product/search",
        data
      );
    } catch (error) {}
  }

  // Search product details

  public getVendorProdDetailsById(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin-product/getvendorProductsByUserId",
        data
      );
    } catch (error) {}
  }

  // Search view Vendor details

  public getVendorDetailsById(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "users/getUsersByIds",
        data
      );
    } catch (error) {}
  }

  // user status details
  public getUserStatusDetails(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "users/getUserByStatus",
        data
      );
    } catch (error) {}
  }

  // notification get user details

  public notificationGetUserDetails(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "notifications/getByUserId",
        data
      );
    } catch (error) {}
  }

  // multi notification get user details

  public multiNotificationGetUserDetails(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "users/getUsersByIds",
        data
      );
    } catch (error) {}
  }

  // sent notification for user

  public notificationSentByUser(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "notifications/sendPushNotification",
        data
      );
    } catch (error) {}
  }

  // bulk sent notification for user

  public bulkNotificationSentByUser(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "notifications/sendBulkPushNotification",
        data
      );
    } catch (error) {}
  }

  // bulk sent sms for user

  public bulkSmsSentByUser(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "users/smssending",
        data
      );
    } catch (error) {}
  }

  // delete Request method

  public deleteRequest(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "users/deleteReport",
        data
      );
    } catch (error) {}
  }

  // delete FeedBack method

  public deleteFeedBack(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "users/deletefeedback",
        data
      );
    } catch (error) {}
  }

  // Verify Otp

  public verifyOtp(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "users/verifyOtp",
        data
      );
    } catch (error) {}
  }

  // get District

  public getDistrict(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin/getLocationbyState",
        data
      );
    } catch (error) {}
  }

  // Get village

  public getMandal(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin/getLocationbyDistrict",
        data
      );
    } catch (error) {}
  }

  // get Mandal

  public getVilages(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin/getLocationbyMandal",
        data
      );
    } catch (error) {}
  }

  // get Village

  public getVillagesData(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin/getLocationbyMandal",
        data
      );
    } catch (error) {}
  }

  // get languages

  public getVendorLanguages(): Observable<any> {
    try {
      return this.httpClient.get(environment.BaseUrl + "languages/getLang");
    } catch (error) {}
  }

  //change Password

  public editPasswordAdmin(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin/updateAdmin",
        data
      );
    } catch (error) {}
  }

  // get create Sms List

  public getCreateSmsList(): Observable<any> {
    try {
      return this.httpClient.get(environment.BaseUrl + "users/getsmslist");
    } catch (error) {}
  }

  // image delete on product 1

  public productImageDelete(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin-product/deleteProductImage",
        data
      );
    } catch (error) {}
  }

  // image delete on product 2

  public productImageDelete1(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin-product/deleteProductImages",
        data
      );
    } catch (error) {}
  }

  // image delete on vendor Image

  public vendorImageDelete(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin-product/deleteProductImage",
        data
      );
    } catch (error) {}
  }

  // image delete on Entity Image

  public entityImageDelete(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin-product/deleteProductImages",
        data
      );
    } catch (error) {}
  }

  // get vendor details by using product id

  public getVendorProductDetailsByIds(productId: any): Observable<any> {
    try {
      return this.httpClient.get(
        environment.BaseUrl +
          "admin-product/getProductAndVendorById/${productId}",
        {
          params: {
            productId,
          },
        }
      );
    } catch (error) {}
  }

  // admin product image api

  public adminProductImage(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "admin-product/addAdminProducts",
        data
      );
    } catch (error) {}
  }

  // admin product alias and productname1 productname2 detaisl

  public adminProductListDetails(data: any): Observable<any> {
    try {
      return this.httpClient.post(
        environment.BaseUrl + "languages/addproductnames",
        data
      );
    } catch (error) {
      console.log(error, "error message.........");
    }
  }

  // admin Products get Api

  public getNewAdminProduct(): Observable<any> {
    try {
      return this.httpClient.get(environment.BaseUrl + "users/getsmslist");
    } catch (error) {}
  }

  // admin notification get Api

  public getNotificationDetails(): Observable<any> {
    try {
      return this.httpClient.get(
        environment.BaseUrl + "notifications/getPushNotifications"
      );
    } catch (error) {}
  }

    // admin notification Delete Api

    public deleteNotificationAdmin(data: any): Observable<any> {
      try {
        return this.httpClient.post(
          environment.BaseUrl + "notifications/deletenotification",
          data
        );
      } catch (error) {
        console.log(error, "error message.........");
      }
    }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GeneralProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeneralProvider {

  // public LoginInfo = [];
  public MasterCustomerInfo = [];
  public AllMembers = [];
  public AllCommity = [];
  public UserName = "";
  public isLogin = true;
  public UserInfo = [];

  constructor() {
    console.log('Hello GeneralProvider Provider');
  }

  CollectAllMembers(param){
    
    this.AllMembers = [];
    let arr = param;
    let keys = Object.keys(arr);
    for (var i = 0; i < keys.length; i++) {
      const object2 = Object.assign({ Key: keys[i] }, arr[keys[i]]);
      this.AllMembers.push(object2);
    }
    
    debugger;
  }


  CollectAllCommity(param){
    
    this.AllCommity = [];
    let arr = param;
    let keys = Object.keys(arr);
    for (var i = 0; i < keys.length; i++) {
      const object2 = Object.assign({ Key: keys[i] }, arr[keys[i]]);
      this.AllCommity.push(object2);
    }
    
    debugger;

  }

  public setMasterCustomerInfo(param){
    this.MasterCustomerInfo = param
  }

  // public setLoginInfo(param){
  //   this.LoginInfo = param
  // }

  public setUserName(param){
    this.UserName = param
  }

  public setUserPriviliges(param){
    this.UserInfo = param
  }
}

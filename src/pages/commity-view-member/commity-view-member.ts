import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CommityAddMemberPage } from '../commity-add-member/commity-add-member';
import { GeneralProvider } from '../../providers/general/general';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { CommityHomePage } from '../commity-home/commity-home';
/**
 * Generated class for the CommityViewMemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commity-view-member',
  templateUrl: 'commity-view-member.html',
})
export class CommityViewMemberPage {
  public arr = [];
  public com = [];
  public CommityType = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private database: AngularFireDatabase, private General: GeneralProvider) {

    this.setMember();
    this.setCommity();
  }

  SelectCommity(param) {
    if (param == "All") {
      this.setMember();
    }
    else {
      this.database.object('SKDatabase/' + this.General.UserInfo[0].AdminName + "/Commity/" + param).valueChanges().subscribe(data => {
        if(data != null){
          let SubArr = Object.keys(data);
          let SelMem = Object(data[SubArr[0]]);
          let array = [];
          debugger;
          if (SelMem.length == undefined) {
            for (var loop = 0; loop < SelMem["Members"].length; loop++) {
              let index = this.arr.findIndex(x => x.Key == SelMem["Members"][loop]);
              if (index != -1) {
                array.push(this.arr[index])
              }
            }
            this.arr = array;
          }
          else {
            this.arr = [];
          }
        }
        // this.com = [];

        // for (var loop = 0; loop < SubArr.length; loop++) {
        //   const object2 = Object.assign({ Key: SubArr[loop] }, data[SubArr[loop]]);
        //   this.com.push(object2)
        // }
      })
    }
  }

  setCommity() {
    this.database.object('SKDatabase/' + this.General.UserInfo[0].AdminName + "/Commity").valueChanges().subscribe(data => {
    if(data != null){
      
      let SubArr = Object.keys(data);
      this.com = [];
      for (var loop = 0; loop < SubArr.length; loop++) {
        const object2 = Object.assign({ Key: SubArr[loop] }, data[SubArr[loop]]);
        this.com.push(object2)
      }
    }
    else {
      const confirm = this.alertCtrl.create({
        title: 'Error',
        message: 'Add the Commity First',
        buttons: [
          
          {
            text: 'Ok',
            handler: () => {
              this.navCtrl.push(CommityHomePage)
            }
          }
        ]
      });
      confirm.present();
    }
    })

  }

  setMember() {
    this.CommityType = "All"
    debugger;
    this.database.object('SKDatabase/' + this.General.UserInfo[0].AdminName + "/Member").valueChanges().subscribe(data => {
    if(data != null){
      
      let SubArr = Object.keys(data);
      this.arr = [];
      for (var loop = 0; loop < SubArr.length; loop++) {
        const object2 = Object.assign({ Key: SubArr[loop] }, data[SubArr[loop]]);
        this.arr.push(object2)
      }
    }
    else {
      const confirm = this.alertCtrl.create({
        title: 'Error',
        message: 'Add the Member First',
        buttons: [
          
          {
            text: 'Ok',
            handler: () => {
              this.navCtrl.push(CommityHomePage)
            }
          }
        ]
      });
      confirm.present();
    }

    })

  }

  viewMember(param) {
    var Loger = this.General.UserInfo;
    debugger;
    if(Loger[0].Admin){
    this.navCtrl.push(CommityAddMemberPage, { MemberID: param });
    }
    else{
      alert("Sorry u have no Right to View");
    }
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad CommityViewMemberPage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { GeneralProvider } from '../../providers/general/general';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { HomePage } from '../home/home';
import { CommityHomePage } from '../commity-home/commity-home';
/**
 * Generated class for the CommityRecievePaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commity-recieve-payment',
  templateUrl: 'commity-recieve-payment.html',
})
export class CommityRecievePaymentPage {

  public commity = [];
  public selectedComityName = "";
  public selectedComityAmount = "";
  public selectedComityMember = "";
  public isShow = false;
  public SelectedCommityKey = "";
  public arr = [];
  public SelectMember = "";
  public CurrentMonth = "";
  public Title = "";
  public Message = "";
  public monthNames = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private database: AngularFireDatabase, private General: GeneralProvider) {
    this.setCommity();
    this.setMember();
    this.CurrentMonth = this.monthNames[(new Date()).getMonth()];
    debugger;
  }

  setMember() {
    this.database.object('SKDatabase/' + this.General.UserInfo[0].AdminName + "/Member").valueChanges().subscribe(data => {
      if (data != null) {
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

  setCommity() {
    this.database.object('SKDatabase/' + this.General.UserInfo[0].AdminName + "/Commity").valueChanges().subscribe(data => {
      if (data != null) {
        let SubArr = Object.keys(data);
        this.commity = [];
        for (var loop = 0; loop < SubArr.length; loop++) {
          const object2 = Object.assign({ Key: SubArr[loop] }, data[SubArr[loop]]);
          debugger;
          if (object2.IsActive) {
            this.commity.push(object2)
          }
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

  selectMyCommity(param) {
    if (param != "All") {
      let index = this.commity.findIndex(x => x.Key == param);

      // var testArray = this.commity[index];

      // this.commity = [];
      // this.commity.push(testArray);
      this.SelectedCommityKey = this.commity[index].Key;
      this.selectedComityName = this.commity[index].CommityName;
      this.selectedComityAmount = this.commity[index].NumberOfAmount;
      this.selectedComityMember = this.commity[index].NumberOfMember;
      this.isShow = true;
      this.SelectCommityMember(param);
    }
    else {
      this.SelectCommityMember(param);
      this.isShow = false;
      this.setCommity();
    }

  }

  SelectCommityMember(param) {

    this.setMember();

    if (param == "All") {
      this.setMember();
    }
    else {
      this.database.object('SKDatabase/' + this.General.UserInfo[0].AdminName + "/Commity/" + param).valueChanges().subscribe(data => {
        debugger;
        if (data != null) {

          let SubArr = Object.keys(data);
          let SelMem = Object(data[SubArr[0]]);
          let array = [];
          debugger;
          if (SelMem.length != undefined) {
            for (var loop = 0; loop < SelMem.length; loop++) {
              let index = this.arr.findIndex(x => x.Key == SelMem[loop].MemberID);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommityRecievePaymentPage');
  }

  addPayment() {



    this.database.list("SKDatabase/" + this.General.UserInfo[0].AdminName + "/CommityRecievePayment").push({
      CommityID: this.SelectedCommityKey,
      MemberID: this.SelectMember,
      Amount: this.selectedComityAmount,
      Month: this.CurrentMonth,
      Remarks: this.Title,
      RemarksDetails: this.Message
    });
    this.Title = "";
    this.CurrentMonth = "";
    this.Message = "";
    this.navCtrl.push(CommityHomePage, {})


    // alert("Member Key"+ this.SelectMember);
    // alert("Commity Key"+ this.SelectedCommityKey);
  }

}

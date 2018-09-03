import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { GeneralProvider } from '../../providers/general/general';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { CommityHomePage } from '../commity-home/commity-home';

/**
 * Generated class for the CommitySetNumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commity-set-number',
  templateUrl: 'commity-set-number.html',
})
export class CommitySetNumberPage {

  public commity = [];
  public selectedComityName = "";
  public selectedComityAmount = "";
  public selectedComityMember = "";
  public isShow = false;
  public SelectedCommityKey = "";
  public arr = [];
  public Memberarr = [];
  public SelectMember = "";
  public CurrentMonth = "";
  public Title = "";
  public Message = "";
  public monthNames = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public setNumbers = [];
  public selectCommityInfo = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private database: AngularFireDatabase, private General: GeneralProvider) {
    this.setCommity();
    this.setMember();
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
          if (object2.IsActive) {
            this.commity.push(object2)
          }
        }
      } else {
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
      debugger;
      let index = this.commity.findIndex(x => x.Key == param);
      this.selectCommityInfo = this.commity[index];
      debugger;
      this.SelectCommityMember(param);
    }
    else {
      this.SelectCommityMember(param);
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
        if (data["CommityMembers"] != null) {
          debugger;
          let array = [];
          for (var loop = 0; loop < data["CommityMembers"].length; loop++) {
            let index = this.arr.findIndex(x => x.Key == data["CommityMembers"][loop].MemberID);
            if (index != -1) {
              const object2 = Object.assign({ ID: loop, number: data["CommityMembers"][loop].ComiityNumber }, this.arr[index]);
              array.push(object2);

            }
            this.Memberarr = array;
            debugger;
          }

        }

        else {
          const confirm = this.alertCtrl.create({
            title: 'Error',
            message: 'Add the Member to the Commity First',
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

        // this.com = [];

        // for (var loop = 0; loop < SubArr.length; loop++) {
        //   const object2 = Object.assign({ Key: SubArr[loop] }, data[SubArr[loop]]);
        //   this.com.push(object2)
        // }
      })
    }
  }

  AddNumber() {
    for (var loop = 0; loop < this.Memberarr.length; loop++) {
      var test = (<HTMLInputElement>document.getElementById("txtNum" + loop)).value;
      debugger;
      var param = {
        ComiityNumber: test,
        MemberID: this.Memberarr[loop].Key
      }
      this.setNumbers.push(param);
      debugger;

    }

    const confirm = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Add Number to Members ?',
      buttons: [

        {
          text: 'Ok',
          handler: () => {
            this.AddNumbertoMember();
          }
        }
      ]
    });
    confirm.present();



  }

  AddNumbertoMember() {


    var param = {
      CommityName: this.selectCommityInfo["CommityName"],
      CommityType: this.selectCommityInfo["CommityType"],
      EndDate: this.selectCommityInfo["EndDate"],
      IsActive: this.selectCommityInfo["IsActive"],
      NumberOfAmount: this.selectCommityInfo["NumberOfAmount"],
      NumberOfMember: this.selectCommityInfo["NumberOfMember"],
      NumberOfMonths: this.selectCommityInfo["NumberOfMonths"],
      StartDate: this.selectCommityInfo["StartDate"],
      UserName: this.selectCommityInfo["UserName"],
      CommityMembers: this.setNumbers
    }
    debugger;
    this.database.list("SKDatabase/" + this.General.UserInfo[0].AdminName + "/Commity/").
      update(this.selectCommityInfo["Key"], param)

    this.navCtrl.push(CommityHomePage, {})


  }



}

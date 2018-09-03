import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { GeneralProvider } from '../../providers/general/general';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { CommityHomePage } from '../commity-home/commity-home';

/**
 * Generated class for the CommitySetMemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commity-set-member',
  templateUrl: 'commity-set-member.html',
})
export class CommitySetMemberPage {
  public commity = [];
  public member = [];
  public CommityType = "";
  public SelectMember = ""
  public selectedComityName = "";
  public selectedComityAmount = "";
  public selectedComityMember = 0;
  public isShow = false;
  public SelectedCommityKey = "";
  public selectCommityInfo = [];
  public FinalMembers = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private database: AngularFireDatabase, private General: GeneralProvider) {
    this.setCommity();
    this.setMember();
    this.showAlert();
  }


  showAlert() {
    const confirm = this.alertCtrl.create({
      title: 'Alert',
      message: 'Set All Member Names First Time The Members will not Change according to the Aggrement',
      buttons: [
        {
          text: "OK",
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Cencle',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  test1(param) {
    this.isShow = true;

    if (param != "All") {

    }
    else {
      debugger;
      this.setCommity();
    }

  }


  selectMyCommity(param) {
    if (param != "All") {
      let index = this.commity.findIndex(x => x.Key == param);
      this.selectCommityInfo = this.commity[index];
      debugger;
      // var testArray = this.commity[index];

      // this.commity = [];
      // this.commity.push(testArray);
      this.SelectedCommityKey = this.commity[index].Key;
      this.selectedComityName = this.commity[index].CommityName;
      this.selectedComityAmount = this.commity[index].NumberOfAmount;
      this.selectedComityMember = this.commity[index].NumberOfMember;
      this.isShow = true;

    }
    else {
      this.isShow = false;
      this.setCommity();
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommitySetMemberPage');
  }


  setMember() {
    this.database.object('SKDatabase/' + this.General.UserInfo[0].AdminName + "/Member").valueChanges().subscribe(data => {
      debugger;
      if (data != null) {
      let SubArr = Object.keys(data);
      this.member = [];
      for (var loop = 0; loop < SubArr.length; loop++) {
        if(data[SubArr[loop]].IsActive){
          const object2 = Object.assign({ Key: SubArr[loop] }, data[SubArr[loop]]);
          this.member.push(object2)  
        }
      }
    }    else {
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
      debugger;

      for (var loop = 0; loop < SubArr.length; loop++) {
        if (data[SubArr[loop]].CommityMembers == null) {
          const object2 = Object.assign({ Key: SubArr[loop] }, data[SubArr[loop]]);
          if (object2.IsActive) {
            this.commity.push(object2)
          }
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

  AddMember() {
    if (this.isShow) {
      var memberLength = this.SelectMember.length;
      if (this.selectedComityMember == memberLength) {

        for (var loop = 0; loop < this.SelectMember.length; loop++) {
          var MemberObject = {
            MemberID: this.SelectMember[loop],
            ComiityNumber: 0
          }
          this.FinalMembers.push(MemberObject)
        }

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
          CommityMembers: this.FinalMembers,
          // MemberNumbers : this.selectCommityInfo['MemberNumbers']
        }

        debugger;

        this.database.list("SKDatabase/" + this.General.UserInfo[0].AdminName + "/Commity/").
          update(this.selectCommityInfo["Key"], param)
        this.navCtrl.push(CommityHomePage, {})
      }
      else {
        alert("Number of Members are not Equal to the Number of Commity Memebers");
      }
    }
    else {
      alert("First Select the Commity first");
    }
  }

}

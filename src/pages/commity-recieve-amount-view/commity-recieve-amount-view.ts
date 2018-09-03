import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { GeneralProvider } from '../../providers/general/general';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { CommityHomePage } from '../commity-home/commity-home';

/**
 * Generated class for the CommityRecieveAmountViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commity-recieve-amount-view',
  templateUrl: 'commity-recieve-amount-view.html',
})
export class CommityRecieveAmountViewPage {

  commity = [];
  Amount = [];
  Member = [];
  ShownReieve = [];
  CommityType = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, private database: AngularFireDatabase, private General: GeneralProvider) {
    this.getCommity();
    this.getMember();
    this.getRecieveAmount();
    
    // this.Amount.push();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommityRecieveAmountViewPage');
  }

  getCommity() {
    this.database.object('SKDatabase/' + this.General.UserInfo[0].AdminName + "/Commity").valueChanges().subscribe(data => {
      if(data != null){
      let SubArr = Object.keys(data);
      this.commity = [];
      for (var loop = 0; loop < SubArr.length; loop++) {
        const object2 = Object.assign({ Key: SubArr[loop] }, data[SubArr[loop]]);
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

  getMember() {
    this.database.object('SKDatabase/' + this.General.UserInfo[0].AdminName + "/Member").valueChanges().subscribe(data => {
      if(data != null){
      let SubArr = Object.keys(data);
      this.Member = [];
      for (var loop = 0; loop < SubArr.length; loop++) {
        const object2 = Object.assign({ Key: SubArr[loop] }, data[SubArr[loop]]);
        this.Member.push(object2)
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

  getRecieveAmount() {
    this.database.object('SKDatabase/' + this.General.UserInfo[0].AdminName + "/CommityRecievePayment").valueChanges().subscribe(data => {
      debugger;
      if(data != null){
      let SubArr = Object.keys(data);
      this.Amount = [];
      for (var loop = 0; loop < SubArr.length; loop++) {
        const object2 = Object.assign({ Key: SubArr[loop] }, data[SubArr[loop]]);
        this.Amount.push(object2)
      }
    }
    else {
      const confirm = this.alertCtrl.create({
        title: 'Error',
        message: 'No Payment Collected',
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

  
  SelectCommity(param) {
    this.ShownReieve = [];
    debugger;
    for (let loop = 0; loop < this.Amount.length; loop++) {
      if (this.Amount[loop].CommityID == param) {
        for (let Innerloop = 0; Innerloop < this.commity.length; Innerloop++) {
          debugger;
          if (this.Amount[loop].CommityID == this.commity[Innerloop].Key) {

            for (let SubInnerLoop = 0; SubInnerLoop < this.Member.length; SubInnerLoop++) {
              debugger;
              if (this.Amount[loop].MemberID == this.Member[SubInnerLoop].Key) {
                const object2 = Object.assign({
                  CommityKey: this.commity[Innerloop].Key,
                  CommityName: this.commity[Innerloop].CommityName,
                  StartingMonth: this.commity[Innerloop].StartDate,
                  EndingMonth: this.commity[Innerloop].EndDate,
                },
                  {
                    Amount: this.Amount[loop].Amount,
                    Month: this.Amount[loop].Month,
                  },
                  {
                    MemberName: this.Member[SubInnerLoop].MemberName,
                    MemberCell: this.Member[SubInnerLoop].MemberCell,
                    MemberAdress: this.Member[SubInnerLoop].MemberAdress,
                  }
                );
                this.ShownReieve.push(object2);
              }
            }
          }
        }
      }
    }

    debugger;
    
  }

}

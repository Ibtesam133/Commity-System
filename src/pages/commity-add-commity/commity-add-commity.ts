import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { GeneralProvider } from '../../providers/general/general';
import { CommityHomePage } from '../commity-home/commity-home';
/**
 * Generated class for the CommityAddCommityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commity-add-commity',
  templateUrl: 'commity-add-commity.html',
})
export class CommityAddCommityPage {

  public cStartDate = '2015-01-01';
  public cEndDate = '2015-01-01';
  public cCommityType: any;
  public cAmount = "";
  public cMember = "";
  public cMonth = "";
  public cOwner = "";
  public cName = "";
  public cCheck = false;
  public CommityKey;

  public event = {
    month: '2015-01-01',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, private General: GeneralProvider) {
    debugger;
    this.CommityKey = this.navParams.get('key');
    if (this.CommityKey != 0) {
      this.ViewCommity();
    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommityAddCommityPage');
  }

  addCommity() {
    let UserName = this.General.UserInfo[0].AdminName;
    debugger;

    if (this.CommityKey != 0) {
      debugger;
      this.database.list("SKDatabase/" + UserName + "/Commity").update(this.CommityKey, {
        // OwnerName: this.cOwner,
        UserName: UserName,
        CommityName: this.cName,
        StartDate: this.cStartDate,
        EndDate: this.cEndDate,
        CommityType: this.cCommityType,
        NumberOfMonths: this.cMonth,
        NumberOfMember: this.cMember,
        NumberOfAmount: this.cAmount,
        IsActive: this.cCheck,
        Owner : this.cOwner
      })
    } else {

      this.database.list("SKDatabase/" + UserName + "/Commity").push({
        // OwnerName: this.cOwner,
        UserName: UserName,
        CommityName: this.cName,
        StartDate: this.cStartDate,
        EndDate: this.cEndDate,
        CommityType: this.cCommityType,
        NumberOfMonths: this.cMonth,
        NumberOfMember: this.cMember,
        NumberOfAmount: this.cAmount,
        IsActive: this.cCheck,
        Owner : this.cOwner
      });
    }

    this.cStartDate = '2015-01-01';
    this.cEndDate = '2015-01-01';
    this.cAmount = "";
    this.cMember = "";
    this.cMonth = "";
    this.cOwner = "";
    this.cName = "";

    this.navCtrl.push(CommityHomePage, {})

  }

  ViewCommity() {
    this.database.object('SKDatabase/' + this.General.UserInfo[0].AdminName + '/Commity/' + this.CommityKey).valueChanges().subscribe(data => {
      let SubArr = Object.keys(data);
      debugger;
      this.cStartDate = data[SubArr[8]];
      this.cEndDate = data[SubArr[3]];
      this.cCommityType = data[SubArr[1]];
      this.cAmount = data[SubArr[4]];
      this.cMember = data[SubArr[5]];
      this.cMonth = data[SubArr[6]];
      this.cOwner = data[SubArr[7]];
      this.cName = data[SubArr[0]];
      this.cCheck = data[SubArr[3]];
      debugger;

    })
  }

}

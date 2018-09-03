import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseHelperProvider } from '../../providers/firebase-helper/firebase-helper';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { GeneralProvider } from '../../providers/general/general';
import { CommityHomePage } from '../commity-home/commity-home';

/**
 * Generated class for the CommityAddMemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commity-add-member',
  templateUrl: 'commity-add-member.html',
})
export class CommityAddMemberPage {

  check: any = false;
  Name = "";
  Cell = "";
  Adress = "";
  ref = "";
  MemberKey;



  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, private General: GeneralProvider) {
    // alert("Member : "+this.navParams.get('MemberID'));
    this.MemberKey = this.navParams.get('MemberID');
    if (this.MemberKey != 0) {
      this.ViewMember();
    }
  }

  ionViewDidLoad() {
  }

  addMember() {
    let UserName = this.General.UserInfo[0].AdminName;
    debugger;
    if (this.MemberKey == 0) {
      debugger;
      this.database.list("SKDatabase/" + UserName + "/Member").push({
        UserName: UserName,
        MemberName: this.Name,
        MemberCell: this.Cell,
        MemberAdress: this.Adress,
        MemberRef: this.ref,
        IsActive: this.check,
      });
    } else {
      debugger;
      this.database.list("SKDatabase/" + UserName + "/Member").update(this.MemberKey, {
        UserName: UserName,
        MemberName: this.Name,
        MemberCell: this.Cell,
        MemberAdress: this.Adress,
        MemberRef: this.ref,
        IsActive: this.check,
      })
    }
    this.reset();
    this.navCtrl.push(CommityHomePage, {})

  }
  reset() {
    this.Name = "";
    this.Cell = "";
    this.Adress = "";
    this.ref = "";
  }

  ViewMember() {
    this.database.object('SKDatabase/' + this.General.UserInfo[0].AdminName + '/Member/' + this.MemberKey).valueChanges().subscribe(data => {
      let SubArr = Object.keys(data);
      this.Name = data[SubArr[3]];
      this.Cell = data[SubArr[2]];
      this.ref = data[SubArr[4]];
      this.Adress = data[SubArr[1]];
      this.check = data[SubArr[0]];
      debugger;

    })
  }



}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { LoginPage } from '../login/login';
import { CommityLoginPage } from '../commity-login/commity-login';
import { GeneralProvider } from '../../providers/general/general';

/**
 * Generated class for the CommitySignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commity-signup',
  templateUrl: 'commity-signup.html',
})
export class CommitySignupPage {

  public Name = "";
  public Pass = "";
  public Number = "";
  public City = "";
  public Country = "";
  public Postal = "";
  public ActivitationKey = "";
  public SignUpType = "";
  public Code = "";
  public ShowCode = false
  public User = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, private General: GeneralProvider) {
    this.randomString(9);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommitySignupPage');
  }

  randomString(length) {
    this.ActivitationKey = Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
  }

  SelectType(param) {
    if (this.SignUpType == "member") {
      this.ShowCode = true;
    }
    else {
      this.ShowCode = false;
    }
  }

  AddSignUp() {
    if (this.Name != "" && this.Pass != "" && this.Number != "" && this.City != "" && this.Country != "" && this.Postal != "") {
      if (this.ShowCode) {
        this.CheckActivationCode();

        setTimeout(() => {
          this.database.list("SKDatabase/" + this.User + "/SignUp").push({
            Admin: 0,
            Name: this.Name,
            Pass: this.Pass,
            Number: this.Number,
            City: this.City,
            Country: this.Country,
            PostalCode: this.Postal,
            AdminName : this.User
          });
          this.navCtrl.push(CommityLoginPage, {})
        }, 1500);

      }
      else {
        this.database.list("SKDatabase/" + this.Name + " & " + this.Pass + "/SignUp").push({
          Admin: 1,
          Name: this.Name,
          Pass: this.Pass,
          Number: this.Number,
          City: this.City,
          Country: this.Country,
          PostalCode: this.Postal,
          AdminName : this.Name + " & " + this.Pass
        });
        this.AddActivation();
      }
    }
    else {
      alert("Fill All Fields First");
    }
  }


  CheckActivationCode() {

    this.database.object('/SKDatabase/').valueChanges().subscribe(Bigdata => {
      let FirstArr = Object.keys(Bigdata);
      for (var i = 0; i < FirstArr.length; i++) {
        let SubArr = Object.keys(Bigdata[FirstArr[i]]["ActivationKey"]);
        let ActivationKey =  Bigdata[FirstArr[i]]["ActivationKey"][SubArr[0]].ActivationKey
        if (this.Code == ActivationKey) {
          let CommityHead = FirstArr[i];
          this.User = CommityHead;
        }
        // this.database.object('SKDatabase/' + FirstArr[i] + "/ActivationKey").valueChanges().subscribe(data => {
        //   let SubArr = Object.keys(data);
        //   if (this.Code == data[SubArr[0]].ActivationKey) {
        //     this.User = FirstArr[--i];
        //   }
        // })
      }
    })
  }

  AddActivation() {

    this.database.list("SKDatabase/" + this.Name + " & " + this.Pass + "/ActivationKey").push({
      ActivationKey: this.ActivitationKey
    });

    this.Name = "";
    this.Pass = "";
    this.Number = "";
    this.City = "";
    this.Country = "";
    this.Postal = "";

    this.navCtrl.push(CommityLoginPage, {})


  }

}
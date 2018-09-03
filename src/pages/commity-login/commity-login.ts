import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommitySignupPage } from '../commity-signup/commity-signup';
import { CommityHomePage } from '../commity-home/commity-home';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { GeneralProvider } from '../../providers/general/general';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the CommityLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commity-login',
  templateUrl: 'commity-login.html',
})
export class CommityLoginPage {

  public Name = "";
  public Pass = "";
  public internetPermission;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, private General: GeneralProvider, private network: Network) {
    // alert(this.randomString(9));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommityLoginPage');

  }
  
  InternetpermissionCheck() {

    debugger;

    this.network.onConnect().subscribe(data => {
      debugger;
    },
      error => {
        debugger;
      });


    this.network.onDisconnect().subscribe(data => {
      debugger;
    },
      error => {
        debugger;
      });
  }

  SignUp() {
    this.navCtrl.push(CommitySignupPage, {})
  }

  LogIn() {
    if (this.Name != "" && this.Pass != "") {

      this.database.object('/SKDatabase/').valueChanges().subscribe(Bigdata => {
        let FirstArr = Object.keys(Bigdata);
        for (var i = 0; i < FirstArr.length; i++) {
          this.database.object('SKDatabase/' + FirstArr[i] + "/SignUp").valueChanges().subscribe(data => {
            let SubArr = Object.keys(data);
        for (var ii = 0; ii < SubArr.length; ii++) {
          if (data[SubArr[ii]].Name == this.Name && data[SubArr[ii]].Pass == this.Pass) {

            // this.General.setUserName(this.Name + " & " + this.Pass);
            // this.General.setUserName(FirstArr[--i]);
            const object2 = Object.assign({ Key: SubArr[ii] }, data[SubArr[ii]]);
            let Info = [];
            
            // let a = this.General.UserName;
            Info.push(object2);
            this.General.setUserName = Info[0].AdminName;
            this.General.setUserPriviliges(Info);
            // this.General.CollectAllMembers(Bigdata[this.General.UserName].Member);        
            // this.General.CollectAllCommity(Bigdata[this.General.UserName].Commity);        
            if (this.General.isLogin) {
              this.General.isLogin = false;
              this.navCtrl.push(CommityHomePage, {})
            }


          }
        }            
           


          })
          //   let chk = FirstArr.length-1;
          //   if (i == chk) {
          //     alert("Invalid user");
          // }
        }



      })

    }

  }

}

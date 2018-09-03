import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { GeneralProvider } from '../../providers/general/general';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { CommityAddCommityPage } from '../commity-add-commity/commity-add-commity';
import { CommityHomePage } from '../commity-home/commity-home';

/**
 * Generated class for the CommityViewCommityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commity-view-commity',
  templateUrl: 'commity-view-commity.html',
})
export class CommityViewCommityPage {

  public arr = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private database: AngularFireDatabase, private General: GeneralProvider) {
    this.setCommity();
  }

  showConfirm(param) {
    const confirm = this.alertCtrl.create({
      title: 'Use this lightsaber?',
      message: 'Press View to View Commity<br>Press Check for Recieve Amount Commity',
      buttons: [
        {
          text: "Check",
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'View',
          handler: () => {
            console.log('Agree clicked');
             var Loger = this.General.UserInfo;
             debugger;
             if(Loger[0].Admin){
              this.navCtrl.push(CommityAddCommityPage, { key: param })
             }
             else{
               alert("Sorry u have no Right to View");
             }
          }
        }
      ]
    });
    confirm.present();
  }

  test(param) {
    if (param != "All") {
      let index = this.arr.findIndex(x => x.Key == param);
      alert(index);
      var testArray = this.arr[index];
      debugger;
      this.arr = [];
      this.arr.push(testArray);
    }
    else {
      debugger;
      this.setCommity();
    }

  }

  setCommity() {
    this.database.object('SKDatabase/' + this.General.UserInfo[0].AdminName + "/Commity").valueChanges().subscribe(data => {
    debugger;
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommityViewCommityPage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { GeneralProvider } from '../../providers/general/general';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { CommityHomePage } from '../commity-home/commity-home';
/**
 * Generated class for the CommityFeedbackViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commity-feedback-view',
  templateUrl: 'commity-feedback-view.html',
})
export class CommityFeedbackViewPage {

  public arr = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, private General: GeneralProvider, public alertCtrl: AlertController) {
    this.setFeedBack();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommityFeedbackViewPage');
  }

  setFeedBack() {
    debugger;
    this.database.object('SKDatabase/' + this.General.UserInfo[0].AdminName + "/FeedBack").valueChanges().subscribe(data => {
      if (data != null) {
      let SubArr = Object.keys(data);
      debugger;
      this.arr = [];
      for (var loop = 0; loop < SubArr.length; loop++) {
        const object2 = Object.assign({ Key: SubArr[loop] }, data[SubArr[loop]]);
        this.arr.push(object2)
     
      }
    }
    else {
      const confirm = this.alertCtrl.create({
        title: 'Error',
        message: 'No FeedBack',
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

}

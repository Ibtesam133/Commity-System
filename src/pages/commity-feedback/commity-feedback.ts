import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GeneralProvider } from '../../providers/general/general';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { CommityHomePage } from '../commity-home/commity-home';

/**
 * Generated class for the CommityFeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commity-feedback',
  templateUrl: 'commity-feedback.html',
})
export class CommityFeedbackPage {

  public Title = "";
  public Message = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, private General: GeneralProvider) {
    let sk = this.General.UserInfo[0].AdminName;
    debugger;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommityFeedbackPage');
  }

  sendFeedback(){
    this.database.list("SKDatabase/" + this.General.UserInfo[0].AdminName + "/FeedBack").push({
      Title: this.Title,
      Message: this.Message,
      SenderName : this.General.UserInfo[0].Name
    });
    this.navCtrl.push(CommityHomePage, {})
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CommityAddMemberPage } from '../commity-add-member/commity-add-member';
import { CommityAddCommityPage } from '../commity-add-commity/commity-add-commity';
import { CommitySetMemberPage } from '../commity-set-member/commity-set-member';
import { CommityViewMemberPage } from '../commity-view-member/commity-view-member';
import { CommityRecievePaymentPage } from '../commity-recieve-payment/commity-recieve-payment';
import { CommityViewCommityPage } from '../commity-view-commity/commity-view-commity';
import { CommityRecieveAmountViewPage } from '../commity-recieve-amount-view/commity-recieve-amount-view';
import { GeneralProvider } from '../../providers/general/general';
import { AngularFireDatabase } from 'angularfire2/database';
import { CommityFeedbackPage } from '../commity-feedback/commity-feedback';
import { CommityFeedbackViewPage } from '../commity-feedback-view/commity-feedback-view';
import { CommitySetNumberPage } from '../commity-set-number/commity-set-number';
/**
 * Generated class for the CommityHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commity-home',
  templateUrl: 'commity-home.html',
})
export class CommityHomePage {

  public ActivationKey ="";
  public Priviliges = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, private General: GeneralProvider,public alertCtrl: AlertController) {
    
    if(this.General.UserInfo[0].Admin == 1){
      this.Priviliges = true;
    }
    else{
      this.Priviliges = false;      
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommityHomePage');
  }

  ShowActivation() {
    const confirm = this.alertCtrl.create({
      title: 'Use this lightsaber?',
      message: 'Activation Key of Member<br><b>'+this.ActivationKey+'</b>',
      buttons: [
        {
          text: "OK",
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Cancle',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  viewActivation(){
    debugger;
    this.database.object('SKDatabase/' + this.General.UserInfo[0].AdminName + "/ActivationKey").valueChanges().subscribe(data => {
      let SubArr = Object.keys(data);
      this.ActivationKey = data[SubArr[0]].ActivationKey;
      this.ShowActivation();     
    })
  }

  addMember(){
    this.navCtrl.push(CommityAddMemberPage,{ MemberID : 0 });
  }

  addCommity(){
    // this.navCtrl.push(CommityAddCommityPage,{});
    this.navCtrl.push(CommityAddCommityPage, {key : 0})    
  }

  setMember(){
    this.navCtrl.push(CommitySetMemberPage,{});
  }
  
  viewMember(){
    this.navCtrl.push(CommityViewMemberPage,{});
  }

  AmountView(){
    this.navCtrl.push(CommityRecieveAmountViewPage,{});
  }

  recievePayment(){
    this.navCtrl.push(CommityRecievePaymentPage,{});
  }

  viewCommity(){
    this.navCtrl.push(CommityViewCommityPage,{});
  }

  feeback(){
    this.navCtrl.push(CommityFeedbackPage,{});    
  }

  feebackView(){
    this.navCtrl.push(CommityFeedbackViewPage,{});    
  }

  addsetNumber(){
    this.navCtrl.push(CommitySetNumberPage,{});    
  }
  
}

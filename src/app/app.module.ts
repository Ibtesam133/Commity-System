import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CommityLoginPage } from '../pages/commity-login/commity-login';
import { CommitySignupPage } from '../pages/commity-signup/commity-signup';
import { CommityAddMemberPage } from '../pages/commity-add-member/commity-add-member';
import { CommityAddCommityPage } from '../pages/commity-add-commity/commity-add-commity';
import { CommitySetMemberPage } from '../pages/commity-set-member/commity-set-member';
import { CommityViewMemberPage } from '../pages/commity-view-member/commity-view-member';
import { CommityRecievePaymentPage } from '../pages/commity-recieve-payment/commity-recieve-payment';
import { CommityViewCommityPage } from '../pages/commity-view-commity/commity-view-commity';
import { CommityFeedbackViewPage } from '../pages/commity-feedback-view/commity-feedback-view';
import { CommityRecieveAmountViewPage } from '../pages/commity-recieve-amount-view/commity-recieve-amount-view';
import { CommityHomePage } from '../pages/commity-home/commity-home';
import { CommityFeedbackPage } from '../pages/commity-feedback/commity-feedback';
import { CommitySetNumberPage } from '../pages/commity-set-number/commity-set-number';
import {AngularFireModule} from 'angularfire2'
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseHelperProvider } from '../providers/firebase-helper/firebase-helper';
import { GeneralProvider } from '../providers/general/general';
import {Network} from '@ionic-native/network';

// import {  FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';


  

const firebase = {
  apiKey: "AIzaSyAPSCej4lfVCFDF7ov6xaepQur3xjjb_vs",
  authDomain: "fir-eda9b.firebaseapp.com",
  databaseURL: "https://fir-eda9b.firebaseio.com",
  projectId: "fir-eda9b",
  storageBucket: "fir-eda9b.appspot.com",
  messagingSenderId: "878556270466"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CommityLoginPage,
    CommitySignupPage,
    CommityHomePage,
    CommityAddMemberPage,
    CommityAddCommityPage,
    CommitySetMemberPage,
    CommityViewMemberPage,
    CommityRecievePaymentPage,
    CommityViewCommityPage,
    CommityRecieveAmountViewPage,
    CommityFeedbackPage,
    CommityFeedbackViewPage,
    CommitySetNumberPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CommityLoginPage,
    CommitySignupPage,
    CommityHomePage,
    CommityAddMemberPage,
    CommityAddCommityPage,
    CommitySetMemberPage,
    CommityViewMemberPage,
    CommityRecievePaymentPage,
    CommityViewCommityPage,
    CommityRecieveAmountViewPage,
    CommityFeedbackPage,
    CommityFeedbackViewPage,
    CommitySetNumberPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseHelperProvider,
    GeneralProvider,
    Network
  ]
})
export class AppModule {}

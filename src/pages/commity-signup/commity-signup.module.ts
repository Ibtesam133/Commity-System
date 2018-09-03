import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommitySignupPage } from './commity-signup';

@NgModule({
  declarations: [
    CommitySignupPage,
  ],
  imports: [
    IonicPageModule.forChild(CommitySignupPage),
  ],
})
export class CommitySignupPageModule {}

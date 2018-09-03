import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommityFeedbackPage } from './commity-feedback';

@NgModule({
  declarations: [
    CommityFeedbackPage,
  ],
  imports: [
    IonicPageModule.forChild(CommityFeedbackPage),
  ],
})
export class CommityFeedbackPageModule {}

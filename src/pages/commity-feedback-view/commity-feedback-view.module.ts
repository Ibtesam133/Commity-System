import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommityFeedbackViewPage } from './commity-feedback-view';

@NgModule({
  declarations: [
    CommityFeedbackViewPage,
  ],
  imports: [
    IonicPageModule.forChild(CommityFeedbackViewPage),
  ],
})
export class CommityFeedbackViewPageModule {}

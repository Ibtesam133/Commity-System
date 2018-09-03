import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommityViewMemberPage } from './commity-view-member';

@NgModule({
  declarations: [
    CommityViewMemberPage,
  ],
  imports: [
    IonicPageModule.forChild(CommityViewMemberPage),
  ],
})
export class CommityViewMemberPageModule {}

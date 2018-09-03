import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommityAddMemberPage } from './commity-add-member';

@NgModule({
  declarations: [
    CommityAddMemberPage,
  ],
  imports: [
    IonicPageModule.forChild(CommityAddMemberPage),
  ],
})
export class CommityAddMemberPageModule {}

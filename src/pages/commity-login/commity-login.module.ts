import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommityLoginPage } from './commity-login';

@NgModule({
  declarations: [
    CommityLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(CommityLoginPage),
  ],
})
export class CommityLoginPageModule {}

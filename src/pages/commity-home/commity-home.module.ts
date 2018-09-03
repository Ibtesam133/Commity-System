import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommityHomePage } from './commity-home';

@NgModule({
  declarations: [
    CommityHomePage,
  ],
  imports: [
    IonicPageModule.forChild(CommityHomePage),
  ],
})
export class CommityHomePageModule {}

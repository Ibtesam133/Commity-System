import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/observable';
import firebase from 'firebase';
import { Injectable } from '@angular/core';

/*
  Generated class for the FirebaseHelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseHelperProvider {

  FireBAseCurrentSelectData = [];
  BackUpData = {};


  constructor(private fire: AngularFireAuth, private database: AngularFireDatabase) {
  }

  AddFirebase(param,table){
    alert("Push");
    this.database.list(table).push(param);
  }

  selectFireBase(table){

    this.database.object('/User/').valueChanges().subscribe(data => {
      debugger;
      let arr = Object.keys(data);
      this.BackUpData = data;

      for (var i = 0; i < arr.length; i++) {
        const object2 = Object.assign({ Key: arr[i] }, data[arr[i]]);
        this.FireBAseCurrentSelectData.push(object2);
      }
      debugger;

    })
    return this.FireBAseCurrentSelectData;
  }



}

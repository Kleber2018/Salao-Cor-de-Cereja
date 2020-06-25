import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Convenio } from '../../models/convenio.interface'

@Injectable({
  providedIn: 'root'
})
export class ConvenioService {
  private conveniosCollection: AngularFirestoreCollection<Convenio>;

  constructor(db : AngularFirestore) {
    this.conveniosCollection = db.collection<Convenio>('convenio');
   }

  getConvenios(){
    return this.conveniosCollection.snapshotChanges();
  } 

  getConvenio(id:string){
    return this.conveniosCollection.doc<Convenio>(id).valueChanges();
  }

  updtConvenios(convenio:Convenio, id: string){
    return this.conveniosCollection.doc(id).update(convenio);
  }

  addConvenios(convenio:Convenio){
    return this.conveniosCollection.add(convenio);
  }

  delConvenio(id: string){
    return this.conveniosCollection.doc(id).delete();
  }
}

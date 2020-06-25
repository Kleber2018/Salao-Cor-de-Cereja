import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Profissional } from '../../models/profissional.interface';



@Injectable({
  providedIn: 'root'
})
export class ProfissionalService {

  private profissionaisCollection: AngularFirestoreCollection<Profissional>;
  private profissionaisWhereCollection: AngularFirestoreCollection<Profissional>;
  

  constructor(protected db: AngularFirestore,
              protected where: AngularFirestore) {
    this.profissionaisCollection = db.collection<Profissional>('profissional');
  }
  
  getProfissionais() {
    return this.profissionaisCollection.snapshotChanges();
  }

  getProfissionaisWhere(campo, operador, valor: string) :any {
    this.profissionaisWhereCollection = this.where.collection('profissional',ref => ref.where(campo, operador, valor));
    return this.profissionaisWhereCollection.snapshotChanges();
  }

  getProfissional(id: string) {
    return this.profissionaisCollection.doc<Profissional>(id).valueChanges();

  }
  

  updtProfissional(profissional: Profissional, id: string) {
    return this.profissionaisCollection.doc(id).update(profissional);
  }

  addProfissional(profissional: Profissional) {
    return this.profissionaisCollection.add(profissional);
  }

  

  delProfissional(id: string) {
    return this.profissionaisCollection.doc(id).delete();
  }

}
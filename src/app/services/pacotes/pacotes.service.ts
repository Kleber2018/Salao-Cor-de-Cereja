import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Pacote } from 'src/app/models/pacote.interface';

@Injectable({
  providedIn: 'root'
})
export class PacotesService {
  private pacotesCollection: AngularFirestoreCollection<Pacote>;
  private pacotesWhereCollection: AngularFirestoreCollection<Pacote>;

  constructor(protected db: AngularFirestore,
              protected where: AngularFirestore) {
    this.pacotesCollection = db.collection<Pacote>('pacote');
  }

  getPacotes() {
    return this.pacotesCollection.snapshotChanges();
  }

  getPacotesWhere(campo, operador, valor: string) :any {
    this.pacotesWhereCollection = this.where.collection('pacote',ref => ref.where(campo, operador, valor));
    return this.pacotesWhereCollection.snapshotChanges();
  }

  getPacote(id: string) {
    return this.pacotesCollection.doc<Pacote>(id).valueChanges();
  }

  updtPacote(pacote: Pacote, id: string) {
    return this.pacotesCollection.doc(id).update(pacote);
  }

  addPacote(pacote: Pacote) {
    return this.pacotesCollection.add(pacote);
  }

  delPacote(id: string) {
    return this.pacotesCollection.doc(id).delete();
  }
}

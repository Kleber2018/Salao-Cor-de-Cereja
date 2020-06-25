import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Pagamento } from 'src/app/models/pagamento.interface';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  private pagamentosCollection: AngularFirestoreCollection<Pagamento>;
  private pagamentosWhereCollection: AngularFirestoreCollection<Pagamento>;

  constructor(protected db: AngularFirestore,
              protected where: AngularFirestore) {
    this.pagamentosCollection = db.collection<Pagamento>('pagamento');
  }

  getPagamentos() {
    return this.pagamentosCollection.snapshotChanges();
  }

  getPagamentosWhere(campo, operador, valor: string) :any {
    this.pagamentosWhereCollection = this.where.collection('pagamento',ref => ref.where(campo, operador, valor));
    return this.pagamentosWhereCollection.snapshotChanges();
  }

  getPagamento(id: string) {
    return this.pagamentosCollection.doc<Pagamento>(id).valueChanges();
  }

  updtPagamento(pagamento: Pagamento, id: string) {
    return this.pagamentosCollection.doc(id).update(pagamento);
  }

  addPagamento(pagamento: Pagamento) {
    return this.pagamentosCollection.add(pagamento);
  }

  delPagamento(id: string) {
    return this.pagamentosCollection.doc(id).delete();
  }
}

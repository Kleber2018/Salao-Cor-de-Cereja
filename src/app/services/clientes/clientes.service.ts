import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Cliente } from '../../models/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private clientesCollection: AngularFirestoreCollection<Cliente>;
  private clientesWhereCollection: AngularFirestoreCollection<Cliente>;

  constructor(protected db: AngularFirestore,
              protected where: AngularFirestore) {
    this.clientesCollection = db.collection<Cliente>('cliente');
  }

  getClientes() {
    return this.clientesCollection.snapshotChanges();
  }

  getClientesWhere(campo, operador, valor: string) :any {
    this.clientesWhereCollection = this.where.collection('cliente',ref => ref.where(campo, operador, valor));
    return this.clientesWhereCollection.snapshotChanges();
  }

  getCliente(id: string) {
    return this.clientesCollection.doc<Cliente>(id).valueChanges();
  }

  updtCliente(cliente: Cliente, id: string) {
    return this.clientesCollection.doc(id).update(cliente);
  }

  addCliente(cliente: Cliente) {
    return this.clientesCollection.add(cliente);
  }

  delCliente(id: string) {
    return this.clientesCollection.doc(id).delete();
  }

}
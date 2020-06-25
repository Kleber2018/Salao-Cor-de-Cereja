import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Servico } from 'src/app/models/servicos.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {
  private servicosCollection: AngularFirestoreCollection<Servico>;
  private servicosWhereCollection: AngularFirestoreCollection<Servico>;

  constructor(protected db : AngularFirestore,
              protected where: AngularFirestore) {
    this.servicosCollection = db.collection<Servico>('servico');
   }

  getServicos(){
    return this.servicosCollection.snapshotChanges();
  } 

  getServicosWhere(campo, operador, valor: string) :any {
    this.servicosWhereCollection = this.where.collection('servico',ref => ref.where(campo, operador, valor));
    return this.servicosWhereCollection.snapshotChanges();
  }


  getServico(id:string){
    return this.servicosCollection.doc<Servico>(id).valueChanges();
  }

  updtServicos(servico:Servico, id: string){
    return this.servicosCollection.doc(id).update(servico);
  }

  addServicos(servico:Servico){
    return this.servicosCollection.add(servico);
  }

  delServico(id: string){
    return this.servicosCollection.doc(id).delete();
  }
}
 
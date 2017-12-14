import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import DocumentReference = firebase.firestore.DocumentReference;

export class Item {
  id: string;
  name: string;
  content = '';
  userId: string;

  toObject() {
    return {name: name, content: this.content, userId: this.userId};
  }
}

@Injectable()
export class ItemService {

  itemsCollection: AngularFirestoreCollection<Item>;
  userId: string;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  getItemsList() {
    this.itemsCollection = this.db.collection<Item>('items', ref => ref.orderBy('created', 'desc'));
    return this.itemsCollection.snapshotChanges().map(actions => actions.map(action => {
      const data = action.payload.doc.data() as Item;
      const id = action.payload.doc.id;
      return {id, ...data};
    }));
  }

  createItem(item: Item): Promise<DocumentReference> {
    const itemsCollection = this.db.collection('items');
    item.userId = this.userId;
    return itemsCollection.add({
      userId: this.userId, name: item.name, content: item.content, created: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  getItem(id: string) {
    return this.db.collection('items').doc(id);
  }

  deleteItem(id: string): Promise<void> {
    return this.db.collection('items').doc(id).delete();
  }
}

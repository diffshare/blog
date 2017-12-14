import {Component, OnInit} from '@angular/core';
import {Item, ItemService} from '../item.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  id: string;
  protected itemRef: AngularFirestoreDocument<any>;
  public item: Observable<any>;
  itemValue: Item;

  constructor(private route: ActivatedRoute, protected service: ItemService, private router: Router, private title: Title) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.itemRef = this.service.getItem(this.id);
      this.item = this.itemRef.valueChanges();
      this.item.subscribe(i => {
        this.itemValue = i;
        this.title.setTitle(i.name);
      });
    });
  }

  async remove() {
    const result = window.confirm('この記事を削除してよろしいですか？');
    if (result) {
      try {
        await this.service.deleteItem(this.id);
        await this.router.navigate(['/items']);
      } catch (e) {
        alert(e);
      }
    }
  }
}
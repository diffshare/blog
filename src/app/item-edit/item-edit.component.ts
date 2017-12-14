///<reference path="../../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import {Component, HostListener, OnInit} from '@angular/core';
import {AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemService} from '../item.service';
import {Location} from "@angular/common";

@Component({
  selector: 'app-item-edit',
  templateUrl: '../item-new/item-new.component.html',
  styleUrls: ['../item-new/item-new.component.css']
})
export class ItemEditComponent implements OnInit {

  protected itemRef: AngularFirestoreDocument<any>;
  public item: Observable<any>;
  name: string;
  content: string;
  id: string;

  constructor(private route: ActivatedRoute, protected service: ItemService, private router: Router, private location: Location) {
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.itemRef = this.service.getItem(this.id);
      this.item = this.itemRef.valueChanges();
      this.item.subscribe(i => {
        this.name = i.name;
        this.content = i.content;
      });
    });
  }

  async cancel() {
    this.location.back();
  }

  async onSubmit() {
    try {
      await this.itemRef.update({name: this.name, content: this.content});
      await this.router.navigate(['/items', this.id]);
    } catch (e) {
      alert(e);
    }
  }

  @HostListener('window:keydown', ['$event'])
  async onKeyDown(event: KeyboardEvent) {
    console.log(event);
    if (event.key === 's' && event.ctrlKey) {
      event.preventDefault();
      await this.onSubmit();
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      await this.cancel();
    }
  }
}

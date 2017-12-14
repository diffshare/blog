import {Component, HostListener, OnInit} from '@angular/core';
import {Item, ItemService} from '../item.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-item-new',
  templateUrl: './item-new.component.html',
  styleUrls: ['./item-new.component.css']
})
export class ItemNewComponent implements OnInit {

  name: string;
  content: string;

  constructor(private service: ItemService, private router: Router) {
  }

  ngOnInit() {
  }

  async cancel() {
    await this.router.navigate(['/items']);
  }

  async onSubmit() {
    const item = new Item();
    item.name = this.name;
    item.content = this.content;
    try {
      const result = await this.service.createItem(item);
      await this.router.navigate(['/items', result.id]);
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
  }
}

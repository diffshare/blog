import {Component} from '@angular/core';
import {ItemService} from './item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ItemService]
})
export class AppComponent {
}

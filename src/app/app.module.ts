import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MarkdownModule} from 'ngx-markdown';

import {AppComponent} from './app.component';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {ItemDetailComponent} from './item-detail/item-detail.component';
import {ItemListComponent} from './item-list/item-list.component';
import {ItemEditComponent} from './item-edit/item-edit.component';
import {HomeComponent} from './home/home.component';
import {ItemHomeComponent} from './item-home/item-home.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {ItemNewComponent} from './item-new/item-new.component';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import { BookListComponent } from './book-list/book-list.component';
import {HttpClientModule} from '@angular/common/http';
import { ThumbnailPipe } from './thumbnail.pipe';

const appRoutes: Routes = [
  {
    path: 'items', component: ItemListComponent,
    children: [
      {path: 'new', component: ItemNewComponent},
      {path: ':id/edit', component: ItemEditComponent},
      {path: ':id', component: ItemDetailComponent},
      {path: '', component: ItemHomeComponent}
    ]
  },
  {
    path: 'books', component: BookListComponent
  },
  {path: '', redirectTo: 'items', pathMatch: 'full'}
];

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    ItemDetailComponent,
    ItemListComponent,
    ItemEditComponent,
    HomeComponent,
    ItemHomeComponent,
    ItemNewComponent,
    BookListComponent,
    ThumbnailPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFontAwesomeModule,
    PerfectScrollbarModule
  ],
  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}

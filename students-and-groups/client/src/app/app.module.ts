import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StudentService} from './students/student.service';
import {HttpClientModule} from '@angular/common/http';
import {GroupService} from './groups/group.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [StudentService, GroupService],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

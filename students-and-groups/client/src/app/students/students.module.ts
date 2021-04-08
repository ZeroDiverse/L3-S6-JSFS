import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StudentsRoutingModule} from './students-routing.module';
import {StudentsComponent} from './students/students.component';
import {TableComponent} from './students/table/table.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [StudentsComponent, TableComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    FormsModule,
  ]
})
export class StudentsModule {
}

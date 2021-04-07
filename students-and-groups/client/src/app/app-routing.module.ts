import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentsModule} from "./students/students.module";
import {GroupsModule} from "./groups/groups.module";


const routes: Routes = [
  {
    path: 'students',
    loadChildren: () => import('./students/students.module').then(m => m.StudentsModule)
  },
  {
    path: 'groups',
    loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

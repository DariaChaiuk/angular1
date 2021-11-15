import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from  '@angular/forms'

import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
import { StudentAddComponent } from './students/student-add/student-add.component';
import { SubjectAddComponent } from './students/subject-add/subject-add.component';
import { MarkAddComponent } from './students/mark-add/mark-add.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    StudentAddComponent,
    SubjectAddComponent,
    MarkAddComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

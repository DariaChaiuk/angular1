import { Injectable } from '@angular/core';
import { Student } from '../models/student.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor() { }

  getData(): Observable<Student[]>{
    
    let students = [
      {
        id : 1,
        surname : "Kuk",
        name : "Jams",
        subjects : [
          {
            id: 0,
            name: "Software development",
            marks: [9, 10, 12]
          },
          {
            id: 1,
            name: "Database theory",
            marks: [10, 10, 11]
          }
        ]
      },
      {
        id : 2,
        surname : "Lin",
        name : "Brian",
        subjects : [
          {
            id: 0,
            name: "Software development",
            marks: [2, 12, 8]
          },
          {
            id: 1,
            name: "Database theory",
            marks: [7, 9, 8]
          }
        ]
      },
    ];

    return of(students);
  }
}

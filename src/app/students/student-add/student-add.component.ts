import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Student } from 'src/app/models/student.interface';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnChanges {

  constructor() {
    
  }
  @Output() onAdd = new EventEmitter<Student>();
  @Input() action : string = '';
  @Input() student : Student;
  
  form: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    surname: new FormControl("", [Validators.required])
  })

  createStudent(){
  console.log(this.action)

    if(this.action === "Add"){

      let student:Student = {
        id: 0,
        ...this.form.value,
        subjects: []
      }
      if(this.form.invalid){
        alert("Uncorrect input");
      }
      else{
        this.onAdd.emit(student);
      }
    }
    else{

      if(this.form.invalid){
        alert("Uncorrect input");
      }
      else{
        this.student.name = this.form.get("name").value;
        this.student.surname = this.form.get("surname").value;
        this.onAdd.emit(this.student);
      }
    }
  }


  ngOnChanges(changes: SimpleChanges) {
    if(changes && this.action === "Edit") {
      this.form.get('name').setValue(this.student.name);
      this.form.get('surname').setValue(this.student.surname);
    }
    else{
      this.form.reset();
    }
  }

}

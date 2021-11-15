import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'src/app/models/subject.interface';

@Component({
  selector: 'app-subject-add',
  templateUrl: './subject-add.component.html',
  styleUrls: ['./subject-add.component.css']
})
export class SubjectAddComponent implements OnInit, OnChanges {

  constructor() { }

  form: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
  })

  @Output() onAdd = new EventEmitter<Subject>();
  @Output() onEdit = new EventEmitter<Subject>();
  @Input() subject : Subject;
  @Input() action : string = '';

  ngOnInit(): void {
    //this.action = "Add";
  }

  createSubject():void{
  console.log(this.action)

    if(!this.form.invalid){
      if(this.action === 'Add'){
        let subject: Subject = {
          ...this.form.value,
          marks: []
        }
        this.onAdd.emit(subject);
      }
      else{
        this.subject.name = this.form.get("name").value;
        this.onEdit.emit(this.subject);
      }
    }
    else{
      alert("Uncorrect input");
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes && this.action==="Edit") {
      this.form.get('name').setValue(this.subject.name);
    }
    else{
      this.form.reset();
    }
  }

}

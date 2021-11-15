import { Component, Output, EventEmitter, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-mark-add',
  templateUrl: './mark-add.component.html',
  styleUrls: ['./mark-add.component.css']
})
export class MarkAddComponent implements OnChanges {

  constructor() { }
  form: FormGroup = new FormGroup({
    mark: new FormControl("", [Validators.required, Validators.max(12), Validators.min(1)])
  })

  @Output() onAdd = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<number>();
  @Input() mark: any;

  createMark(){
    if(this.form.invalid){
      alert("Uncorrect input");
    }
    else{
      this.onAdd.emit(this.form.get("mark").value);
      this.form.reset();
    } 
  }

  editMark(){
    if(!this.form.get("mark").value)
    {
      alert("No selected mark");
    }
    else{
      if(!this.form.invalid){
        this.onEdit.emit(this.form.get("mark").value);
        this.form.reset();
      }
      else{
        alert("Uncorrect input");
      }
    } 
  }

  ngOnChanges(changes: SimpleChanges) {
   if(changes?.mark.currentValue)
   {
      this.form.get('mark').setValue(changes?.mark.currentValue.markValue);
   }
  }

}

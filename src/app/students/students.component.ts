import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student.interface';
import { StudentService } from '../services/student.service';
import { Subject } from '../models/subject.interface';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor(private studentService: StudentService) { }

  action:string = '';
  subjectAction:string = '';
  isVisibleStudent: boolean = false;
  isVisibleSubject:boolean = false;
  isVisibleSubjectsList:boolean = false;
  selectedStudent:Student;
  students: Student[];
  selectedSubject: Subject;
  selectedMark:any;

  ngOnInit(): void {
    this.studentService.getData().subscribe(data => {
      console.log(data);
      this.students = data;
    });
  }

  createStudent(student: Student){
    if(this.action === "Add"){
      student.id = this.students[this.students.length-1].id + 1;
      this.students.push(student);
      this.addStudent();
    }
    else{
      this.addStudent();
    }
  }
  onCreateSubject(subject: Subject){
    if(this.selectedStudent.subjects[this.selectedStudent.subjects.length-1]){
      subject.id = this.selectedStudent.subjects[this.selectedStudent.subjects.length-1].id + 1;
      subject.marks = [];
    }
    else{
      subject.id = 1;
    }
    this.selectedStudent.subjects.push(subject);
    this.isVisibleSubject = !this.isVisibleSubject;
  }

  editSubject(subject: Subject){
    this.subjectAction = 'Edit';

    if(this.selectedSubject){
      if(subject.id===this.selectedSubject.id && this.isVisibleSubject){
        this.isVisibleSubject = !this.isVisibleSubject;
      }
      else if(!this.isVisibleSubject){
        this.isVisibleSubject = !this.isVisibleSubject;
      }
    }
    else{
      this.isVisibleSubject = !this.isVisibleSubject;
    }

    this.selectedSubject = subject;
  }

  onEditSubject(subject: Subject){
    this.isVisibleSubject = !this.isVisibleSubject;
  }

  createMark(mark: number){
    this.selectedSubject.marks.push(mark);
    this.selectedMark = undefined;
  }

  editMark(mark:number){
    this.selectedSubject.marks[this.selectedMark.markIndex] = mark;
    this.selectedMark = undefined;
  }

  selectMark(mark:number, index:number){
    this.selectedMark = {
      markValue: mark,
      markIndex: index
    }
  } 

  addStudent(){
    if(this.action === "Add" && this.isVisibleStudent){
      this.isVisibleStudent = !this.isVisibleStudent;
    }
    else if(!this.isVisibleStudent){
      this.isVisibleStudent = !this.isVisibleStudent;
    }
    this.action = "Add";
  }

  editStudent(student:Student){
    if(this.selectedStudent){
      if(student.id===this.selectedStudent.id && this.isVisibleStudent && this.action==="Edit"){
        this.isVisibleStudent = !this.isVisibleStudent;
      }
      else if(!this.isVisibleStudent){
        this.isVisibleStudent = !this.isVisibleStudent;
      }
    }

    this.action = "Edit";
    this.selectedStudent = student;
  }

  deleteStudent(student: Student){
    this.students = this.students.filter(function(x){return x.id != student.id})
  }

  addSubject(student: Student){
    if(this.isVisibleSubject && this.subjectAction==="Add"){
      this.isVisibleSubject = !this.isVisibleSubject;
    }
    else if(!this.isVisibleSubject){
      this.isVisibleSubject = !this.isVisibleSubject;
    }

    this.selectedStudent = student;
    this.subjectAction = 'Add';
  }

  showSubjects(student: Student){

    if(this.selectedStudent){
      if(student.id===this.selectedStudent.id && this.isVisibleSubjectsList){
        this.isVisibleSubjectsList = !this.isVisibleSubjectsList;
      }
      else if(!this.isVisibleSubjectsList){
        this.isVisibleSubjectsList = !this.isVisibleSubjectsList;
      }

      this.isVisibleSubject = false;
      this.isVisibleStudent = false;
      
    }
    else{
      this.isVisibleSubjectsList = !this.isVisibleSubjectsList;
    }

    this.selectedStudent = student;
    this.selectedSubject = null;
    this.selectedMark = undefined;
  }

  selectSubject(subject: Subject){
    this.selectedSubject = subject;
  }

  deleteSubject(subject: Subject){
    this.selectedStudent.subjects = this.selectedStudent.subjects.filter(function(x){ return x.id != subject.id});
  }

  deleteMark(index:number){
    this.selectedSubject.marks.splice(index,1);
  }
}

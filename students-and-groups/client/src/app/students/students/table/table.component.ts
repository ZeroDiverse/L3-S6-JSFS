import {Component, OnInit} from '@angular/core';
import {Student} from '../../../models/student';
import {StudentService} from "../../student.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  buttonText: string;
  students: Student[];
  studentForm: Student;

  constructor(private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.buttonText = 'Create';
    this.studentForm = new Student('', '', '', '');
    this.studentService.getStudents().subscribe((data: Student[]) => this.students = data);
  }

  createOrUpdateStudent(student: NgForm): void {
    console.log(student.value);
  }

  startUpdateProcess(student: Student): void {
    this.studentForm.firstname = student.firstname;
    this.studentForm.lastname = student.lastname;
    this.studentForm.studentNumber = student.studentNumber;
  }
}

import {Component, OnInit} from '@angular/core';
import {Student} from '../../../models/student';
import {StudentService} from '../../student.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  buttonText: string;
  students: Student[];
  studentForm: Student;
  popupContent: string;
  isPopupOpen: boolean;

  constructor(private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.buttonText = 'Create';
    this.studentForm = new Student();
    this.studentService.getStudents().subscribe((data: Student[]) => this.students = data);
  }

  createOrUpdateStudent(student: NgForm): void {
    if (this.buttonText === 'Create') {
      const studentTemp: Student = {
        lastname: student.controls.firstname.value,
        firstname: student.controls.lastname.value,
        studentNumber: student.controls.studentNumber.value
      };

      this.studentService.createNewStudent(studentTemp).subscribe((data: Student) => {
        this.students.push(data);
        this.studentForm = new Student();
        student.reset();
      });

    } else {

    }
  }

  deleteStudent(studentId: string) {
    this.studentService.deleteStudent(studentId).subscribe(() => {
      this.students = this.students.filter(student => student._id !== studentId);
    });
  }

  startUpdateProcess(student: Student): void {
    this.studentForm.firstname = student.firstname;
    this.studentForm.lastname = student.lastname;
    this.studentForm.studentNumber = student.studentNumber;
    this.buttonText = 'Update';
  }
}

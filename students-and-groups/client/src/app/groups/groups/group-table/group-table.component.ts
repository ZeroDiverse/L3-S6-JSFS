import {Component, Input, OnInit} from '@angular/core';
import {Student} from '../../../models/student';
import {GroupService} from '../../group.service';
import {Group} from '../../../models/group';

@Component({
  selector: 'app-group-table',
  templateUrl: './group-table.component.html',
  styleUrls: ['./group-table.component.scss']
})
export class GroupTableComponent implements OnInit {
  groupNumbers: number[];
  students: Student[];

  constructor(private groupService: GroupService) {
  }

  private _groupNumber: number;

  @Input() set groupNumber(value: number) {
    this.students = [];
    this._groupNumber = value;
    if (this.groupNumber === 0) {
      this.groupService.getStudentsWithoutGroupId().subscribe((data: Student[]) => this.students = data);
    } else {
      this.groupService.getStudentWithGroupId(this.groupNumber).subscribe((data: Student[]) => this.students = data);
    }
  }

  get groupNumber(): number {

    return this._groupNumber;

  }

  ngOnInit(): void {
    this.groupNumbers = [0, 1, 2, 3, 4, 5, 6];
    if (this.groupNumber === 0) {
      this.groupService.getStudentsWithoutGroupId().subscribe((data: Student[]) => this.students = data);
    } else {
      this.groupService.getStudentWithGroupId(this.groupNumber).subscribe((data: Student[]) => this.students = data);
    }
  }

  assignStudentToGroupByGroupNumber(student: Student, groupNumber: number) {
    this.groupService.assignStudentToGroupId(student._id, groupNumber).subscribe(
      (data: Group) => {
        this.students = this.students.filter(s => s._id !== data.student);
      }
    );
  }

  unAssignStudentFromGroup(student: Student) {
    this.groupService.unAssignStudentFromGroupId(student._id).subscribe(
      () => {
        this.students = this.students.filter(s => s._id !== student._id);
      }
    );
  }

}

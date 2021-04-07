export class Student {
  _id?: string;
  lastname: string;
  firstname: string;
  studentNumber: string;

  constructor(_id = '', lastname = '', firstname = '', studentNumber= '') {
    this._id = _id;
    this.lastname = firstname;
    this.firstname = firstname;
    this.studentNumber = studentNumber;
  }
}

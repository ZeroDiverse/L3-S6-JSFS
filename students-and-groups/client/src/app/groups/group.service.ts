import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Student} from '../models/student';
import {HttpClient} from '@angular/common/http';
import {Group} from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  baseUrl = 'http://localhost:8080/api/groups';

  constructor(private http: HttpClient) { }

  getStudentsWithoutGroupId(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/students`);
  }

  getStudentWithGroupId(groupNumber: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/${groupNumber}/students`);
  }

  assignStudentToGroupId(studentId: string, groupNumber: number): Observable<Group> {
    return this.http.post<Group>(`${this.baseUrl}/${groupNumber}/students/${studentId}`,{});
  }

  unAssignStudentFromGroupId(studentId: string): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/students/${studentId}`,  {});
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Student} from "../models/student";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/students`);
  }
}

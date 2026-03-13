import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
private baseUrl = 'http://localhost:3500';
private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}

    constructor(private http: HttpClient) { }

    //meite cuando se cre aun estudiante
    private _created$ = new Subject<Student>();
    created$ = this._created$.asObservable();

    //obtener todos los estudiantes
    getStudents(): Observable<Student[]>{
        return this.http.get<Student[]>(this.baseUrl + '/getAll');
    }

    //crear nuevo estudiante
    createStudent(student: Student): Observable<Student>{
        console.log(student);
        return this.http.post<Student>(this.baseUrl+'/insertOne', student, this.httpOptions)
        .pipe(
                tap(s => this._created$.next(s))   //la resouesta se la mandamos al observable y lo agrega al arreglo que declaramos hasta arriba en la tabla
            );
    }

    //elimina un nuevo estudiante
    private _deleted$ = new Subject<Student>();
    deleted$ = this._deleted$.asObservable();

    //eliminar un nuevo estudiante se invoca al servicio deleteOne
    deleteStudent(student_id: string): Observable<void>{
        const url = `${this.baseUrl}/deleteOne/${student_id}`;
        return this.http.delete<void>(url, this.httpOptions);
    }


    //ACTUALIZAR ESTUDIANTES
    private _updated$ = new Subject<Student>();
    updated$ = this._updated$.asObservable();

    //inovanco al updtae sevricio
    updateStudent(student: Student): Observable<Student>{
        console.log(student);
        const url = `${this.baseUrl}/updateOne/${student.student_id}`;
        return this.http.put<Student>(url, student, this.httpOptions)
        .pipe(
            tap(s => this._updated$.next(s))
        );

    }

    
    
}
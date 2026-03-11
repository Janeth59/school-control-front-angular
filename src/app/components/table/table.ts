import { NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-table',
  imports: [NgFor],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table implements OnInit {
  students: Student[]=[];

  constructor(
    private studentservice: StudentService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
     this.loadStudents();
     this.studentservice.created$.subscribe(s => {
      this.students.push(s);
      this.cdr.detectChanges();
    });

     this.studentservice.deleted$.subscribe(Student =>{
      this.students = this.students.filter(s => s.student_id !== Student.student_id);
     })
  }

   loadStudents(): void {

    this.studentservice.getStudents().subscribe({
      next: data => {
        this.students = data
        this.cdr.detectChanges();
        console.log('Estudiantes',this.students)  
      },
      error: err => console.error('Error al cargar estudiantes', err)
    });
  }

  removeStudent (id: string): void {
    this.studentservice.deleteStudent(id).subscribe({
      next:()=>{
        this.students = this.students.filter(st=> st.student_id !== id);
        this.loadStudents();
      },
      error: err => console.error('Error al eliminar el estudiante', err)
      
    });
  }


  
}
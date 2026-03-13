import { NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { Form } from '../form/form';

@Component({
  selector: 'app-table',
  imports: [NgFor],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table implements OnInit {
  students: Student[]=[];

 // @ViewChild(Form) formComponent!: Form;
 @Output() editStudentEvent = new EventEmitter<Student>();

  constructor(
    private studentservice: StudentService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
     this.loadStudents();

     //crear estudinate suscripcion
     this.studentservice.created$.subscribe(s => {
      this.students.push(s);
      this.cdr.detectChanges();
    });

    //eliminar estudiante suscripcion
     this.studentservice.deleted$.subscribe(Student =>{
      this.students = this.students.filter(s => s.student_id !== Student.student_id);
     });

     //actualizar suscripcion
     this.studentservice.updated$.subscribe(Student => {
      //actualizar lista
      const index = this.students.findIndex(s => s.student_id === Student.student_id);
      if(index !== -1)
      {
        this.students[index] = Student;
        this.cdr.detectChanges();
      }
      else
      {
        console.log('esta mal en algo..');
      }
     });
  }

  //Cargar estudiantes
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

  //Eliminar estudiante
  removeStudent (id: string): void {
    this.studentservice.deleteStudent(id).subscribe({
      next:()=>{
        this.students = this.students.filter(st=> st.student_id !== id);
        this.loadStudents();
      },
      error: err => console.error('Error al eliminar el estudiante', err)
      
    });
  }

  //acutalizar studiante
  editStudent(student: Student): void{
    this.editStudentEvent.emit(student); //esto llamando a lafuncion
  }


  
}
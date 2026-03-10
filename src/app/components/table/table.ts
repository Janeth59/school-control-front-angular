import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table implements OnInit {
  students: Student[] = [];

  // Definición del formulario
  studentForm = new FormGroup({
    student_id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    grade: new FormControl(0, [Validators.required]),
    group: new FormControl('', [Validators.required]),
    average: new FormControl(0, [Validators.required]),
  });

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();

    // Suscripción al Subject para actualizar la tabla cuando se crea uno nuevo
    this.studentService.created$.subscribe((newStudent: Student) => {
      // Usamos el spread operator [...] para forzar a Angular a detectar el cambio
      this.students = [...this.students, newStudent];
    });
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        console.log('Datos recibidos:', data);
      },
      error: (err) => console.error('Error al cargar:', err)
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const formValue = this.studentForm.value as Student;
      this.studentService.createStudent(formValue).subscribe({
        next: (res) => {
          console.log('Guardado exitoso');
          this.studentForm.reset();
        },
        error: (err) => console.error('Error al guardar:', err)
      });
    }
  }
}
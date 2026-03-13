import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormsModule, Validator, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from '../../services/student.service';
//import { error, group } from 'console';
import {Student} from "../../models/student.model"
//import { NgClass } from "../../../../node_modules/@angular/common/types/_common_module-chunk";
import { CommonModule } from '@angular/common';
import { NgIf, NgClass } from '@angular/common';
imports: [ReactiveFormsModule];

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgClass],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form implements OnInit, OnChanges {
  studentForm!: FormGroup;

  @Input() editStudent?: Student; // recibe del padre
  
  //detectar cambios en Input
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editStudent'] && this.editStudent) {
      this.stuEdit(this.editStudent);
    }
  }

  //editar?
  isEditingMode = false;
  editingStudentId?: string;  ///

  constructor(
    private fb: FormBuilder,
    private studentService:StudentService
  ){}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      student_id: ['', Validators.required],
      name: ['', Validators.required],
      lastname:['', Validators.required],
      grade: [null, [Validators.required, Validators.min(1)]],
      group: ['',Validators.required],
      average: [null, [Validators.required,Validators.min(0),Validators.max(100)]]
    });
  }

  //cargar studentiant
  stuEdit(student: Student): void{
    this.isEditingMode = true;
    this.editingStudentId = student.student_id;
    this.studentForm.patchValue(student);
  }

  //cancelar editar
  cancelEdit(): void{
    this.isEditingMode = false;
    this.editingStudentId = undefined;
    this.studentForm.reset();
  }

  onSubmit():void{
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const student: Student = this.studentForm.value;

    if (this.isEditingMode && this.editingStudentId) {
      //editar
      student.student_id = this.editingStudentId; // verifiancod id
      this.studentService.updateStudent(student).subscribe({
        next: (updated) => {
          console.log('Estiduante actualizado', updated);
          this.cancelEdit(); // resetear formulario
        },
        error: (err) => {
          console.error('No se pudo chavo:', err);
        }
      });
    } else {
      // crear estuadinate
      this.studentService.createStudent(student).subscribe({
        next: (s) => {
          console.log('estudinate creado', s);
          this.studentForm.reset();
        },
        error: (err) => {
          console.error('La tarea fallo con exito, no se creo un estuaidnate:', err);
        }
      });
    }
  }
}
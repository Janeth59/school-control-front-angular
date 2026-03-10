import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormsModule, Validator, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { error, group } from 'console';
import {Student} from "../../models/student.model"
imports: [ReactiveFormsModule];

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form implements OnInit {
  studentForm!: FormGroup;

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

  onSubmit():void{
    if (this.studentForm.invalid){
      this.studentForm.markAllAsTouched();
      return;
    }


  const student: Student = this.studentForm.value;
  this.studentService.createStudent (student).subscribe({
    next:s =>{
      console.log('EStudiante Guardado', s);
      this.studentForm.reset();
    },

    error: err => console.error('Error al guardar estudiante', err)
  });
  }


}
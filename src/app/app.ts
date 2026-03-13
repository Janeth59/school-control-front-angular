import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Form } from './components/form/form';
import { Table } from './components/table/table';
import { Student } from './models/student.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, Form, Table],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  selectedStudent?: Student;

  // manejar evento de tabla
  onTableEdit(student: Student) {
    console.log('se recibi oeditar:', student);
    this.onEditStudent(student);
  }

  onEditStudent(student: Student) {
    console.log('editando esutdiante:', student);
  }

  selectStudentForEdit(student: Student) {
    console.log('📡 Seleccionado:', student);
    this.selectedStudent = student; //paasa al form
  }

  protected readonly title = signal('school-control-front');
}
 
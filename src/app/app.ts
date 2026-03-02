import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Form } from './components/form/form';
import { Table } from './components/table/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, Form, Table],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('school-control-front');
}
 
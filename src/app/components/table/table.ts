import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { group } from 'node:console';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor],
  templateUrl: './table.html',
  styleUrls: ['./table.css'],
})
export class Table {
  students=[{
    student_id: "D22390001",
    name: "Cupertino",
    lastname: "Luna trejo",
    grade: 9,
    group: "A",
    average: 97
  },{
    student_id: "D22390000",
    name: "Karina",
    lastname: "Hernandez Carmona",
    grade: 8,
    group: "B",
    average: 97
  }, 
{
    student_id: " D22390011",
    name: "Eber",
    lastname: "Eleazar",
    grade: 8,
    group: "B",
    average: 97
  }];
}

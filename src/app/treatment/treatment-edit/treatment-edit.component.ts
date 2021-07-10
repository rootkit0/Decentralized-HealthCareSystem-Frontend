import { Component, OnInit } from '@angular/core';
import { Treatment } from 'src/app/models/treatment';

@Component({
  selector: 'app-treatment-edit',
  templateUrl: './treatment-edit.component.html',
  styleUrls: ['./treatment-edit.component.css']
})
export class TreatmentEditComponent implements OnInit {
  treatment: Treatment = new Treatment();
  
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    
  }
}

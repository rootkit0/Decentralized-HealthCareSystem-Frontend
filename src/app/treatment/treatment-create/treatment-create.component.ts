import { Component, OnInit } from '@angular/core';
import { Treatment } from 'src/app/models/treatment';

@Component({
  selector: 'app-treatment-create',
  templateUrl: './treatment-create.component.html',
  styleUrls: ['./treatment-create.component.css']
})
export class TreatmentCreateComponent implements OnInit {
  treatment: Treatment = new Treatment();
  
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    
  }

}

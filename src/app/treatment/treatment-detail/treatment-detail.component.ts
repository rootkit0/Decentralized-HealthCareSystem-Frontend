import { Component, OnInit } from '@angular/core';
import { Treatment } from 'src/app/models/treatment';

@Component({
  selector: 'app-treatment-detail',
  templateUrl: './treatment-detail.component.html',
  styleUrls: ['./treatment-detail.component.css']
})
export class TreatmentDetailComponent implements OnInit {
  treatment: Treatment = new Treatment();
  
  constructor() { }

  ngOnInit(): void {
  }
}

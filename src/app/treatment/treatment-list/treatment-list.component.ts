import { Component, OnInit } from '@angular/core';
import { Treatment } from 'src/app/models/treatment';

@Component({
  selector: 'app-treatment-list',
  templateUrl: './treatment-list.component.html',
  styleUrls: ['./treatment-list.component.css']
})
export class TreatmentListComponent implements OnInit {
  treatments: Treatment[] = [];

  constructor() {
    let treatment1: Treatment = new Treatment();
    let treatment2: Treatment = new Treatment();
    treatment1.treatmentId = 1;
    treatment2.treatmentId = 2;
    this.treatments.push(treatment1);
    this.treatments.push(treatment2);
  }

  ngOnInit(): void {
  }

}

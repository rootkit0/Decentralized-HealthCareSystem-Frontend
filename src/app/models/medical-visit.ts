export class MedicalVisit {
  medicalVisitId!: number;
  patientId!: string;
  doctorId!: string;
  dateVisit!: number;
  hourVisit!: number;
  symptoms!: string;
  urgency!: boolean;

  constructor() {
    this.medicalVisitId = 0;
    this.patientId = "";
    this.doctorId = "";
    this.dateVisit = 0;
    this.hourVisit = 0;
    this.symptoms = "";
    this.urgency = false;
  }
}
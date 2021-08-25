export class MedicalVisit {
  medicalVisitId!: number;
  patientId!: string;
  doctorId!: string;
  dateVisit!: number;
  dateVisitStr!: string;
  hourVisit!: string;
  symptoms!: string;
  urgency!: boolean;

  constructor() {
    this.medicalVisitId = 0;
    this.patientId = "";
    this.doctorId = "";
    this.dateVisit = 0;
    this.dateVisitStr = "";
    this.hourVisit = "12:00";
    this.symptoms = "";
    this.urgency = false;
  }
}

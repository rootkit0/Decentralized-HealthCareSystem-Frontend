export class Treatment {
    treatmentId!: number;
    patientId!: string;
    doctorId!: string;
    diagnosis!: string;
    medicine!: string;
    fromDate!: number;
    toDate!: number;
    bill!: number;

    constructor() {
        this.treatmentId = 0;
        this.patientId = "";
        this.doctorId = "";
        this.diagnosis = "";
        this.medicine = "";
        this.fromDate = 0;
        this.toDate = 0;
        this.bill = 0;
    }
}
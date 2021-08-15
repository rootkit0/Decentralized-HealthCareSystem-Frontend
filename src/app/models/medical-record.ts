export class MedicalRecord {
    medicalRecordId!: string;
    medications!: string;
    allergies!: string;
    illnesses!: string;
    immunizations!: string;
    bloodType!: string;
    hasInsurance!: boolean;
    treatmentsIds!: number[];
    
    constructor() {
        this.medicalRecordId = "";
        this.medications = "";
        this.allergies = "";
        this.illnesses = "";
        this.immunizations = "";
        this.bloodType = "";
        this.hasInsurance = false;
        this.treatmentsIds = [];
    }
}
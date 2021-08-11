export class MedicalRecord {
    medicalRecordId: any;
    medications!: string;
    allergies!: string;
    illnesses!: string;
    immunizations!: string;
    bloodType!: string;
    hasInsurance!: boolean;
    treatmentsIds!: number[];
}
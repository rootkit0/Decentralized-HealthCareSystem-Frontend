export class MedicalRecord {
    medicalRecordId!: string;
    medications!: string;
    allergies!: string;
    illnesses!: string;
    immunizations!: string;
    bloodType!: string;
    hasInsurance!: boolean;
    treatmentsIds!: number[];
}
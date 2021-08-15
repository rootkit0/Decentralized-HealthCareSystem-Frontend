export class Patient {
    patientId!: string;
    name!: string;
    dateOfBirth!: number;
    email!: string;
    phone!: string;
    homeAddress!: string;
    city!: string;
    postalCode!: string;
    assignedDoctorId!: any;

    constructor() {
        this.patientId = "";
        this.name = "";
        this.dateOfBirth = 0;
        this.email = "";
        this.phone = "";
        this.homeAddress = "";
        this.city = "";
        this.postalCode = "";
        this.assignedDoctorId = "";
    }
}
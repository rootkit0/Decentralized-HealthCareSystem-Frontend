export class Doctor {
    doctorId!: string;
    name!: string;
    email!: string;
    phone!: string;
    homeAddress!: string;
    city!: string;
    postalCode!: string;
    medicalSpeciality!: string;
    assignedHospital!: string;
    assignedPatientsIds!: any[];

    constructor() {
        this.doctorId = "";
        this.name = "";
        this.email = "";
        this.phone = "";
        this.homeAddress = "";
        this.city = "";
        this.postalCode = "";
        this.medicalSpeciality = "";
        this.assignedHospital = "";
        this.assignedPatientsIds = [];
    }
}
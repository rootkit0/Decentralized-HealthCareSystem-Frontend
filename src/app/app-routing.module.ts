import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PatientEditComponent } from './patient/patient-edit/patient-edit.component';
import { PatientListComponent } from './patient/patient-list/patient-list.component';
import { DoctorEditComponent } from './doctor/doctor-edit/doctor-edit.component';
import { DoctorListComponent } from './doctor/doctor-list/doctor-list.component';
import { MedicalRecordEditComponent } from './medical-record/medical-record-edit/medical-record-edit.component';
import { MedicalRecordDetailComponent } from './medical-record/medical-record-detail/medical-record-detail.component';
import { TreatmentCreateComponent } from './treatment/treatment-create/treatment-create.component';
import { TreatmentEditComponent } from './treatment/treatment-edit/treatment-edit.component';
import { TreatmentDetailComponent } from './treatment/treatment-detail/treatment-detail.component';
import { TreatmentListComponent } from './treatment/treatment-list/treatment-list.component';

import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'home', component: HomeComponent},
  { path: 'user-profile', component: UserProfileComponent},
  { path: 'patient-edit', component: PatientEditComponent},
  { path: 'patient-list', component: PatientListComponent},
  { path: 'doctor-edit', component: DoctorEditComponent},
  { path: 'doctor-list', component: DoctorListComponent},
  { path: 'medical-record-edit', component: MedicalRecordEditComponent},
  { path: 'medical-record-detail', component: MedicalRecordDetailComponent},
  { path: 'treatment-create', component: TreatmentCreateComponent},
  { path: 'treatment-detail', component: TreatmentDetailComponent},
  { path: 'treatment-edit', component: TreatmentEditComponent},
  { path: 'treatment-list', component: TreatmentListComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

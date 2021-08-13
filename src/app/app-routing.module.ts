import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MedicalRecordComponent } from './medical-record/medical-record.component';
import { TreatmentComponent } from './treatment/treatment.component';
import { TreatmentListComponent } from './treatment-list/treatment-list.component';
import { PatientListComponent } from './patient-list/patient-list.component';

import { AuthGuardService } from './services/auth-guard.service';
import { UserRoles } from './models/user-roles';

const routes: Routes = [
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuardService]},
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuardService]},
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuardService],
    data: {
      userRole: UserRoles.ADMIN
    }
  },
  { path: 'medical-record/:id', component: MedicalRecordComponent, canActivate: [AuthGuardService]},
  { path: 'treatment/:id', component: TreatmentComponent, canActivate: [AuthGuardService]},
  { path: 'patient-list/:id', component: PatientListComponent, canActivate: [AuthGuardService],
    data: {
      userRole: UserRoles.DOCTOR
    }
  },
  { path: 'treatment-list/:id', component: TreatmentListComponent, canActivate: [AuthGuardService]},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

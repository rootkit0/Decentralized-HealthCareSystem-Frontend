import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { TreatmentListComponent } from './treatment-list/treatment-list.component';
import { TreatmentComponent } from './treatment/treatment.component';
import { MedicalRecordComponent } from './medical-record/medical-record.component';

import { AuthGuardService } from './services/auth-guard.service';
import { UserRoles } from './models/user-roles';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'home', component: HomeComponent},
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuardService]},
  { path: 'patient-list', component: PatientListComponent, canActivate: [AuthGuardService],
    data: {
      userRole: UserRoles.DOCTOR
    }
  },
  { path: 'treatment-list', component: TreatmentListComponent, canActivate: [AuthGuardService],
    data: {
      userRole: UserRoles.PATIENT
    }
  },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuardService],
    data: {
      userRole: UserRoles.ADMIN
    }
  },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

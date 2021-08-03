import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PatientListComponent } from './patient/patient-list/patient-list.component';
import { MedicalRecordEditComponent } from './medical-record/medical-record-edit/medical-record-edit.component';
import { MedicalRecordDetailComponent } from './medical-record/medical-record-detail/medical-record-detail.component';
import { TreatmentCreateComponent } from './treatment/treatment-create/treatment-create.component';
import { TreatmentEditComponent } from './treatment/treatment-edit/treatment-edit.component';
import { TreatmentDetailComponent } from './treatment/treatment-detail/treatment-detail.component';
import { TreatmentListComponent } from './treatment/treatment-list/treatment-list.component';

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
      userRoles: [UserRoles.DOCTOR]
    }
  },
  { path: 'medical-record-edit', component: MedicalRecordEditComponent, canActivate: [AuthGuardService],
    data: {
      userRoles: [UserRoles.DOCTOR]
    }
  },
  { path: 'medical-record-detail', component: MedicalRecordDetailComponent, canActivate: [AuthGuardService],
    data: {
      userRoles: [UserRoles.DOCTOR]
    }
  },
  { path: 'treatment-create', component: TreatmentCreateComponent, canActivate: [AuthGuardService],
    data: {
      userRoles: [UserRoles.DOCTOR]
    }
  },
  { path: 'treatment-detail', component: TreatmentDetailComponent, canActivate: [AuthGuardService],
    data: {
      userRoles: [UserRoles.DOCTOR]
    }
  },
  { path: 'treatment-edit', component: TreatmentEditComponent, canActivate: [AuthGuardService],
    data: {
      userRoles: [UserRoles.DOCTOR]
    }
  },
  { path: 'treatment-list', component: TreatmentListComponent, canActivate: [AuthGuardService],
    data: {
      userRoles: [UserRoles.DOCTOR]
    }
  },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuardService],
    data: {
      UserRoles: [UserRoles.ADMIN]
    }
  },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

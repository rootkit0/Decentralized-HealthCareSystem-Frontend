import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuardService } from './services/auth-guard.service';
import { MedicalRecordCreateComponent } from './medical-record/medical-record-create/medical-record-create.component';
import { MedicalRecordDetailComponent } from './medical-record/medical-record-detail/medical-record-detail.component';
import { MedicalRecordEditComponent } from './medical-record/medical-record-edit/medical-record-edit.component';
import { TreatmentCreateComponent } from './treatment/treatment-create/treatment-create.component';
import { TreatmentDetailComponent } from './treatment/treatment-detail/treatment-detail.component';
import { TreatmentEditComponent } from './treatment/treatment-edit/treatment-edit.component';
import { TreatmentListComponent } from './treatment/treatment-list/treatment-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'home', component: HomeComponent},
  { path: 'user-profile', component: UserProfileComponent},
  { path: 'med-rec-create', component: MedicalRecordCreateComponent},
  { path: 'med-rec-detail', component: MedicalRecordDetailComponent},
  { path: 'med-rec-edit', component: MedicalRecordEditComponent},
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

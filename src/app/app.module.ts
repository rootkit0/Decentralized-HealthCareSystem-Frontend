import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MedicalRecordCreateComponent } from './medical-record/medical-record-create/medical-record-create.component';
import { MedicalRecordEditComponent } from './medical-record/medical-record-edit/medical-record-edit.component';
import { MedicalRecordDetailComponent } from './medical-record/medical-record-detail/medical-record-detail.component';
import { TreatmentCreateComponent } from './treatment/treatment-create/treatment-create.component';
import { TreatmentEditComponent } from './treatment/treatment-edit/treatment-edit.component';
import { TreatmentDetailComponent } from './treatment/treatment-detail/treatment-detail.component';
import { TreatmentListComponent } from './treatment/treatment-list/treatment-list.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    UserProfileComponent,
    MedicalRecordCreateComponent,
    MedicalRecordEditComponent,
    MedicalRecordDetailComponent,
    TreatmentCreateComponent,
    TreatmentEditComponent,
    TreatmentDetailComponent,
    TreatmentListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

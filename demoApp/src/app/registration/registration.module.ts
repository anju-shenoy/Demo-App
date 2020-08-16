import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadComponent } from '../shared/components/file-upload/file-upload.component';
import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    Ng5SliderModule,
  ],
  declarations: [RegistrationComponent, FileUploadComponent],
})
export class RegistrationModule {}

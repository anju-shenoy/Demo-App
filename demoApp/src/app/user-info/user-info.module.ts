import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInfoRoutingModule } from './user-info-routing.module';
import { UserInfoComponent } from './user-info.component';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [UserInfoComponent],
  imports: [CommonModule, UserInfoRoutingModule, MaterialModule],
})
export class UserInfoModule {}

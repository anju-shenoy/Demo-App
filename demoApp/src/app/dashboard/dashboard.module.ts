import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../shared/material.module';
import { TopNavComponent } from '../shared/components/top-nav/top-nav.component';

@NgModule({
  declarations: [DashboardComponent, TopNavComponent],
  imports: [CommonModule, DashboardRoutingModule, MaterialModule],
})
export class DashboardModule {}

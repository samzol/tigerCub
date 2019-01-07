import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { HeaderComponent } from '../shared/layouts/header/header.component';
import { BaseHeaderComponent } from '../shared/layouts/base-header/base-header.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
  ],
  declarations: [
    HeaderComponent,
    BaseHeaderComponent
  ],
  exports: [
    HeaderComponent,
    BaseHeaderComponent
  ]
})
export class SharedModule { }

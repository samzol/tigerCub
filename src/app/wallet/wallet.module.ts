import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination'

import { WalletRoutingModule } from './wallet.routing.module';
import { SharedModule } from '../shared/shared.module';

import { WalletListComponent } from './wallet-list/wallet-list.component';
import { BlockListComponent } from './block-list/block-list.component';
import { TransListComponent } from './trans-list/trans-list.component';
import { MiningListComponent } from './mining-list/mining-list.component';
import { CreateSendComponent } from './create-send/create-send.component';
import { WalletDetailsComponent } from './wallet-details/wallet-details.component';

@NgModule({
  declarations: [
    WalletListComponent, 
    BlockListComponent, 
    TransListComponent, 
    MiningListComponent, 
    CreateSendComponent,
    WalletDetailsComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule,
    WalletRoutingModule,
    SharedModule
  ],
  exports: [
    WalletListComponent, 
    BlockListComponent, 
    TransListComponent, 
    MiningListComponent, 
    CreateSendComponent,
    WalletDetailsComponent
  ]
})
export class WalletModule { }

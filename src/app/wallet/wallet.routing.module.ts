import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WalletListComponent } from './wallet-list/wallet-list.component';
import { BlockListComponent } from './block-list/block-list.component';
import { TransListComponent } from './trans-list/trans-list.component';
import { MiningListComponent } from './mining-list/mining-list.component';
import { CreateSendComponent } from './create-send/create-send.component';
import { WalletDetailsComponent } from './wallet-details/wallet-details.component';

export const routes: Routes = [
    {
        path: '',
        component: WalletListComponent
    },
    {
        path: 'wallets',
        component: WalletListComponent
    },
    {
        path: 'blocks',
        component: BlockListComponent
    },
    {
        path: 'trans',
        component: TransListComponent
    },
    {
        path: 'mining',
        component: MiningListComponent
    },
    {
        path: 'send',
        component: CreateSendComponent
    },
    {
        path: 'balance',
        component: WalletDetailsComponent
    },
    {
        path: 'afterLogin',
        redirectTo: 'balance', 
        pathMatch: 'full'
    }
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class WalletRoutingModule {
}

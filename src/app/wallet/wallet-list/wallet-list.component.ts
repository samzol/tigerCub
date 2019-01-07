import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Wallet } from '../../shared/models/wallet.model';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.scss']
})
export class WalletListComponent implements OnInit {
  model : any = {};
  wallets : Wallet[];
  error: string;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getWallets().subscribe(
      wallets => {
        this.wallets = wallets;
      },
      error => {
        this.error = <any>error
        console.log(error);
      });
  }

  onSubmit() {
    if (this.model.walletAddress) {
      localStorage.setItem('currentWallet', JSON.stringify(this.model.walletAddress));
      this.router.navigate(["balance"]);
    }
  }

}

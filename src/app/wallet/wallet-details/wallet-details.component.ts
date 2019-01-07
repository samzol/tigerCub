import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Wallet } from '../../shared/models/wallet.model';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-wallet-details',
  templateUrl: './wallet-details.component.html',
  styleUrls: ['./wallet-details.component.scss']
})
export class WalletDetailsComponent implements OnInit {
  wallet : any = {};
  error: string;
  currentWallet: any;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public dataService: DataService
  ) { }

  ngOnInit() {
    this.currentWallet = JSON.parse(localStorage.getItem('currentWallet'));

    this.dataService.getWallets().subscribe(
      wallets => {
        let temps = [];

        wallets.forEach( rec => {
          let searchFields = rec.address;
          if( searchFields.toLowerCase().includes(this.currentWallet)) {
            temps.push(rec);
          }
        });
        if (temps.length > 0) {
          this.wallet = temps[0];
        }
        console.log(wallets);
      },
      error => {
        this.error = <any>error
        console.log(error);
      });
  }
}

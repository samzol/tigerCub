import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Trans } from '../../shared/models/trans.model';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-create-send',
  templateUrl: './create-send.component.html',
  styleUrls: ['./create-send.component.scss']
})
export class CreateSendComponent implements OnInit {
  model : any = {};
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

  onSubmit() {
    console.log(this.model.toAddress);
    console.log(this.model.amount);

    if (this.model.toAddress && this.model.amount) {
      let trans = new Trans();
      trans.from = this.wallet.address;
      trans.to = this.model.toAddress;
      trans.amount = this.model.amount;
      trans.timestamp = Date.now();
      trans.type = 'Send';
      this.dataService.postTrans(trans).subscribe();

      this.router.navigate(["balance"]);
    }
  }

}

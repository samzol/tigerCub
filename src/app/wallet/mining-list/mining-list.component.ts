import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Trans } from '../../shared/models/trans.model';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-mining-list',
  templateUrl: './mining-list.component.html',
  styleUrls: ['./mining-list.component.scss']
})
export class MiningListComponent implements OnInit {
  model: any = {};
  trans: Trans[];
  error: string;
  currentWallet: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {
    this.trans = [];
  }

  ngOnInit() {
    this.currentWallet = JSON.parse(localStorage.getItem('currentWallet'));

    this.initApps();
  }

  initApps() {
    this.dataService.getTrans().subscribe(
      trans => {
        this.trans = [];
        trans.forEach( rec => {
          let searchFields = rec.type + ' ' + rec.to;
          if( searchFields.toLowerCase().includes('mining')) {
            this.trans.push(rec);
          }
        });
      },
      error => {
        this.error = <any> error;
        console.log(error);
      });
  }

  onMine() {
    this.dataService.getMine(this.currentWallet).subscribe();
    this.initApps();
  }
}

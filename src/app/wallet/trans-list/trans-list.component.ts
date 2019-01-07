import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Trans } from '../../shared/models/trans.model';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-trans-list',
  templateUrl: './trans-list.component.html',
  styleUrls: ['./trans-list.component.scss']
})
export class TransListComponent implements OnInit {
  model: any = {};
  trans: Trans[];
  error: string;
  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {
    this.trans = [];
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.initApps();
  }

  initApps() {
    this.dataService.getTrans().subscribe(
      trans => {
        this.trans = trans;
        console.log(trans);
      },
      error => {
        this.error = <any> error;
        console.log(error);
      });
  }
}

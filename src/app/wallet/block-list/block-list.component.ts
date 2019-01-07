import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Block } from '../../shared/models/block.model';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.scss']
})
export class BlockListComponent implements OnInit {
  model: any = {};
  blocks: Block[];
  error: string;
  currentWallet: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {
    this.blocks = [];
  }

  ngOnInit() {
    this.currentWallet = JSON.parse(localStorage.getItem('currentWallet'));

    this.initApps();
  }

  initApps() {
    this.dataService.getBlocks().subscribe(
      blocks => {
        this.blocks = blocks;
      },
      error => {
        this.error = <any> error;
        console.log(error);
      });
  }

}

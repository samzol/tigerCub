import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentWallet : any = {};

    constructor(
    ) { }

    ngOnInit() { 
        this.currentWallet = JSON.parse(localStorage.getItem('currentWallet'));
    }
}

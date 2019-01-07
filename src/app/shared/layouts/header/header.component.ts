import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    currentWallet : any = {};

    constructor(
        public router: Router
    ) { }

    ngOnInit() { 
        this.currentWallet = JSON.parse(localStorage.getItem('currentWallet'));
    }

    onLogout() {
        console.log('Logged Out');
        localStorage.removeItem('currentWallet');
        this.currentWallet = null;
        this.router.navigate(['wallets'],);
    }
}

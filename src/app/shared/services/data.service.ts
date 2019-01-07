import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Block } from '../models/block.model';
import { Trans } from '../models/trans.model';
import { Wallet } from '../models/wallet.model';


@Injectable()
export class DataService {
    error: string;

    headers: Headers;
    readonly SERVER_URL = 'http://localhost:3000';

    constructor(private http: HttpClient) {
        this.headers = new Headers(
            {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
        );
    }
    
    getWallets() : Observable<Wallet[]> {
        return this.http.get<Wallet[]>(this.SERVER_URL + '/wallets');
    }

    getBlocks() : Observable<Block[]> {
        return this.http.get<Block[]>(this.SERVER_URL + '/blocks');
    }

    getMine(address: string) : Observable<Trans[]> {
        return this.http.get<Trans[]>(this.SERVER_URL + '/mine?address=' + address);
    }

    getTrans() : Observable<Trans[]> {
        return this.http.get<Trans[]>(this.SERVER_URL + '/trans');
    }

    postTrans(trans: Trans) : Observable<Trans> {
        let body = new HttpParams();
        body = body.set('type', trans.type);
        body = body.set('from', trans.from);
        body = body.set('to', trans.to);
        body = body.set('amount', String(trans.amount));
        body = body.set('timestamp', String(trans.timestamp));
        return this.http.post<Trans>(this.SERVER_URL + '/trans', body);
    }

}

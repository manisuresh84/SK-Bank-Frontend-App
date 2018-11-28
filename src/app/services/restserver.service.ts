import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserInfoModel } from "../model/userinfo.model";
import { PerformTransactionModel } from "../model/performtranaction.model";

import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";

@Injectable()
export class RestServerService{
    constructor(private httpService : Http, private httpClientService : HttpClient){}

    storeUser(user : UserInfoModel){
        const customHeaders = new Headers({
            // 'Access-Control-Allow-Origin':'*',
            // 'Content-Type':'application/json',
            'Accept':'application/json'
        });
        
        return this.httpService.post('http://localhost:8080/bankmanagement/api/users', 
        user,{headers: customHeaders});
        //  return this.httpService.
        //  post('http://localhost:8080/bankmanagement/api/users',
        //  user);
    }

    getUsers(){
        return this.httpService.get('http://localhost:8080/bankmanagement/api/users')
        .map(
            (response : Response) => {
                const data = response.json();
                // for(const userData of data){
                //     userData.sno =  1;
                //     console.log("S.No :" + userData.sno);
                // }
                return data;
            }
        )
        .catch(
            (error: Response) => {
                return Observable.throw('Something went wrong!');
            }
        );
    }

    getUser(accNo : string){
        return this.httpService.get('http://localhost:8080/bankmanagement/api/users/' + accNo);
    }

    getTransaction(transNo: string){
        return this.httpService.get('http://localhost:8080/bankmanagement/api/customtransaction/' + transNo);        
    }

    getTransactionsByAccNo(accNo : string){
        return this.httpService.get('http://localhost:8080/bankmanagement/api/customtransactions/' + accNo);
    }

    performTransaction(accNo: string, transDetail : PerformTransactionModel){
        console.log("Account Number :" + accNo);
        console.log("Transaction Detail - Transaction Type [" + transDetail.transactionType +"]");
        console.log("Transaction Detail - Transaction Desc [" + transDetail.transactionDescription +"]");
        console.log("Transaction Detail - Transaction Amount [" + transDetail.transactionAmount +"]");
         return this.httpService.
         post('http://localhost:8080/bankmanagement/api/performtransaction/' + accNo,
         transDetail);
    }
}
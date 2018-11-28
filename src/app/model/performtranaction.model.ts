export class PerformTransactionModel{
    constructor(public transactionType : string, 
        public transactionDescription : string, 
        public transactionAmount : number){}
}
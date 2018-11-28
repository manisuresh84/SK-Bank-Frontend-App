export class TransactionDetailModel {
    constructor(public accountNumber: string, public transactionId: string, 
        public transactionDescription: string, public transactionType: string, 
        public transactionAmount: number) {

    }
}
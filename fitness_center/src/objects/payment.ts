import PaymentMethod from "./paymentMethod";

export default class Payment {
    constructor(id: number, amount: number, paymentMethod: PaymentMethod, date: Date = new Date()) {
        this.id = id;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
        this.date = date;
    };
    id: number;
    amount: number;
    paymentMethod: PaymentMethod;
    date: Date;
}
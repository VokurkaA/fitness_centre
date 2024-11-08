import Payment from "./payment";

export default class Membership {
    private static Id = -1;
    public static getId(){
        this.Id++;
        return this.Id;
    }
    constructor(name: string, price: number) {
        this.id = Membership.getId();
        this.name = name;
        this.price = price;
        this.payment = null;
    };
    id: number;
    name: string;
    price: number;
    payment: Payment | null;
}
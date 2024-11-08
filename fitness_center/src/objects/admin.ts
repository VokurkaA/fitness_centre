import Member from "./member";
import Person from "./person";

export default class Admin extends Person {
    private static Id = -1;
    public static getId() {
        this.Id++;
        return this.Id;
    }
    constructor(name: string, email: string) {
        super(Admin.getId(), name, email);
    };
    public GetReport(members: Member[]): Member[] {
        return members;
    }
}
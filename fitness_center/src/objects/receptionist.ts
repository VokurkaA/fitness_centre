import Member from "./member";
import Person from "./person";

export default class Receptionist extends Person {
    private static Id = -1;
    public static getId() {
        this.Id++;
        return this.Id;
    }
    constructor(name: string, email: string) {
        super(Receptionist.getId(), name, email);
    };
    public RegisterNewMember(member: Member): Member {
        return member;
    }
}
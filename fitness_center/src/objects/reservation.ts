import Member from "./member";
import Lesson from "./lesson";
export default class Reservation {
    constructor(member: Member, lesson: Lesson) {
        this.member = member;
        this.lesson = lesson;
        this.date = new Date();
        this.checkedIn = false;
    }
    member: Member;
    lesson: Lesson;
    date: Date;
    checkedIn: boolean;
}
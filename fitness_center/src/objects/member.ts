import Person from "./person";
import Payment from "./payment";
import Membership from "./membership";
import Reservation from "./reservation";

export default class Member extends Person {
    private static Id = -1;
    public static getId() {
        this.Id++;
        return this.Id;
    }
    constructor(name: string, email: string, membership: Membership) {
        super(Member.getId(), name, email);
        this.membership = membership;
        this.reservations = [];
    };
    public membership: Membership;
    private reservations: Reservation[];
    public ReserveLesson(reservation: Reservation): void {
        if (!this.membership)
            throw new Error("Membership not payed for yet.");
        this.reservations.push(reservation);
        console.log('Member ' + this.name + ' made a reservation to ' + reservation.lesson.name);
    }

    public CheckIn(reservation: Reservation): void {
        reservation.checkedIn = true;
        this.reservations.splice(this.reservations.indexOf(reservation), 1);
        console.log('Member ' + this.name + ' has checked in to ' + reservation.lesson.name);
    }

    public ChangeMembershipType(newMembership: Membership): void {
        const oldMembership = this.membership;
        this.membership = newMembership;
        console.log('Member ' + this.name + ' has changed membership from ' + oldMembership.name + ' to ' + newMembership.name);
    }

    public PayForMembership(payment: Payment): void {
        if (this.membership.price > payment.amount)
            throw new Error("Insufficient payment.");
        this.membership.payment = payment;
        console.log('Member ' + this.name + ' payed for membership.');
    }

    public ShowLessonTimetable(): string {
        if (this.reservations.length === 0)
            return 'No reservations at the moment.';
        return '----------\nSchedule:\n' + this.reservations
            .sort((a, b) => a.lesson.date.getTime() - b.lesson.date.getTime())
            .map(r => `${r.lesson.name} | ${r.lesson.date.getDate()}.${r.lesson.date.getMonth()} ${r.lesson.date.getHours()}:${r.lesson.date.getMinutes()}`)
            .join('\n') + '\n----------';
    }

    public GetReservations(index: number): Reservation {
        return this.reservations[index];
    }
}
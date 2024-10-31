class Person {
    constructor(id: number, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    };
    protected id: number;
    protected name: string;
    protected email: string;
}
class Admin extends Person {
    constructor(id: number, name: string, email: string) {
        super(id, name, email);
    };
    public GetReport(members: Member[]): Member[] {
        return members;
    }
}
class Receptionist extends Person {
    constructor(id: number, name: string, email: string) {
        super(id, name, email);
    };
    public RegisterNewMember(member: Member): Member {
        return member;
    }
}
class Trainer extends Person {
    private trainingPlans: TrainingPlan[];
    constructor(id: number, name: string, email: string) {
        super(id, name, email);
        this.trainingPlans = [];
    }
    public addTrainingPlan(trainingPlan: TrainingPlan): void {
        this.trainingPlans.push(trainingPlan);
        console.log('Training plan ' + trainingPlan.name + ' added.')
    };
}
class Member extends Person {
    constructor(id: number, name: string, email: string, membership: Membership) {
        super(id, name, email);
        this.membership = membership;
        this.reservations = [];
    };
    private membership: Membership;
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

class Lesson {
    constructor(id: number, name: string, trainer: Trainer, date: Date) {
        this.id = id;
        this.name = name;
        this.trainer = trainer;
        this.reservations = [];
        this.date = date;
    }
    id: number;
    name: string;
    trainer: Trainer;
    reservations: Reservation[];
    date: Date;
    addReservation(reservation: Reservation) {
        this.reservations.push(reservation);
    }
}
class Reservation {
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

class Membership {
    constructor(id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.payment = null;
    };
    id: number;
    name: string;
    price: number;
    payment: Payment | null;
}

class Payment {
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

enum PaymentMethod {
    Cash,
    Card,
    BankTransfer,
    Crypto,
    Voucher
}

class TrainingPlan {
    constructor(id: number, name: string, duration: Date) {
        this.id = id;
        this.name = name;
        this.duration = duration;
    };
    id: number;
    name: string;
    duration: Date;
}

const memberships = [
    new Membership(0, 'One time', 200),
    new Membership(1, 'One week', 500),
    new Membership(2, 'One month', 1500),
    new Membership(3, 'Three months', 4000),
    new Membership(4, 'Six months', 7500),
    new Membership(5, 'One year', 10000)
];

const admin = new Admin(0, 'John \"admin\" doe', 'admin@fitness.com');
const receptionist = new Receptionist(0, 'Lily Stark', 'lili@fitness.com');
const trainers = [
    new Trainer(0, 'trainer1', 'trainer1@fitness.com'),
    new Trainer(1, 'trainer2', 'trainer2@fitness.com'),
    new Trainer(2, 'trainer3', 'trainer3@fitness.com')
];
const members = [
    new Member(0, 'member1', 'member1@fitness.com', { ...memberships[0] }),
    new Member(1, 'member2', 'member2@fitness.com', { ...memberships[1] }),
    new Member(2, 'member3', 'member3@fitness.com', { ...memberships[2] })
];

const lessons = [
    new Lesson(0, 'Swimming', trainers[0], new Date('August 19, 2024 23:15')),
    new Lesson(1, 'Dancing', trainers[1], new Date('July 14, 2023 12:30')),
    new Lesson(1, 'Running', trainers[2], new Date('June 7, 2022 10:45'))
];

let member = members[0];
member.PayForMembership(new Payment(0, 250, PaymentMethod.Cash));
member.ReserveLesson(new Reservation(member, lessons[0]));
member.ReserveLesson(new Reservation(member, lessons[2]));
console.log(member.ShowLessonTimetable());
member.CheckIn(member.GetReservations(0));
member.ChangeMembershipType({ ...memberships[1] });
member.PayForMembership(new Payment(1, 500, PaymentMethod.Card));
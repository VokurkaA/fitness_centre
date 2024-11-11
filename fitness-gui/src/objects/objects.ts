export class Person {
    public id;
    public name;
    public email;
  
    constructor(id: number, name: string, email: string) {
      this.id = id;
      this.name = name;
      this.email = email;
    }
  }
  export class Receptionist extends Person {
    constructor(id: number, name: string, email: string) {
      super(id, name, email);
    };
    public RegisterNewMember(member: Member): Member {
      return member;
    }
  }
  export class TrainingPlan {
    constructor(id: number, name: string, duration: Date) {
      this.id = id;
      this.name = name;
      this.duration = duration;
    };
    id: number;
    name: string;
    duration: Date;
  }
  
  export class Trainer extends Person {
    public trainingPlans: TrainingPlan[];
    constructor(id: number, name: string, email: string) {
      super(id, name, email);
      this.trainingPlans = [];
    }
  
    addTrainingPlan(trainingPlan: TrainingPlan) {
      this.trainingPlans.push(trainingPlan);
      console.log('Training plan ' + trainingPlan.name + ' added.');
    }
  }
  
  export class Member extends Person {
    public membership: Membership;
    public reservations: Reservation[];
    constructor(id: number, name: string, email: string, membership: Membership) {
      super(id, name, email);
      this.membership = membership;
      this.reservations = [];
    }
  
    ReserveLesson(reservation: Reservation) {
      if (!this.membership?.payment)
        throw new Error("Membership not payed for yet.");
      this.reservations.push(reservation);
      console.log('Member ' + this.name + ' made a reservation to ' + reservation.lesson.name);
    }
  
    CheckIn(reservation: Reservation) {
      reservation.checkedIn = true;
      this.reservations.splice(this.reservations.indexOf(reservation), 1);
      console.log('Member ' + this.name + ' has checked in to ' + reservation.lesson.name);
    }
  
    ChangeMembershipType(newMembership: Membership) {
      const oldMembership = this.membership;
      this.membership = newMembership;
      console.log('Member ' + this.name + ' has changed membership from ' + oldMembership.name + ' to ' + newMembership.name);
    }
  
    PayForMembership(payment: Payment) {
      if (this.membership.price > payment.amount)
        throw new Error("Insufficient payment.");
      this.membership.payment = payment;
      console.log('Member ' + this.name + ' payed for membership.');
    }
  
    ShowLessonTimetable() {
      if (this.reservations.length === 0)
        return 'No reservations at the moment.';
      return '----------\nSchedule:\n' + this.reservations
        .sort((a, b) => a.lesson.date.getTime() - b.lesson.date.getTime())
        .map(r => `${r.lesson.name} | ${r.lesson.date.getDate()}.${r.lesson.date.getMonth()} ${r.lesson.date.getHours()}:${r.lesson.date.getMinutes()}`)
        .join('\n') + '\n----------';
    }
  
    GetReservations(index: number) {
      return this.reservations[index];
    }
  }
  
  export class Lesson {
    public id: number;
    public name: string;
    public trainer: Trainer;
    public reservations: Reservation[];
    public date: Date;
    constructor(id: number, name: string, trainer: Trainer, date: Date) {
      this.id = id;
      this.name = name;
      this.trainer = trainer;
      this.reservations = [];
      this.date = date;
    }
  
    addReservation(reservation: Reservation) {
      this.reservations.push(reservation);
    }
  }
  
  export class Reservation {
    public member: Member;
    public lesson: Lesson;
    public date: Date;
    public checkedIn: boolean;
    constructor(member: Member, lesson: Lesson) {
      this.member = member;
      this.lesson = lesson;
      this.date = new Date();
      this.checkedIn = false;
    }
  }
  
  export class Membership {
    public id: number;
    public name: string;
    public price: number;
    public payment: Payment | null;
    constructor(id: number, name: string, price: number) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.payment = null;
    }
  }
  
  export enum PaymentMethod {
    Cash,
    Card,
    BankTransfer,
    Crypto,
    Voucher
  };
  
  export class Payment {
    public id: number;
    public amount: number;
    public date: Date;
    public paymentMethod: PaymentMethod;
    constructor(id: number, amount: number, paymentMethod: PaymentMethod, date = new Date()) {
      this.id = id;
      this.amount = amount;
      this.paymentMethod = paymentMethod;
      this.date = date;
    }
  }
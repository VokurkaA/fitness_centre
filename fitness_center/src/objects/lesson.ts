import Reservation from "./reservation";
import Trainer from "./trainer";
export default class Lesson {
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
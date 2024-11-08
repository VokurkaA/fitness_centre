export default class TrainingPlan {
    constructor(id: number, name: string, duration: Date) {
        this.id = id;
        this.name = name;
        this.duration = duration;
    };
    id: number;
    name: string;
    duration: Date;
}
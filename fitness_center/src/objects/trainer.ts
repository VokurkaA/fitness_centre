import Person from "./person";
import TrainingPlan from "./trainingPlan";
export default class Trainer extends Person {
    private static Id = -1;
    public static getId() {
        this.Id++;
        return this.Id;
    }
    private trainingPlans: TrainingPlan[];
    constructor(name: string, email: string) {
        super(Trainer.getId(), name, email);
        this.trainingPlans = [];
    }
    public addTrainingPlan(trainingPlan: TrainingPlan): void {
        this.trainingPlans.push(trainingPlan);
        console.log('Training plan ' + trainingPlan.name + ' added.')
    };
}
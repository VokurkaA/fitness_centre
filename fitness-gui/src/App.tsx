import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, UserPlus, Calendar, DollarSign, Activity } from 'lucide-react';

// Class definitions
class Person {
  public id;
  public name;
  public email;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
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

class Trainer extends Person {
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

class Member extends Person {
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

class Lesson {
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

class Reservation {
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

class Membership {
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

enum PaymentMethod {
  Cash,
  Card,
  BankTransfer,
  Crypto,
  Voucher
};

class Payment {
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


// Initialize memberships
const memberships = [
  new Membership(0, 'One time', 200),
  new Membership(1, 'One week', 500),
  new Membership(2, 'One month', 1500),
  new Membership(3, 'Three months', 4000),
  new Membership(4, 'Six months', 7500),
  new Membership(5, 'One year', 10000)
];

// Initialize sample payment for members
const samplePayment = new Payment(1, 4000, PaymentMethod.Card);

const Dashboard = () => {
  // Sample data
  const [members, setMembers] = useState([
    new Member(1, "John Doe", "john@example.com", memberships[2]),
    new Member(2, "Jane Smith", "jane@example.com", memberships[3])
  ]);

  // Add sample payments to members
  members.forEach(member => {
    member.PayForMembership(samplePayment);
  });

  const trainer = new Trainer(1, "Mike Johnson", "mike@example.com");

  const [lessons] = useState([
    new Lesson(1, "Yoga Class", trainer, new Date(2024, 10, 12, 10, 0)),
    new Lesson(2, "HIIT Training", trainer, new Date(2024, 10, 12, 14, 0)),
    new Lesson(3, "Strength Training", trainer, new Date(2024, 10, 13, 11, 0))
  ]);

  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [selectedMembership, setSelectedMembership] = useState("");

  const handleAddMember = () => {
    if (newMemberName && newMemberEmail && selectedMembership) {
      const membership = memberships[parseInt(selectedMembership)];
      const newMember = new Member(members.length + 1, newMemberName, newMemberEmail, membership);
      // Add sample payment to new member
      newMember.PayForMembership(samplePayment);
      setMembers([...members, newMember]);
      setNewMemberName("");
      setNewMemberEmail("");
      setSelectedMembership("");
    }
  };

  const handleReserveLesson = (member: Member, lesson: Lesson) => {
    try {
      const reservation = new Reservation(member, lesson);
      member.ReserveLesson(reservation);
      lesson.addReservation(reservation);
      setMembers([...members]); // Force re-render
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        alert(error.message);
      } else {
        console.error("An unknown error occurred");
        alert("An unknown error occurred");
      }
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto select-none">
      <h1 className="text-3xl font-bold mb-6">Gym Management Dashboard</h1>

      <Tabs defaultValue="members" className="w-full">
        <TabsList>
          <TabsTrigger value="members" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Members
          </TabsTrigger>
          <TabsTrigger value="new-member" className="flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            New Member
          </TabsTrigger>
          <TabsTrigger value="lessons" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Lessons
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {members.map(member => (
              <Card key={member.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{member.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-2">{member.email}</p>
                  <p className="text-sm text-gray-500 mb-2">Membership: {member.membership.name}</p>
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Upcoming Lessons:</h3>
                    <div className="whitespace-pre-wrap font-mono text-sm">
                      {member.ShowLessonTimetable()}
                    </div>
                  </div>
                  <Button
                    className="mt-4"
                    onClick={() => setSelectedMember(member)}
                  >
                    {selectedMember?.id === member.id ? 'Selected' : 'Select Member'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="new-member">
          <Card>
            <CardHeader>
              <CardTitle>Add New Member</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <Input
                  placeholder="Name"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                />
                <Select value={selectedMembership} onValueChange={setSelectedMembership}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select membership type" />
                  </SelectTrigger>
                  <SelectContent>
                    {memberships.map((membership, index) => (
                      <SelectItem key={membership.id} value={index.toString()}>
                        {membership.name} - ${membership.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleAddMember}>Add Member</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lessons">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lessons.map(lesson => (
              <Card key={lesson.id}>
                <CardHeader>
                  <CardTitle>{lesson.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-2">
                    {lesson.date.toLocaleString()}
                  </p>
                  <p className="text-sm mb-4">
                    Trainer: {lesson.trainer.name}
                  </p>
                  <p className="text-sm mb-4">
                    Reservations: {lesson.reservations.length}
                  </p>
                  {selectedMember && (
                    <Button
                      onClick={() => handleReserveLesson(selectedMember, lesson)}
                      className="w-full"
                    >
                      Reserve Lesson
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{members.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Lessons</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lessons.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${members.reduce((acc, member) => acc + member.membership.price, 0)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
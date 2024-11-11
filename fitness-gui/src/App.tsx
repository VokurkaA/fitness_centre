import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Calendar, DollarSign, Activity, Kanban, ConciergeBell, PersonStanding, Moon, Sun } from 'lucide-react';
import { Membership, Payment, PaymentMethod, Member, Receptionist, Trainer, Lesson, Reservation } from './objects/objects';
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
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('darkMode', newMode.toString());
      return newMode;
    });
  };
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);
  // Sample data
  const [members, setMembers] = useState([
    new Member(1, "John Doe", "john@example.com", memberships[2]),
    new Member(2, "Jane Smith", "jane@example.com", memberships[3])
  ]);

  members.forEach(member => {
    member.PayForMembership(samplePayment);
  });

  const [receptionists, setReceptionists] = useState([
    new Receptionist(1, "John Doe", "john@example.com"),
    new Receptionist(2, "Jane Smith", "jane@example.com")
  ]);

  const [trainers, setTrainers] = useState([
    new Trainer(1, "John Doe", "john@example.com"),
    new Trainer(2, "Jane Smith", "jane@example.com")
  ]);
  const [lessons] = useState([
    new Lesson(1, "Yoga Class", trainers[0], new Date(2024, 10, 12, 10, 0)),
    new Lesson(2, "HIIT Training", trainers[1], new Date(2024, 10, 12, 14, 0)),
    new Lesson(3, "Strength Training", trainers[1], new Date(2024, 10, 13, 11, 0))
  ]);

  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [selectedMembership, setSelectedMembership] = useState("");

  const [newReceptionistName, setNewReceptionistName] = useState("");
  const [newReceptionistEmail, setNewReceptionistEmail] = useState("");

  const [newTrainerName, setNewTrainerName] = useState("");
  const [newTrainerEmail, setNewTrainerEmail] = useState("");

  const handleAddReceptionist = () => {
    if (newReceptionistName && newReceptionistEmail) {
      const newReceptionist = new Receptionist(receptionists.length + 1, newReceptionistName, newReceptionistEmail);
      setReceptionists([...receptionists, newReceptionist]);
      setNewReceptionistName("");
      setNewReceptionistEmail("");
    }
  };

  const handleAddTrainer = () => {
    if (newTrainerName && newTrainerEmail) {
      const newTrainer = new Trainer(trainers.length + 1, newTrainerName, newTrainerEmail);
      setTrainers([...trainers, newTrainer]);
      setNewTrainerName("");
      setNewTrainerEmail("");
    }
  };

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
    <div className='select-none h-svh w-screen dark:bg-black dark:text-white'>
      <Button onClick={toggleDarkMode}>
        {isDarkMode ? <Moon /> : <Sun />}
      </Button>
      <div className="p-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Gym Management Dashboard</h1>
        <Tabs defaultValue="overview" className="w-full">

          <TabsList>
            <TabsTrigger value='overview' className='flex items-center gap-2'>
              <Kanban className='w-4 h-4' />
              Overview
            </TabsTrigger>
            <TabsTrigger value="members" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Members
            </TabsTrigger>
            <TabsTrigger value="trainers" className="flex items-center gap-2">
              <PersonStanding className="w-4 h-4" />
              Trainers
            </TabsTrigger>
            <TabsTrigger value="receptionists" className="flex items-center gap-2">
              <ConciergeBell className="w-4 h-4" />
              Receptionists
            </TabsTrigger>
            <TabsTrigger value="lessons" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Lessons
            </TabsTrigger>
          </TabsList>

          <TabsContent value='overview'>
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
          </TabsContent>

          <TabsContent value="members">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      onClick={() => selectedMember === member ? setSelectedMember(null) : setSelectedMember(member)}
                    >
                      {selectedMember?.id === member.id ? 'Selected' : 'Select Member'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trainers">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Trainer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <Input
                      placeholder="Name"
                      value={newTrainerName}
                      onChange={(e) => setNewTrainerName(e.target.value)}
                    />
                    <Input
                      placeholder="Email"
                      type="email"
                      value={newTrainerEmail}
                      onChange={(e) => setNewTrainerEmail(e.target.value)}
                    />
                    <Button onClick={handleAddTrainer}>Add Trainer</Button>
                  </div>
                </CardContent>
              </Card>
              {trainers.map(trainer => (
                <Card key={trainer.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{trainer.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-2">{trainer.email}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="receptionists">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
                <CardHeader>
                  <CardTitle>Add New Receptionist</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <Input
                      placeholder="Name"
                      value={newReceptionistName}
                      onChange={(e) => setNewReceptionistName(e.target.value)}
                    />
                    <Input
                      placeholder="Email"
                      type="email"
                      value={newReceptionistEmail}
                      onChange={(e) => setNewReceptionistEmail(e.target.value)}
                    />
                    <Button onClick={handleAddReceptionist}>Add Receptionist</Button>
                  </div>
                </CardContent>
              </Card>
              {receptionists.map(receptionist => (
                <Card key={receptionist.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{receptionist.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-2">{receptionist.email}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
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
      </div>
    </div>
  );
};

export default Dashboard;
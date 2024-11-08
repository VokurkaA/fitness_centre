import { useState } from "react";
import Admin from "./objects/admin";
import Trainer from "./objects/trainer";
import Member from "./objects/member";
import Receptionist from "./objects/receptionist";
import FitnessCenter from "./objects/fitnessCenter";
import MembershipType from "./objects/membershipType";

export default function Employees() {
    const [admin] = useState(new Admin('Mikuláš', 'mikulas@admin.com'));

    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [newTrainer, setNewTrainer] = useState(new Trainer('', ''));

    const [receptionists, setReceptionists] = useState<Receptionist[]>([]);
    const [newReceptionist, setNewReceptionist] = useState(new Receptionist('', ''));

    const [members, setMembers] = useState<Member[]>([]);
    const [newMember, setNewMember] = useState<Member>(new Member('', '', FitnessCenter.getMembership(MembershipType.OneMonth)));

    const addTrainer = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!trainers.some(trainer => trainer.email === newTrainer.email)) {
            setTrainers([...trainers, newTrainer]);
            setNewTrainer(new Trainer('', ''));
        }
    };

    const addReceptionist = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!receptionists.some(receptionist => receptionist.email === newReceptionist.email)) {
            setReceptionists([...receptionists, newReceptionist]);
            setNewReceptionist(new Receptionist('', ''));
        }
    };

    const addMember = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!members.some(member => member.email === newMember.email)) {
            setMembers([...members, newMember]);
            setNewMember(new Member('', '', FitnessCenter.getMembership(MembershipType.OneMonth)));
        }
    };

    return (
        <div>
            <div className="mediaBlock">
                <h2>Admin</h2>
                <p>Name: {admin.name}</p>
                <p>Email: {admin.email}</p>
            </div>
            <div className="mediaBlock">
                <h2>Trainers</h2>
                <form onSubmit={addTrainer}>
                    <label>
                        <span>Full name</span>
                        <input
                            required
                            type="text"
                            value={newTrainer.name}
                            onChange={e => setNewTrainer(new Trainer(e.target.value.trim(), newTrainer.email))}
                        />
                    </label>
                    <label>
                        <span>Email</span>
                        <input
                            required
                            type="email"
                            value={newTrainer.email}
                            onChange={e => setNewTrainer(new Trainer(newTrainer.name, e.target.value.trim()))}
                        />
                    </label>
                    <button type="submit">Add Trainer</button>
                </form>

                {trainers.length > 0 ? (
                    trainers.map(trainer => (
                        <p key={trainer.email}>{trainer.name} - {trainer.email}</p>
                    ))
                ) : (
                    <p>No trainers available</p>
                )}
            </div>
            <div className="mediaBlock">
                <h2>Receptionists</h2>
                <form onSubmit={addReceptionist}>
                    <label>
                        <span>Full name</span>
                        <input
                            required
                            type="text"
                            value={newReceptionist.name}
                            onChange={e => setNewReceptionist(new Receptionist(e.target.value.trim(), newReceptionist.email))}
                        />
                    </label>
                    <label>
                        <span>Email</span>
                        <input
                            required
                            type="email"
                            value={newReceptionist.email}
                            onChange={e => setNewReceptionist(new Receptionist(newReceptionist.name, e.target.value.trim()))}
                        />
                    </label>
                    <button type="submit">Add Receptionist</button>
                </form>

                {receptionists.length > 0 ? (
                    receptionists.map(receptionist => (
                        <p key={receptionist.email}>{receptionist.name} - {receptionist.email}</p>
                    ))
                ) : (
                    <p>No receptionists available</p>
                )}
            </div>
            <div className="mediaBlock">
                <h2>Members</h2>
                <form onSubmit={addMember}>
                    <label>
                        <span>Full name</span>
                        <input
                            type="text"
                            required
                            value={newMember.name}
                            onChange={e => setNewMember(
                                new Member(e.target.value.trim(), newMember.email, newMember.membership)
                            )}
                        />
                    </label>
                    <label>
                        <span>Email</span>
                        <input
                            type="email"
                            required
                            value={newMember.email}
                            onChange={e => setNewMember(
                                new Member(newMember.name, e.target.value.trim(), newMember.membership)
                            )}
                        />
                    </label>
                    <label>
                        <span>Membership type</span>
                        <select
                            value={newMember.membership.name}
                            onChange={e => setNewMember(
                                new Member(newMember.name, newMember.email, FitnessCenter.getMembership(MembershipType[e.target.value as keyof typeof MembershipType]))
                            )}
                        >
                            {FitnessCenter.membershipsTypes.map(membership => (
                                <option key={membership.id} value={membership.name}>
                                    {membership.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button type="submit">Add a new member</button>
                </form>

                {members.length > 0 ? (
                    members.map(member => (
                        <p key={member.email}>{member.name} - {member.email}</p>
                    ))
                ) : (
                    <p>No current members</p>
                )}
            </div>
        </div>
    );
}

import Membership from './membership';
import MembershipType from './membershipType';

export default class FitnessCenter {
    public static membershipsTypes = [
        new Membership('One time', 200),
        new Membership('One week', 500),
        new Membership('One month', 1500),
        new Membership('Three months', 4000),
        new Membership('Six months', 7500),
        new Membership('One year', 10000)
    ];
    public static getMembership(membershipType: MembershipType) {
        switch (membershipType) {
            case MembershipType.OneTime: return this.membershipsTypes[0];
            case MembershipType.OneWeek: return this.membershipsTypes[1];
            case MembershipType.OneMonth: return this.membershipsTypes[2];
            case MembershipType.ThreeMonths: return this.membershipsTypes[3];
            case MembershipType.SixMonths: return this.membershipsTypes[4];
            case MembershipType.OneYear: return this.membershipsTypes[5];
            default:
                throw console.error('Invalid membership type.');
        }
    }
}
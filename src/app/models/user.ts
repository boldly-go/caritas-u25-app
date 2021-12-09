import { ConsultingType } from './users-data/consulting-type';

export class User {
    username: string;
    helpdesk: string;
    age: number;
    gender: number;
    state: number;

    constructor(username: string, consultingType: ConsultingType) {
        this.username = username;
        this.helpdesk =
            consultingType.agency.name + ', ' + consultingType.agency.postcode + ' ' + consultingType.agency.city;
        this.age = Number(consultingType.sessionData.age);
        this.gender = Number(consultingType.sessionData.gender);
        this.state = Number(consultingType.sessionData.state);
    }
}

import { ConsultingType } from './consulting-type';

export interface UserInfo {
    absenceMessage: string;
    absent: boolean;
    agencies: string;
    consultingTypes: {
        0: ConsultingType;
        1: ConsultingType;
        2: ConsultingType;
        3: ConsultingType;
        4: ConsultingType;
        5: ConsultingType;
        6: ConsultingType;
        7: ConsultingType;
        8: ConsultingType;
        9: ConsultingType;
        10: ConsultingType;
        11: ConsultingType;
        12: ConsultingType;
        13: ConsultingType;
        14: ConsultingType;
        15: ConsultingType;
        16: ConsultingType;
        17: ConsultingType;
        18: ConsultingType;
        19: ConsultingType;
        20: ConsultingType;
    };
    email: string;
    firstName: string;
    formalLanguage: boolean;
    grantedAuthorities: string[];
    inTeamAgency: boolean;
    lastName: string;
    userId: string;
    userName: string;
    userRoles: string[];
}

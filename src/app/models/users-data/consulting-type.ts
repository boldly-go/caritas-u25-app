interface SessionData {
    age: string;
    gender: string;
    state: string;
}

interface Agency {
    city: string;
    consultingType: number;
    description: string;
    id: number;
    name: string;
    offline: boolean;
    postcode: string;
    teamAgency: boolean;
}

export interface ConsultingType {
    sessionData: SessionData;
    isRegistered: boolean;
    agency: Agency;
}

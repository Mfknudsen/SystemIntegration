enum TrailerStatus{
    Booked,
    Free
}

export class Trailer{
    id: number;
    locationID: number;
    status: TrailerStatus;
    description: string;
}
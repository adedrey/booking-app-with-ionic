export interface Booking {
    _id?: string,
    placeId: string,
    placeImage: string,
    userId: string,
    placeTitle: string,
    guestNumber: number,
    first_name: string,
    last_name: string,
    bookedFrom: Date,
    bookedTo: Date,
    __v?: any
}
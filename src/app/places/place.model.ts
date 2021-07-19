export interface Place {
    _id?: string,
    title: string,
    description: string,
    imageUrl: string,
    price: number,
    availableFrom: Date,
    availableTo: Date,
    userId: string,
    __v?: any
}
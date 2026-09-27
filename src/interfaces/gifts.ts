export interface Gift {
    id: string
    name: string
    description: string
    cost: number
    picture: string
    link: string
    status: GiftStatus
}

export enum GiftStatus {
    Claimed = 'Claimed',
    NotClaimed = 'Not Claimed',
}
export type Person = {
    firstName: string
    lastName: string
}

export type WeddingConfigType = {
    people: {
        bride: Person
        groom: Person
    },
    date: {
        date: string
        time: string | undefined
        ceremonyTime: string
        receptionTime: string
    },
    location: {
        title: string
        address: string
        link: string
        latLng: string
    }
    calendar?: {
        url?: string
        location?: string
        details?: string
        endTime?: string
    }
    rsvp: {
        formUrl: string
    }
}

export type AdminConfigType = {
    email: string
}

export type ColourConfigType = {
    primary: string
    secondary: string
}
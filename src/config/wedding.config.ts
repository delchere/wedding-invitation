import { WeddingConfigType } from "@/interfaces/config"

const weddingConfig: WeddingConfigType = {
    people: {
        bride: { firstName: 'Delchere', lastName: '' },
        groom: { firstName: 'Ihechukwu', lastName: '' }
    },
    date: {
        date: '2027-01-09',
        time: '11:30',
        ceremonyTime: '11h30',
        receptionTime: '14h00'
    },
    location: {
        title: 'Cérémonie à l’église',
        address: 'Nigéria, Umuahia, Abia State',
        link: '#program',
        latLng: ''
    },
    calendar: {
        location: "All Saints' Anglican Church, World Bank Housing Estate, Umuahia, Nigeria",
        details: 'Religious wedding ceremony and reception — Delchere & Ihechukwu',
        endTime: '15:00',
    },
    rsvp: {
        formUrl:
            'https://docs.google.com/forms/d/e/1FAIpQLSeqdrEvyJqORdq3EqIWna6fEGRfB3mDN2ag-TPrvM8fASZSnQ/viewform',
    },
}

export default weddingConfig

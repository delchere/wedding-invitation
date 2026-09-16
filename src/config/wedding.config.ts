import { WeddingConfigType } from "@/interfaces/config"

const weddingConfig: WeddingConfigType = {
    people: {
        bride: { firstName: 'Delchere', lastName: '' },
        groom: { firstName: 'Ihechukwu', lastName: '' }
    },
    date: {
        date: '2027-01-09',
        time: undefined,
        ceremonyTime: '11h30',
        receptionTime: '14h00'
    },
    location: {
        title: 'Cérémonie à l’église',
        address: 'Nigéria, Umuahia, Abia State',
        link: '#wedding',
        latLng: ''
    }
}

export default weddingConfig

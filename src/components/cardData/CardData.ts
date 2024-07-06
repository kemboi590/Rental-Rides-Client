import lexus from '../../assets/images/landingPage/lexus.jpeg';
import audi from '../../assets/images/landingPage/audi.jpeg';
import mecedece from '../../assets/images/landingPage/mecedece.jpeg';
import mazda from '../../assets/images/landingPage/Mazda.jpeg';

type TcardData = {
    image: string;
    name: string;
    price: number;
}

export const CardData: TcardData[] = [
    {
        image: lexus,
        name: 'Lexus',
        price: 10000
    },
    {
        image: audi,
        name: 'Audi',
        price: 15000
    },
    {
        image: mecedece,
        name: 'Mercedes Benz',
        price: 20000
    },
    {
        image: mazda,
        name: 'Mazda',
        price: 8000
    }
]


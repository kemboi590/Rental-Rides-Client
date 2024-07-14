import { BookmarkPlus, Car, Album, TicketCheck, SquareUserRound,BadgeDollarSign  } from 'lucide-react';

type DrawerData = {
    id: number;
    name: string;
    icon?: undefined | any;
    link: string;
}

export const drawerData: DrawerData[] = [
    {
        id: 0,
        name: 'Vehicles',
        icon: Car,
        link: 'vehicles'
    },
    {
        id: 1,
        name: 'Payments',
        icon: BadgeDollarSign ,
        link: 'your-bookings'
    },
    {
        id: 2,
        name: 'Create Vehicle',
        icon: BookmarkPlus,
        link: 'create-vehicle'
    },
    {
        id: 3,
        name: 'All Bookings',
        icon: Album,
        link: 'allbookings'
    },
    {
        id: 4,
        name: 'Support Tickets',
        icon: TicketCheck,
        link: 'support-tickets'
    },
    {
        id: 5,
        name: 'Account',
        icon: SquareUserRound,
        link: 'account'
    }
];

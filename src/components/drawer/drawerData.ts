// This are side bar menu items
import { BookmarkPlus, Car, Album, TicketCheck, SquareUserRound } from 'lucide-react';

type DrawerData = {
    id: number;
    name: string;
    icon?: undefined | any;
    link: string; //to route to
}

export const drawerData: DrawerData[] = [
    {
        id: 1,
        name: 'Book Vehicle',
        icon: BookmarkPlus,
        link: 'book-vehicle'
    },
    {
        id: 2,
        name: 'More Vehicles',
        icon: Car,
        link: 'more-vehicles'
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
]
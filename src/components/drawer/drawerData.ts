// This are side bar menu items
import { BookmarkPlus, Car, Album, TicketCheck, SquareUserRound } from 'lucide-react';

type DrawerData = {
    id: number;
    name: string;
    icon?: undefined | any;
}

export const drawerData: DrawerData[] = [
    {
        id: 1,
        name: 'Book Vehicle',
        icon: BookmarkPlus
    },
    {
        id: 2,
        name: 'More Vehicles',
        icon: Car
    },
    {
        id: 3,
        name: 'Your Bookings',
        icon: Album
    },
    {
        id: 4,
        name: 'Support Tickets',
        icon: TicketCheck
    },
    {
        id: 5,
        name: 'Account',
        icon: SquareUserRound
    }
]
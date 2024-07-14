import { BookmarkPlus, Car, Album, TicketCheck, SquareUserRound, BadgeDollarSign } from 'lucide-react';

export type DrawerData = {
    id: number;
    name: string;
    icon?: undefined | any;
    link: string;
    adminOnly: boolean;
}
// adminOnly false - show to all users
// adminOnly true - show only to admins 
export const drawerData: DrawerData[] = [
    {
        id: 0,
        name: 'Vehicles',
        icon: Car,
        link: 'vehicles',
        adminOnly: false
    },
    {
        id: 1,
        name: 'Payments',
        icon: BadgeDollarSign,
        link: 'your-bookings',
        adminOnly: false
    },
    {
        id: 2,
        name: 'Create Vehicle',
        icon: BookmarkPlus,
        link: 'create-vehicle',
        adminOnly: true
    },
    {
        id: 3,
        name: 'All Bookings',
        icon: Album,
        link: 'allbookings',
        adminOnly: true
    },
    {
        id: 4,
        name: 'Support Tickets',
        icon: TicketCheck,
        link: 'support-tickets',
        adminOnly: true
    },
    {
        id: 5,
        name: 'Account',
        icon: SquareUserRound,
        link: 'account',
        adminOnly: true
    }
];


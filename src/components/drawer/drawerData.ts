import { BookmarkPlus, Car, Album, TicketCheck, SquareUserRound, BadgeDollarSign, NotebookPen, Ticket } from 'lucide-react';

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
        link: 'payments',
        adminOnly: false
    },
    {
        id: 3,
        name: 'My-bookings',
        icon: NotebookPen,
        link: 'mybookings',
        adminOnly: false
    },
    {
        id: 4,
        name: 'My-tickets',
        icon: Ticket,
        link: 'my-tickets',
        adminOnly: false
    },
    {
        id: 5,
        name: 'Manage Vehicles',
        icon: BookmarkPlus,
        link: 'manage-vehicles',
        adminOnly: true
    },
    {
        id: 6,
        name: 'All Bookings',
        icon: Album,
        link: 'allbookings',
        adminOnly: true
    },
    {
        id: 7,
        name: 'Support Tickets',
        icon: TicketCheck,
        link: 'support-tickets',
        adminOnly: true
    },
    {
        id: 8,
        name: 'Account',
        icon: SquareUserRound,
        link: 'account',
        adminOnly: true
    },
    {
        id: 2,
        name: 'Profile',
        icon: SquareUserRound,
        link: 'profile',
        adminOnly: false
    },
];


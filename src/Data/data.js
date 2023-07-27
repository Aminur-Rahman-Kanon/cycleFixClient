import safety from '../Assets/safety.jpg';
import fixie from '../Assets/single.jpg';
import fullService from '../Assets/fullService.jpg';
import brompton from '../Assets/brompton.jpg';

const priceList = [
    {
        h2: 'Safety Check',
        p: 'This is aimed at bicycles that have been stored for some time or if you have purchased a new bike that needs assembling from a box',
        price: '50',
        list: ['Frame & forks checked ', 'Wheels checked for damage & wear', 'Nuts & bolts are checked and tightened', 
               'Tyres are inflated to the correct pressure', ' Brakes adjusted', 'Gears adjusted'],
        img: safety
    },
    {
        h2: 'Single Speed Full Service',
        p: 'This service is tailored for single speed bicycles using only one gear',
        price: '80',
        list: ['Frame & forks checked ', 'Wheels trued', 'Nuts & bolts are checked and tightened', 
               'Tyres are inflated to the correct pressure', 'Components de-greased', 'Brake service', 'Hubs servicd',
                'Headset & BB serviced/replaced', 'Clean & Polish', 'Bar tape fitting'],
        img: fixie
    },
    {
        h2: 'Full Service',
        p: 'This service consists of the same quality of work from a general service, but with the exception of servicing the headset & bottom bracket',
        price: '130',
        list: ['Frame & forks checked ', 'Wheels trued', 'Nuts & bolts are checked and tightened', 'Tyres are inflated to the correct pressure',
                'Components de-greased', 'Brake service', 'Hydraulic disc brake bleeding', 'Hubs service', 'Gear Service', 'Mech hanger alignment',
                'Headset service', 'Bottom bracket service', 'Clean & Polish', 'Bar tape fitting', 'Additional labour cost if necessary'],
        img: fullService
    },
    {
        h2: 'Brompton Full Service',
        p: 'This service is specifically tailored for Brompton folding bicycles only',
        price: '180',
        list: ['Frame & forks checked ', 'Wheels trued', 'Nuts & bolts are checked and tightened', 'Tyres are inflated to the correct pressure',
                'Components de-greased', 'Brake service', 'Hubs serviced (If applicable)', 'Gear service', 'Headset adjusted', 'Bottom bracket adjusted/replaced',
                'Clean & polish', 'Additional labour cost if necessary'],
        img: brompton
    }
]

const xiaomiRepairPrice = [
    {repair: 'Brake adjustment', price: '10'}, {repair: 'Brake pads with fittings', price: '16'}, { repair: 'Brake cable replacement', price: '30'},
    {repair: 'Front wheel new inner tube replacement with fitting', price: '28'}, {repair: 'Rear wheel new inner tube replacement with fitting', price: '28'},
    {repair: 'Front wheel new inner tube & standard tyre', price: '43'}, {repair: 'Rear wheel new inner tube & standard tyre', price: '43'},
    {repair: 'Front wheel new solid tyre replacement', price: '40'}, {repair: 'Rear wheel new solid tyre replacement', price: '40'},
    {repair: 'Throttle replacement', price: '40'}, {repair: 'Rear mudguard with fitting', price: '20'}, {repair: 'Rear mudguard with fitting including brake light and wiring', price: '30'}
]

const mockUserLoggedInData = {
    email: 'test@test.com',
    firstName: 'Test',
    lastName: 'User',
    password: 'randomPassword123',
    user: 'Male',
    _id: '4023nuc482u4nuioj3408'
}

export { priceList, xiaomiRepairPrice, mockUserLoggedInData };


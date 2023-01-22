const priceList = [
    {
        h2: 'Safety Check',
        price: '50',
        list: ['Frame & forks checked ', 'Wheels checked for damage & wear', 'Nuts & bolts are checked and tightened', 
               'Tyres are inflated to the correct pressure', ' Brakes adjusted', 'Gears adjusted']
    },
    {
        h2: 'Single Speed Full Service',
        price: '80',
        list: ['Frame & forks checked ', 'Wheels trued', 'Nuts & bolts are checked and tightened', 
               'Tyres are inflated to the correct pressure', 'Components de-greased', 'Brake service', 'Hubs servicd',
                'Headset & BB serviced/replaced', 'Clean & Polish', 'Bar tape fitting']
    },
    {
        h2: 'Full Service',
        price: '130',
        list: ['Frame & forks checked ', 'Wheels trued', 'Nuts & bolts are checked and tightened', 'Tyres are inflated to the correct pressure',
                'Components de-greased', 'Brake service', 'Hydraulic disc brake bleeding', 'Hubs service', 'Gear Service', 'Mech hanger alignment',
                'Headset service', 'Bottom bracket service', 'Clean & Polish', 'Bar tape fitting', 'Additional labour cost if necessary']
    },
    {
        h2: 'Brompton Full Service',
        price: '130',
        list: ['Frame & forks checked ', 'Wheels trued', 'Nuts & bolts are checked and tightened', 'Tyres are inflated to the correct pressure',
                'Components de-greased', 'Brake service', 'Hubs serviced (If applicable)', 'Gear service', 'Headset adjusted', 'Bottom bracket adjusted/replaced',
                'Clean & polish', 'Additional labour cost if necessary']
    }
]

const xiaomiRepairPrice = [
    {repair: 'Brake adjustment', price: '10'}, {repair: 'Brake pads with fittings', price: '16'}, { repair: 'Brake cable replacement', price: '30'},
    {repair: 'Front wheel new inner tube replacement with fitting', price: '28'}, {repair: 'Rear wheel new inner tube replacement with fitting', price: '28'},
    {repair: 'Front wheel new inner tube & standard tyre', price: '43'}, {repair: 'Rear wheel new inner tube & standard tyre', price: '43'},
    {repair: 'Front wheel new solid tyre replacement', price: '40'}, {repair: 'Rear wheel new solid tyre replacement', price: '40'},
    {repair: 'Throttle replacement', price: '40'}, {repair: 'Rear mudguard with fitting', price: '20'}, {repair: 'Rear mudguard with fitting including brake light and wiring', price: '30'}
]

export { priceList, xiaomiRepairPrice };
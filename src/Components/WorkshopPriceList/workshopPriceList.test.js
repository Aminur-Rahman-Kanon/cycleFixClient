import { render, screen } from '@testing-library/react';
import WorkshopPriceList from './workshopPriceList';
import { MemoryRouter } from 'react-router-dom';
import { priceList } from '../../Data/data';
import { HelmetProvider } from 'react-helmet-async';

describe('<WorkshopPriceList />', () => {
    beforeEach(() => {
        window.scrollTo = jest.fn();
    })

    test('should render workshopPriceList', () => {
        render(
            <HelmetProvider>
                <MemoryRouter initialEntries={['/workshop-price-list']}>
                    <WorkshopPriceList />
                </MemoryRouter>
            </HelmetProvider>
        );
    
        //initial assertion
        expect(screen.getByRole('heading', { name: 'Workshop Price List' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Select a service from below' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Individual Repairs Price List'})).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Punctures (Excluding inner tube)'})).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Brakes'})).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Headers & Handle Bars'})).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Wheels & Tyres'})).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Gears & Drivetrain'})).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Forks'})).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Other jobs'})).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Bottom Bracket'})).toBeInTheDocument();
    })

    test('should render the list of services', () => {
        render(
            <HelmetProvider>
                <MemoryRouter>
                    <WorkshopPriceList />
                </MemoryRouter>
            </HelmetProvider>
        )

        //asserting the services list
        for (let i=0; i<priceList.length; i++){
            expect(screen.getByRole('heading', { name: `${priceList[i].h2}` })).toBeInTheDocument();
            expect(screen.getByText(`£${priceList[i].price}`));
            expect(screen.getByRole('link', { name: `Select ${priceList[i].h2}` })).toHaveAttribute('href', `/book-service/${priceList[i].h2}/${priceList[i].price}`)
        }
    })

    afterEach(() => {
        window.scrollTo.mockClear();
    })
})

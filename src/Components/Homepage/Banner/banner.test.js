import { render, screen } from '@testing-library/react';
import Banner from './banner';
import { MemoryRouter } from 'react-router-dom';

test('should render banner component', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <Banner />
        </MemoryRouter>
    )

    //inital assertion
    expect(screen.getByRole('heading', { name: 'Your Reliable Local Bicycle Repair Shop' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Book Now' })).toHaveAttribute('href', '/book-service/booking')
    expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('href', '/workshop-price-list/services')
    expect(screen.getByAltText('cycle fix banner')).toBeInTheDocument();
    expect(screen.getByAltText('trek')).toBeInTheDocument();
    expect(screen.getByAltText('specialized')).toBeInTheDocument();
    expect(screen.getByAltText('shimano')).toBeInTheDocument();
    expect(screen.getByAltText('sram')).toBeInTheDocument();
})
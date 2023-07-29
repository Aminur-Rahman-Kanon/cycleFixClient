import { render, screen } from '@testing-library/react';
import Navbar from './navbar';
import { MemoryRouter } from 'react-router-dom';

test('<Navbar />', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <Navbar />
        </MemoryRouter>
    )

    //initial assertion
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Cycling Accident' })).toHaveAttribute('href', '/cycling-accident');
    expect(screen.getByRole('link', { name: 'Book A Service' })).toHaveAttribute('href', '/book-service');
    expect(screen.getByRole('link', { name: 'Workshop Price List' })).toHaveAttribute('href', '/workshop-price-list');
    expect(screen.getByRole('link', { name: 'Xiaomi E-Scooter' })).toHaveAttribute('href', '/xiaomi-e-scooter');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
})
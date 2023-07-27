import { render, screen } from '@testing-library/react';
import Footer from './footer';
import { MemoryRouter } from 'react-router-dom';

describe('<Footer />', () => {
    test('should render footer component', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Footer />
            </MemoryRouter>
        );

        //asserting logo container
        const logo = screen.getByRole('img');
        expect(logo).toHaveAttribute('alt', 'cycle fix logo');
        expect(screen.getByRole('heading', { name: 'Cycle Fix' })).toBeInTheDocument();
        expect(screen.getByTestId('facebook')).toHaveAttribute('href', 'https://www.facebook.com/cyclefixlondon/?locale=en_GB');
        expect(screen.getByTestId('twitter')).toHaveAttribute('href', 'https://mobile.twitter.com/cyclefixlondon');
        expect(screen.getByTestId('instagram')).toHaveAttribute('href', 'https://www.instagram.com/cyclefixlondon/?hl=en');
        expect(screen.getByTestId('youtube')).toHaveAttribute('href', '#');

        //asserting quick links container
        expect(screen.getByRole('heading', { name: 'Quick Links' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
        expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('href', '/workshop-price-list');
        expect(screen.getByRole('link', { name: 'Appoinment' })).toHaveAttribute('href', '/book-service');
        expect(screen.getByRole('link', { name: 'Individual Price List' })).toHaveAttribute('href', '/workshop-price-list/individual-price-lists');
        expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact/query');
        expect(screen.getByRole('link', { name: 'Courtesy Bike' })).toHaveAttribute('href', '/courtesy-bike');

        //asserting usefull links container
        expect(screen.getByRole('heading', { name: 'Useful Links' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/');
        expect(screen.getByRole('link', { name: 'Terms and Condition' })).toHaveAttribute('href', '/');
        expect(screen.getByRole('link', { name: 'Disclaimer' })).toHaveAttribute('href', '/');
        expect(screen.getByRole('link', { name: 'Support' })).toHaveAttribute('href', '/');
        expect(screen.getByRole('link', { name: 'FAQ' })).toHaveAttribute('href', '/');
        
        //asserting stay connected container
        expect(screen.getByRole('heading', { name: 'Stay Connected' })).toBeInTheDocument();
        expect(screen.getByTestId('location-logo')).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Opening Times' })).toBeInTheDocument();
        expect(screen.getByTestId('opening-times')).toBeInTheDocument();

        //asserting the copyright header
        expect(screen.getByTestId('copyright')).toBeInTheDocument();
    })
})
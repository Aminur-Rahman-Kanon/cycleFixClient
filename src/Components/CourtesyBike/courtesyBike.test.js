import { render, screen } from '@testing-library/react';
import CourtesyBike from './courtesyBike';
import { MemoryRouter } from 'react-router-dom';
import AuthContext from '../Others/AuthContext/authContext';
import { HelmetProvider } from 'react-helmet-async';

window.scrollTo = jest.fn();

describe('<CourtesyBike />', () => {
    test('should render CourtesyBike component', () => {
        render(
            <HelmetProvider>
                <MemoryRouter initialEntries={['/courtesy-bike']}>
                    <AuthContext.Provider value={{ loggedInUser: {}, setBackdrop: () => {} }}>
                        <CourtesyBike />
                    </AuthContext.Provider>
                </MemoryRouter>
            </HelmetProvider>
        )

        //initial assertion
        expect(screen.getByRole('heading', { name: 'Free courtesy bike While we fix yours' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Find out more' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Courtesy Bike' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'here' })).toHaveAttribute('href', '/contact/query');
    })
})
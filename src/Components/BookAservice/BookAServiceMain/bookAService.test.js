import { render, screen } from '@testing-library/react';
import BookAservice from "./bookAservice";
import { HelmetProvider } from 'react-helmet-async';
import AuthContext from '../../Others/AuthContext/authContext';
import { MemoryRouter } from 'react-router-dom';

describe('<BookAService />', () => {
    
    test('should render BookAService compoent', async () => {
        const bookService = render(
            <HelmetProvider>
                <MemoryRouter initialEntries={['/book-service']}>
                    <AuthContext.Provider value={{setBackdrop: () => {}, loggedInUser: {}}}>
                        <BookAservice />
                    </AuthContext.Provider>
                </MemoryRouter>
            </HelmetProvider>
        );
        
        //asserting the initial bahaviour of the component
        expect(screen.getByRole('heading', { name: 'Stress Free Bike Repair Service' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Book a reliable no-obligation assessment for your bike today' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Book A Service from Below' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Choose A Bike Service' })).toBeInTheDocument();
    })
})

import { render, screen } from '@testing-library/react';
import Contact from './contact';
import AuthContext from '../../Others/AuthContext/authContext';
import { HelmetProvider } from 'react-helmet-async';

describe('<Contact />', () => {
    test('should render contact component', () => {
        render(
            <HelmetProvider>
                <AuthContext.Provider value={{loggedInUser: {}, setBackdrop: () => {}}}>
                    <Contact />
                </AuthContext.Provider>
            </HelmetProvider>
        )

        //inital assertion
        expect(screen.getByRole('heading', { name: 'We are there whenever you need us' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'If you have any queries contact us below' })).toBeInTheDocument();
    })
})
import { render, screen } from '@testing-library/react';
import Topbar from './topbar';
import { MemoryRouter } from 'react-router-dom';
import AuthContext from '../../Others/AuthContext/authContext';

test('<Topbar />', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <AuthContext.Provider value={{ loggedInUser: {}, setBackdrop: () => {} }}>
                <Topbar />
            </AuthContext.Provider>
        </MemoryRouter>
    );

    //initial assertion
    expect(screen.getByRole('link', { name: 'cycle fix logo' })).toHaveAttribute('href', '/');
    expect(screen.getByTestId('navbar-container')).toBeInTheDocument();
})
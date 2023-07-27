import { render, screen } from '@testing-library/react';
import LoginBar from "./loginBar";
import { MemoryRouter } from 'react-router-dom';
import AuthContext from '../../Others/AuthContext/authContext';
import { mockLoginBar } from '../../../utils/utils';

describe('<LoginBar />', () => {
    test('should render without user logged in', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <AuthContext.Provider value={{ loggedInUser: {}, setBackdrop: () => {} }}>
                    <LoginBar />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        
        //initial assertion
        expect(screen.getByRole('link', { name: 'Login' })).toHaveAttribute('href', '/login');
        expect(screen.getByTestId('login-icon')).toBeVisible();
        expect(screen.getByRole('link', { name: 'Register' })).toHaveAttribute('href', '/register');
        expect(screen.getByTestId('register-icon')).toBeVisible();
    })

    test('should render without user logged in', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <AuthContext.Provider value={{ loggedInUser: mockLoginBar, setBackdrop: () => {} }}>
                    <LoginBar />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        
        //initial assertion
        expect(screen.getByText('test 16')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
        expect(screen.getByAltText('male user')).toBeVisible();
    })
})
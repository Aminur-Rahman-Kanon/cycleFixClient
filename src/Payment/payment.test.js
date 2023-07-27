import { render, screen } from '@testing-library/react';
import Payment from './payment';
import { MemoryRouter } from 'react-router-dom';
import AuthContext from '../Components/Others/AuthContext/authContext';
import { HelmetProvider } from 'react-helmet-async';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { paymentUserData } from '../utils/utils';

describe('<Payment />', () => {
    beforeAll(() => {
        window.scrollTo = jest.fn();
        sessionStorage.setItem('userData', JSON.stringify(paymentUserData))
    })

    test('should render payment component', async () => {
        render(
            <HelmetProvider>
                <MemoryRouter initialEntries={['/payment']}>
                    <AuthContext.Provider value={{ loggedInUser: {}, setBackdrop: () => {} }}>
                        <Elements stripe={loadStripe("pk_test_51MUBDICGr3Ft61igWyky0aosAhx68Nl06srX5bIDSyDQGUr32PSezaXUFuEqYHgjtIFl3wy6DYkMk37G193lFgKN001xUNVubG")}>
                            <Payment />
                        </Elements>
                    </AuthContext.Provider>
                </MemoryRouter>
            </HelmetProvider>
        )

        expect(screen.getByRole('heading', { name: 'Enter your payment details' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Service name' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Customer details' })).toBeInTheDocument();
        expect(screen.getByText('testdfd 16')).toBeInTheDocument();
        expect(screen.getByText('test16@test.com')).toBeInTheDocument();
        expect(screen.getByTestId('name').value).toEqual('');
    })

    afterAll(() => {
        window.scrollTo.mockClear();
        window.sessionStorage.clear();
    })
})

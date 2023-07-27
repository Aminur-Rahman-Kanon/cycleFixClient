import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import Xiaomi from './xiaomi';
import { MemoryRouter } from 'react-router-dom';
import AuthContext from '../../Others/AuthContext/authContext';
import { HelmetProvider } from 'react-helmet-async';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { mockFetch } from '../../../utils/utils';
import ReactDOM from 'react-dom';


describe('<Xiaomi />', () => {
    beforeEach(() => {
        window.scrollTo = jest.fn();
        ReactDOM.createPortal = jest.fn((element, node) => element);
    })

    test('Should render xiaomi component', async () => {
        render(
            <HelmetProvider>
                <AuthContext.Provider value={{ loggedInUser: {}, setBackdrop: () => {} }}>
                    <MemoryRouter initialEntries={['/']}>
                        <Xiaomi />
                    </MemoryRouter>
                </AuthContext.Provider>
            </HelmetProvider>
        );
    
        //initial assertion
        expect(screen.getByRole('heading', { name: 'We specialise in repairing the popular Xiaomi M365 electric scooters' })).toBeInTheDocument();
        expect(screen.getByAltText('xiaomi')).toBeVisible();
        screen.getAllByAltText('xiaomi logo').forEach(logo => expect(logo).toBeVisible());
        screen.getAllByRole('heading', { name: 'Xiaomi Electric Scooter Repair Services' }).forEach(header => {
            expect(header).toBeInTheDocument();
        })
        expect(screen.getByRole('heading', { name: 'Please note we can only advise and fix problems on this scooter only.' })).toBeInTheDocument();
        expect(screen.getByText('If your scooter does not have the MI on the floor platform it is not a genuine Xiaomi scooter.')).toBeInTheDocument();
    })

    test('should successfully submit the form', async () => {
        const mockFetchAPi = window.fetch = jest.fn(() => mockFetch('success'));

        render(
            <HelmetProvider>
                <AuthContext.Provider value={{ loggedInUser: {}, setBackdrop: () => {} }}>
                    <MemoryRouter initialEntries={['/']}>
                        <Xiaomi />
                    </MemoryRouter>
                </AuthContext.Provider>
            </HelmetProvider>
        );

        //getting the first service booking button so we can simulate the book now functionality
        const bookingBtn = screen.getAllByRole('button', 'Book Now')[0]
        userEvent.click(bookingBtn);
        
        await waitFor(() => expect(screen.getByRole('heading', { name: 'Please fill up the following information' })).toBeInTheDocument());
        
        //selecting the form input fields
        const name = screen.getByTestId('name');
        const email = screen.getByTestId('email');
        const phone = screen.getByTestId('phone');
        const date = screen.getByTestId('date');
        const submitBtn = screen.getByRole('button', { name: 'Request' });
    
        //assertion the form input fields
        expect(name.value).toEqual('');
        expect(email.value).toEqual('');
        expect(phone.value).toEqual('');
        expect(date.value).toEqual('');
        expect(submitBtn).toBeDisabled();
    
        //simulating user inputs
        userEvent.type(name, 'test');
        userEvent.type(email, 'test@test.com');
        userEvent.type(phone, '1234567890');
        userEvent.type(date, '12/1/2023');
    
        //assertion after inputs
        expect(name.value).toEqual('test');
        expect(email.value).toEqual('test@test.com');
        expect(phone.value).toEqual('1234567890');
        expect(date.value).toEqual('12/1/2023');
        expect(submitBtn).not.toBeDisabled();
    
        //simulating submit form
        userEvent.click(submitBtn);
    
        //assertion after submitting the form
        await waitForElementToBeRemoved(() => screen.getByTestId('spinner'));
        await waitFor(() => expect(screen.getByRole('heading', { name: 'Request Succesfull' })).toBeInTheDocument());

        //clearing the mockFetch method
        mockFetchAPi.mockClear();
    })

    test('should fail to submit the form', async () => {
        const mockFetchAPi = window.fetch = jest.fn(() => mockFetch('failed'));

        render(
            <HelmetProvider>
                <AuthContext.Provider value={{ loggedInUser: {}, setBackdrop: () => {} }}>
                    <MemoryRouter initialEntries={['/']}>
                        <Xiaomi />
                    </MemoryRouter>
                </AuthContext.Provider>
            </HelmetProvider>
        );

        //getting the first service booking button so we can simulate the book now functionality
        const bookingBtn = screen.getAllByRole('button', 'Book Now')[0]
        userEvent.click(bookingBtn);
        
        await waitFor(() => expect(screen.getByRole('heading', { name: 'Please fill up the following information' })).toBeInTheDocument());
        
        //selecting the form input fields
        const name = screen.getByTestId('name');
        const email = screen.getByTestId('email');
        const phone = screen.getByTestId('phone');
        const date = screen.getByTestId('date');
        const submitBtn = screen.getByRole('button', { name: 'Request' });
    
        //assertion the form input fields
        expect(name.value).toEqual('');
        expect(email.value).toEqual('');
        expect(phone.value).toEqual('');
        expect(date.value).toEqual('');
        expect(submitBtn).toBeDisabled();
    
        //simulating user inputs
        userEvent.type(name, 'test');
        userEvent.type(email, 'test@test.com');
        userEvent.type(phone, '1234567890');
        userEvent.type(date, '12/1/2023');
    
        //assertion after inputs
        expect(name.value).toEqual('test');
        expect(email.value).toEqual('test@test.com');
        expect(phone.value).toEqual('1234567890');
        expect(date.value).toEqual('12/1/2023');
        expect(submitBtn).not.toBeDisabled();
    
        //simulating submit form
        userEvent.click(submitBtn);
    
        //assertion after submitting the form
        await waitForElementToBeRemoved(() => screen.getByTestId('spinner'));
        await waitFor(() => expect(screen.getByRole('heading', { name: 'Request Failed' })).toBeInTheDocument());

        //clearing the mockFetch method
        mockFetchAPi.mockClear();
    })

    afterEach(() => {
        window.scrollTo.mockClear();
        ReactDOM.createPortal.mockClear();
    })
})
import { render, waitFor, waitForElementToBeRemoved, screen, getByRole } from '@testing-library/react';
import Registration from './registration';
import AuthContext from '../../Others/AuthContext/authContext';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import userEvent from '@testing-library/user-event';
import { mockFetch } from '../../../utils/utils';
import ReactDom from 'react-dom';
import { act } from 'react-dom/test-utils';

window.scrollTo = jest.fn();

describe('<Registration />', () => {
    beforeEach(() => {
        ReactDom.createPortal = jest.fn((element, node) => element);
        jest.useFakeTimers();
    })

    test('Should successfully register user to the system', async () => {
        const mockFetchMethod = window.fetch = jest.fn(() => mockFetch('success'));

        const register = render(
            <HelmetProvider>
                <AuthContext.Provider value={{ loggedInUser: {}, setBackdrop: () => {} }}>
                    <MemoryRouter initialEntries={['/register']}>
                        <Registration />
                    </MemoryRouter>
                </AuthContext.Provider>
            </HelmetProvider>
        )

        //selecting the input elements
        const firstName = register.getByTestId('first-name');
        const lastName = register.getByTestId('last-name');
        const email = register.getByTestId('email');
        const gender = register.getByTestId('gender');
        const password = register.getByTestId('password');
        const repeatPassword = register.getByTestId('retype-password');
        const terms = register.getByTestId('terms-condition');
        const submitBtn = register.getByRole('button', { name: 'Register' });

        //initial assertion
        expect(firstName.value).toEqual('');
        expect(lastName.value).toEqual('');
        expect(email.value).toEqual('');
        expect(gender.value).toEqual('Please Select');
        expect(password.value).toEqual('');
        expect(repeatPassword.value).toEqual('');
        expect(terms.value).toEqual('false');
        expect(submitBtn).toBeDisabled();

        //simulating user inputs
        userEvent.type(firstName, 'test');
        userEvent.type(lastName, 'user');
        userEvent.type(email, 'test@test.com');
        userEvent.selectOptions(gender, register.getByRole('option', { name: 'Male' }));
        userEvent.type(password, 'user123');
        userEvent.type(repeatPassword, 'user123');
        userEvent.click(terms, register.getByLabelText('I agree all statements in Terms of Service'));

        //assertion after user inputs
        act(() => {
            expect(firstName.value).toEqual('test');
            expect(lastName.value).toEqual('user');
            expect(email.value).toEqual('test@test.com');
            expect(gender.value).toEqual('Male');
            expect(password.value).toEqual('user123');
            expect(repeatPassword.value).toEqual('user123');
            expect(terms.value).toEqual('true');
            expect(submitBtn).not.toBeDisabled();
        })
        act(() => {
            jest.runAllTimers();
        })

        //simulating fetch call
        userEvent.click(submitBtn);
        // register.debug();

        await waitForElementToBeRemoved(() => register.getByTestId('spinner'));
        await waitFor(() => expect(register.getByRole('heading', { name: 'User created' })).toBeInTheDocument());

        mockFetchMethod.mockClear();
    })

    test('Should fail to register user to the system', async () => {
        const mockFetchMethod = window.fetch = jest.fn(() => mockFetch('failed'));

        const register = render(
            <HelmetProvider>
                <AuthContext.Provider value={{ loggedInUser: {}, setBackdrop: () => {} }}>
                    <MemoryRouter initialEntries={['/register']}>
                        <Registration />
                    </MemoryRouter>
                </AuthContext.Provider>
            </HelmetProvider>
        )

        //selecting the input elements
        const firstName = register.getByTestId('first-name');
        const lastName = register.getByTestId('last-name');
        const email = register.getByTestId('email');
        const gender = register.getByTestId('gender');
        const password = register.getByTestId('password');
        const repeatPassword = register.getByTestId('retype-password');
        const terms = register.getByTestId('terms-condition');
        const submitBtn = register.getByRole('button', { name: 'Register' });

        //initial assertion
        expect(firstName.value).toEqual('');
        expect(lastName.value).toEqual('');
        expect(email.value).toEqual('');
        expect(gender.value).toEqual('Please Select');
        expect(password.value).toEqual('');
        expect(repeatPassword.value).toEqual('');
        expect(terms.value).toEqual('false');
        expect(submitBtn).toBeDisabled();

        //simulating user inputs
        userEvent.type(firstName, 'test');
        userEvent.type(lastName, 'user');
        userEvent.type(email, 'test@test.com');
        userEvent.selectOptions(gender, register.getByRole('option', { name: 'Male' }));
        userEvent.type(password, 'user123');
        userEvent.type(repeatPassword, 'user123');
        userEvent.click(terms, register.getByLabelText('I agree all statements in Terms of Service'));

        //assertion after user inputs
        act(() => {
            expect(firstName.value).toEqual('test');
            expect(lastName.value).toEqual('user');
            expect(email.value).toEqual('test@test.com');
            expect(gender.value).toEqual('Male');
            expect(password.value).toEqual('user123');
            expect(repeatPassword.value).toEqual('user123');
            expect(terms.value).toEqual('true');
            expect(submitBtn).not.toBeDisabled();
        })
        act(() => {
            jest.runAllTimers();
        })

        //simulating fetch call
        userEvent.click(submitBtn);
        // register.debug();

        await waitForElementToBeRemoved(() => register.getByTestId('spinner'));
        await waitFor(() => expect(register.getByRole('heading', { name: 'Something went wrong !' })).toBeInTheDocument());

        mockFetchMethod.mockClear();
    })

    afterEach(() => {
        ReactDom.createPortal.mockClear();
        jest.useRealTimers();
    })
})
import { render, waitFor, act, waitForElementToBeRemoved } from '@testing-library/react';
import Login from './login';
import { MemoryRouter } from 'react-router-dom';
import AuthContext from '../Others/AuthContext/authContext';
import { HelmetProvider } from 'react-helmet-async';
import userEvent from '@testing-library/user-event';
import { mockLoginFetchApi, sessionStorageMock } from '../../utils/utils';
import ReactDom from 'react-dom';

describe('<Login />', () => {
    beforeEach(() => {
        //mocking createportal
        ReactDom.createPortal = jest.fn((element, node) => element);
    })

    test('should successfully login user to the system', async () => {
        //mocking the fetch method with status mwssage of success
        const mockFetchMethod = window.fetch = jest.fn(() => mockLoginFetchApi('success'));

        const login = render(
            <HelmetProvider>
                <AuthContext.Provider value={{ loggedInUser: {}, setBackdrop: () => {} }}>
                    <MemoryRouter initialEntries={['/login']}>
                        <Login />
                    </MemoryRouter>
                </AuthContext.Provider>
            </HelmetProvider>
        )

        //selecting the elements
        const email = login.getByTestId('email');
        const password = login.getByTestId('password');
        const submitBtn = login.getByRole('button', { name: 'Login' });
        const createAccLink = login.getByRole('link', { name: 'Create Account' })
        const forgotPassLink = login.getByRole('link', { name: 'Forgot Password' })

        //initial assertion
        expect(email.value).toEqual('');
        expect(password.value).toEqual('');
        expect(submitBtn).toBeDisabled();
        expect(createAccLink).toHaveAttribute('href', '/register');
        expect(forgotPassLink).toHaveAttribute('href', '/reset-password');
        expect(submitBtn).toBeDisabled();

        //simulating user inputs
        act(() => {
            userEvent.type(email, 'test@test.com');
            userEvent.type(password, 'asdf');
        })

        //assertion after user inputs
        await waitFor(() => expect(email.value).toEqual('test@test.com'));
        await waitFor(() => expect(password.value).toEqual('asdf'));
        await waitFor(() => expect(submitBtn).not.toBeDisabled());

        //simulating login fetch call
        act(() => {
            userEvent.click(submitBtn);
        })

        //assertion after the fetch call returns result
        await waitForElementToBeRemoved(() => login.getByTestId('spinner'));

        //clearing the fetch mock function
        mockFetchMethod.mockClear();
    })

    test('should login fetch method returns "user not found message" ', async () => {
        //mocking the fetch function
        const mockFetchMethod = window.fetch = jest.fn(() => mockLoginFetchApi('failed'));

        const login = render(
            <HelmetProvider>
                <AuthContext.Provider value={{ loggedInUser: {}, setBackdrop: () => {} }}>
                    <MemoryRouter initialEntries={['/login']}>
                        <Login />
                    </MemoryRouter>
                </AuthContext.Provider>
            </HelmetProvider>
        )

        //selecting the elements
        const email = login.getByTestId('email');
        const password = login.getByTestId('password');
        const submitBtn = login.getByRole('button', { name: 'Login' });
        const createAccLink = login.getByRole('link', { name: 'Create Account' })
        const forgotPassLink = login.getByRole('link', { name: 'Forgot Password' })

        //initial assertion
        expect(email.value).toEqual('');
        expect(password.value).toEqual('');
        expect(submitBtn).toBeDisabled();
        expect(createAccLink).toHaveAttribute('href', '/register');
        expect(forgotPassLink).toHaveAttribute('href', '/reset-password');
        expect(submitBtn).toBeDisabled();

        //simulating user inputs
        act(() => {
            userEvent.type(email, 'test@test.com');
            userEvent.type(password, 'asdf');
        })

        //assertion ater user inputs
        await waitFor(() => expect(email.value).toEqual('test@test.com'));
        await waitFor(() => expect(password.value).toEqual('asdf'));
        await waitFor(() => expect(submitBtn).not.toBeDisabled());

        //simulating login fetch call
        act(() => {
            userEvent.click(submitBtn);
        })

        //assertion after the login fetch returns result
        await waitForElementToBeRemoved(() => expect(login.getByTestId('spinner')));
        await waitFor(() => expect(login.getByRole('heading', { name: 'Something went wrong' })).toBeInTheDocument());

        //clearing the fetch mock
        mockFetchMethod.mockClear();
    })

    afterEach(() => {
        //clearing the createPortal mock
        ReactDom.createPortal.mockClear();
    })
})
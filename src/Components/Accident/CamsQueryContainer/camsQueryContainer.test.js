import { render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import CamsQueryContainer from "./camsQueryContainer";
import AuthContext from '../../Others/AuthContext/authContext';
import userEvent from '@testing-library/user-event';
import { mockUserLoggedInData } from '../../../Data/data';
import { mockFetch } from '../../../utils/utils';
import ReactDom from 'react-dom';

describe("<CamsQueryContainer />", () => {
    beforeEach(() => {
        //mocking fetch api
        window.fetch = jest.fn(() => mockFetch('success'));
        //mocking createPortal
        ReactDom.createPortal = jest.fn((element, node) => element);
    })

    test('should render the CamsQueryContainer component without user logged in', () => {
        const camsQuery = render(
            <AuthContext.Provider value={{setBackdrop: () => {}, loggedInUser: {}}}>
                <CamsQueryContainer />
            </AuthContext.Provider>
        )

        //selecting the elements
        const nameInput = camsQuery.getByTestId('name-input');
        const emailInput = camsQuery.getByTestId('email-input');
        const phoneNumberInput = camsQuery.getByTestId('phone-number-input');
        const messageInput = camsQuery.getByTestId('message-input');
        const submitBtn = camsQuery.getByRole('button', { name: 'Submit' });

        //asserting the initial position
        expect(nameInput.value).toEqual('');
        expect(emailInput.value).toEqual('');
        expect(phoneNumberInput.value).toEqual('');
        expect(messageInput.value).toEqual('');
        expect(submitBtn).toBeDisabled();
    })

    test('should render the CamsQueryContainer component with user logged in', async () => {
        const camsQuery = render(
            <AuthContext.Provider value={{ setBackdrop: () => {}, loggedInUser: mockUserLoggedInData}}>
                <CamsQueryContainer />
            </AuthContext.Provider>
        )

        //selecting the elements
        const nameInput = camsQuery.getByTestId('name-input');
        const emailInput = camsQuery.getByTestId('email-input');
        const phoneNumberInput = camsQuery.getByTestId('phone-number-input');
        const messageInput = camsQuery.getByTestId('message-input');
        const submitBtn = camsQuery.getByRole('button', { name: 'Submit' });

        //inserting values to some inputs
        userEvent.type(messageInput, 'Hello Javascript');
        userEvent.type(phoneNumberInput, '12345678901');
        
        //asserting the initial position
        await waitFor(() => expect(nameInput.value).toEqual('Test User'));
        await waitFor(() => expect(emailInput.value).toEqual('test@test.com'));
        await waitFor(() => expect(phoneNumberInput.value).toEqual('12345678901'));
        await waitFor(() => expect(messageInput.value).toEqual('Hello Javascript'));
        await waitFor(() => expect(submitBtn).not.toBeDisabled());
    })

    test('should successfully send user query', async () => {
        const camsQuery = render(<AuthContext.Provider value={{ setBackdrop: () => {} }}>
            <CamsQueryContainer />
        </AuthContext.Provider>)

        //selecting the elements
        const nameInput = camsQuery.getByTestId('name-input');
        const emailInput = camsQuery.getByTestId('email-input');
        const phoneNumberInput = camsQuery.getByTestId('phone-number-input');
        const messageInput = camsQuery.getByTestId('message-input');
        const submitBtn = camsQuery.getByRole('button', { name: 'Submit' });

        userEvent.type(nameInput, 'Test User');
        userEvent.type(emailInput, 'test@test.com');
        userEvent.type(phoneNumberInput, '12345678901');
        userEvent.type(messageInput, 'Hello Javascript');

        expect(submitBtn).not.toBeDisabled();

        //simulating click button
        userEvent.click(submitBtn);

        await waitFor(() => expect(camsQuery.queryByText('Your query has been sent successfully')).toBeInTheDocument())
    })

    afterEach(() => {
        window.fetch.mockClear();
        ReactDom.createPortal.mockClear();
    })
})

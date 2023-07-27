import { render, waitFor } from '@testing-library/react';
import ForgotPassword from './forgotPassword';
import userEvent from '@testing-library/user-event';
import { mockFetch } from '../../utils/utils';
import { act } from 'react-dom/test-utils';
import ReactDom from 'react-dom';

describe('<ForgotPassword />', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        window.fetch = jest.fn(() => mockFetch('success'));
        ReactDom.createPortal = jest.fn((element, node) => element);
    })

    test('should successfully send password reset link', async() => {
        const forgotPassword = render(
            <ForgotPassword />
        )

        //selecting input elements
        const email = forgotPassword.getByTestId('email');
        const submitBtn = forgotPassword.getByRole('button', { name: 'Send password reset link' });

        //initial assertion
        expect(email.value).toEqual('');
        expect(submitBtn).toBeDisabled();

        //simulating user event
        userEvent.type(email, 'test@test.com');

        act(() => {
            jest.runAllTimers();
        })

        await waitFor(() => expect(email.value).toEqual('test@test.com'));
        await waitFor(() => expect(submitBtn).not.toBeDisabled());

        userEvent.click(submitBtn);

        await waitFor(() => expect(forgotPassword.getByRole('heading', { name: 'An email has been sent to:' })));
    })

    afterEach(() => {
        jest.useRealTimers();
        window.fetch.mockClear();
        ReactDom.createPortal.mockClear();
    })
})
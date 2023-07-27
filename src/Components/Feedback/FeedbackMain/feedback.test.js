import { render, waitFor } from '@testing-library/react';
import Feedback from "./feedback";
import userEvent from '@testing-library/user-event';

window.scrollTo = jest.fn();

describe('<Feedback />', () => {
    test('simulating user inputs in feedback component', async () => {
        const feedback = render(
            <Feedback />
        )

        //selecting the input elements
        const name = feedback.getByTestId('name');
        const email = feedback.getByTestId('email')
        const comment = feedback.getByTestId('comment');
        const submitBtn = feedback.getByRole('button', { name: 'Submit' });

        //initial assertion
        expect(name.value).toEqual('');
        expect(email.value).toEqual('');
        expect(comment.value).toEqual('');
        expect(submitBtn).toBeDisabled();

        //simulating user inputs
        userEvent.type(name, 'test');
        userEvent.type(email, 'test@test.com');
        userEvent.type(comment, 'test comment');

        //assertion after user inputs
        await waitFor(() => expect(name.value).toEqual('test'));
        await waitFor(() => expect(email.value).toEqual('test@test.com'));
        await waitFor(() => expect(comment.value).toEqual('test comment'));
    })
})
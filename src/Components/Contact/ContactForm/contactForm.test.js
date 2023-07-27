import { render, waitFor } from '@testing-library/react';
import ContactForm from "./contactForm";
import userEvent from '@testing-library/user-event';

describe('<ContactForm />', () => {
    test('simulating user inputs in contactForm', async () => {
        const contactForm = render(
            <ContactForm />
        )

        //selecting the elements
        const name = contactForm.getByTestId('name');
        const phone = contactForm.getByTestId('phone');
        const email = contactForm.getByTestId('email');
        const message = contactForm.getByTestId('message');
        const submitBtn = contactForm.getByRole('button', { name: 'Submit' });

        //initial assertion
        expect(name.value).toEqual('');
        expect(phone.value).toEqual('');
        expect(email.value).toEqual('');
        expect(message.value).toEqual('');
        expect(submitBtn).toBeDisabled();

        //simulating user inputs
        userEvent.type(name, 'test');
        userEvent.type(phone, '12345678901');
        userEvent.type(email, 'test@test.com');
        userEvent.type(message, 'test message');

        //assertion after user inputs
        await waitFor(() => expect(name.value).toEqual('test'));
        await waitFor(() => expect(phone.value).toEqual('12345678901'));
        await waitFor(() => expect(email.value).toEqual('test@test.com'));
        await waitFor(() => expect(message.value).toEqual('test message'));
        await waitFor(() => expect(submitBtn).not.toBeDisabled());
    })
})
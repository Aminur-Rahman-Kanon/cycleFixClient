import { render, waitFor, act } from '@testing-library/react';
import Booking from './booking';
import AuthContext from '../../Others/AuthContext/authContext';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

window.scrollTo = jest.fn();

describe('<BookingMain />', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    })

    test('should render <SelectDate />', async () => {
        const booking = render(
            <MemoryRouter initialEntries={['/book-service/Safety Check/50']}>
                <AuthContext.Provider value={{ loggedInUser: {} }}>
                    <Routes>
                        <Route path='/book-service/:serviceId/:packagePrice' element={<Booking />} />
                    </Routes>
                </AuthContext.Provider>
            </MemoryRouter>
        )

        //initial asserion
        expect(booking.getByRole('heading', { name: 'Safety Check' }));
        expect(booking.getByRole('heading', { name: 'Please Select An Available Date Below' }));        
    })

    test('<should <SelectBikeDeatils /> elements work accordingly', async () => {
      const booking = render(
        <AuthContext.Provider value={{ loggedInUser: {} }}>
            <Booking />
        </AuthContext.Provider>
      )

      //selecting input elements
      const makeInput = booking.getByTestId('make')
      const modelInput = booking.getByTestId('model')
      const colorInput = booking.getByTestId('color')
      const infoInput = booking.getByTestId('info')
      const partsDeposit = booking.getByTestId('parts-deposit');
      const submitBtn = booking.getByRole('button', { name: 'Next' });

      //initial assertion
      expect(makeInput.value).toEqual('');
      expect(modelInput.value).toEqual('');
      expect(colorInput.value).toEqual('');
      expect(infoInput.value).toEqual('');
      expect(partsDeposit.value).toEqual('Please select an option');
      expect(submitBtn).toBeDisabled();

      //simulating user input
      userEvent.type(makeInput, 'make');
      userEvent.type(modelInput, 'model');
      userEvent.type(colorInput, 'color');
      userEvent.type(infoInput, 'info');
      userEvent.selectOptions(partsDeposit, booking.getAllByRole('option', { name: '£25' }));

      //assertion after user inputs
      await waitFor(() => expect(makeInput.value).toEqual('make'));
      await waitFor(() => expect(modelInput.value).toEqual('model'));
      await waitFor(() => expect(colorInput.value).toEqual('color'));
      await waitFor(() => expect(infoInput.value).toEqual('info'));
      await waitFor(() => expect(partsDeposit.value).toEqual('25'))
      await waitFor(() => expect(submitBtn).not.toBeDisabled());
    })

    test('should <SelectUserInformation /> elements work accordingly', async () => {
        const booking = render(
            <AuthContext.Provider value={{ loggedInUser: {} }}>
                <Booking />
            </AuthContext.Provider>
        )

        //selecting the input elements
        const firstName = booking.getByTestId('first-name');
        const lastName = booking.getByTestId('last-name');
        const email = booking.getByTestId('email');
        const phone = booking.getByTestId('phone');
        const submitBtn = booking.getByTestId('submit-btn');

        //initial assertion
        expect(firstName.value).toEqual('');
        expect(lastName.value).toEqual('');
        expect(email.value).toEqual('');
        expect(phone.value).toEqual('');
        expect(submitBtn).toBeDisabled();

        //simulating user inputs
        userEvent.type(firstName, 'test');
        userEvent.type(lastName, 'user');
        userEvent.type(email, 'test@test.com');
        userEvent.type(phone, '12345678901');
        
        act(() => {
            jest.runAllTimers();
        })

        //assertion after inputs
        await waitFor(() => expect(firstName.value).toEqual('test'));
        await waitFor(() => expect(lastName.value).toEqual('user'));
        await waitFor(() => expect(email.value).toEqual('test@test.com'));
        await waitFor(() => expect(phone.value).toEqual('12345678901'));
        await waitFor(() => expect(submitBtn).not.toBeDisabled())
    })

    afterEach(() => {
        jest.useRealTimers();
    })
})
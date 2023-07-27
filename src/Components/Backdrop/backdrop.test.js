import { render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import Backdrop from './backdrop';
import userEvent from '@testing-library/user-event';

describe("<Backdrop />", () => {
    test('should render the backdrop component', async () => {
        const backdrop = render(
            <Backdrop backdrop={true} toggleBackdrop={() => {}} />
        )

        //selecting backdrop parent element
        const backdropDiv = backdrop.getByTestId('backdrop');

        //initial assertion
        expect(backdropDiv.style.display).toEqual('block');
    })

    test("shouldn't render backdrop component", () => {
        const backdrop = render(
            <Backdrop backdrop={false} toggleBackdrop={() => {}} />
        )

        //selecting backdrop parent element
        const backdropDiv = backdrop.getByTestId('backdrop');

        //initial assertion
        expect(backdropDiv.style.display).toEqual('none');
    })
})
import { render, screen } from '@testing-library/react';
import Modal from './modal';
import ReactDOM from 'react-dom';

test('should render <Modal />', () => {
    ReactDOM.createPortal = jest.fn((element, node) => element);

    render(
        <Modal modal={true}>
            {<p>Test</p>}
        </Modal>
    )

    //initial assertion
    expect(screen.getByText('Test')).toBeInTheDocument();

    ReactDOM.createPortal.mockClear();
})
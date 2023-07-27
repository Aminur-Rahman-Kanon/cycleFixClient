import { render, screen } from '@testing-library/react';
import Spinner from './spinner';

test('should render <Test />', () => {
    render(<Spinner spinner={true}/>);

    //initial assertion
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByText('Please wait')).toBeInTheDocument();
})
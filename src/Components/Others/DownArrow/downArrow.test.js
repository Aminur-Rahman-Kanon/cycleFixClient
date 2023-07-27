import { render, screen } from '@testing-library/react';
import DownArrow from './downArrow';

test('should render <DownArrow />', () => {
    render(<DownArrow h3={"test"} clickHandler={() => {}}/>);

    //initlal assertion
    expect(screen.getByRole('heading', { name: 'test' })).toBeInTheDocument();
    expect(screen.getByTestId('circle-icon')).toBeVisible();
})
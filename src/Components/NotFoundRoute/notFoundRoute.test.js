import { render, screen } from '@testing-library/react';
import NotFoundRoute from './notFoundRoute';
import { MemoryRouter } from 'react-router-dom';

test('should render <NotFoundRoute />', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <NotFoundRoute />
        </MemoryRouter>
    )

    //initial assertion
    expect(screen.getByAltText('cycle fix page not found')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go back' })).not.toBeDisabled();
})
import { render, screen } from '@testing-library/react';
import Xiaomi from './xiaomi';
import { MemoryRouter } from 'react-router-dom';

test('<Xiaomi />', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <Xiaomi />
        </MemoryRouter>
    );

    //initial assertion
    expect(screen.getByRole('heading', { name: 'Xiaomi Electric Scooter Repair Services' })).toBeInTheDocument();
    expect(screen.getByText('We specialise in repairing the popular Xiaomi M365 electric scooters')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Explore' })).toHaveAttribute('href', '/xiaomi-e-scooter');
    expect(screen.getByAltText('xiaomi e scooter')).toBeVisible();
})
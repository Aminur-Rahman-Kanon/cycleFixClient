import { render, screen } from '@testing-library/react';
import OurServices from './ourServices';

test('<HeaderContainer />', () => {
    render(<OurServices />);

    //initial assertion
    expect(screen.getByRole('heading', { name: 'Our Services' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Your Reliable Local Bicycle Repair Shop' })).toBeInTheDocument();
    expect(screen.getByTestId('clock')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Walk in Ride out' })).toBeInTheDocument();
    expect(screen.getByTestId('wrench')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Wide range of stocks' })).toBeInTheDocument();
    expect(screen.getByTestId('tie')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Experienced professional' })).toBeInTheDocument();
    expect(screen.getByTestId('charging-station')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Accessories' })).toBeInTheDocument();
    expect(screen.getByTestId('biking')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Walk in Ride out' })).toBeInTheDocument();
    expect(screen.getByTestId('motorcycle')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Courtesy bike' })).toBeInTheDocument();
    expect(screen.getByTestId('clock')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Xiaomi E-scooter' })).toBeInTheDocument();
})
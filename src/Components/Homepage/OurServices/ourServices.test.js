import { render, screen } from '@testing-library/react';
import OurServices from './ourServices';

test('<HeaderContainer />', () => {
    render(<OurServices />);

    //initial assertion
    expect(screen.getByRole('heading', { name: 'Our Services' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Your Reliable Local Bicycle Repair Shop' })).toBeInTheDocument();
    expect(screen.getByAltText('walk in ride out')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Walk in Ride out' })).toBeInTheDocument();
    expect(screen.getByAltText('wide range of bike item')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Wide range of stocks' })).toBeInTheDocument();
    expect(screen.getByAltText('experienced bike mechanic')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Experienced professional' })).toBeInTheDocument();
    expect(screen.getByAltText('bike accessories')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Accessories' })).toBeInTheDocument();
    expect(screen.getByAltText('courtesy bike')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Courtesy bike' })).toBeInTheDocument();
    expect(screen.getByAltText('xiaomi e scooter')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Xiaomi E-scooter' })).toBeInTheDocument();
})
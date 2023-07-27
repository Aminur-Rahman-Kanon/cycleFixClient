import { render, screen } from '@testing-library/react';
import ProfessionalContainer from './professionalContainer';

test('<ProfessionalContainer />', () => {
    render(<ProfessionalContainer />);

    //inital assertion
    expect(screen.getByRole('heading', { name: 'Meet Our Expert Team' })).toBeInTheDocument();
    expect(screen.getByText(/Today we run the store with a small but knowledgeable team who are passionately committed to their work/i)).toBeInTheDocument();
    expect(screen.getByAltText('cycle fix team member 1')).toBeInTheDocument();
    expect(screen.getByAltText('cycle fix team member 2')).toBeInTheDocument();
    expect(screen.getByAltText('cycle fix team member 3')).toBeInTheDocument();
})
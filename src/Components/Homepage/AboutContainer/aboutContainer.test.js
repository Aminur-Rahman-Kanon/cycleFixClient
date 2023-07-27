import { render, screen } from '@testing-library/react';
import AboutContainer from './aboutContainer';

describe('<AboutContainer />', () => {
    test('should render aboutContainer component', () => {
        render(<AboutContainer />);

        //initial assertion
        expect(screen.getByAltText('about cycle fix')).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'About Cycle Fix' })).toBeVisible();
    })
})
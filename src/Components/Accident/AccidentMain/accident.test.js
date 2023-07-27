import { render } from '@testing-library/react'
import Accident from "./accident";
import AuthContext from '../../Others/AuthContext/authContext';
import { HelmetProvider } from 'react-helmet-async';

//mocking window.scrollTo property
window.scrollTo = jest.fn();

describe('<Accident />', () => {
    test('should render accident compoent', () => {
        //rendering the component
        const accident = render(
            <HelmetProvider>
                <AuthContext.Provider value={{loggedInUser:{}}}>
                    <Accident />
                </AuthContext.Provider>
            </HelmetProvider>
        )
        
        //asserting the initial position of the elements
        expect(accident.getByRole('heading', { name: 'Had a cycling accident that wasn’t your fault?' })).toBeInTheDocument();
        expect(accident.getByRole('button', { name: 'Enquiry Now' })).not.toBeDisabled();
        expect(accident.getByRole('heading', { name: 'Who are CAMS' })).toBeInTheDocument();
        expect(accident.getByRole('link', { name: 'Explore CAMS' })).toHaveAttribute("href", "https://c-ams.co.uk");
    })

    //clearing the mocks
    afterAll(() => {
        jest.clearAllMocks();
    })
})
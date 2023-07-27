import { render, screen } from '@testing-library/react';
import SideDrawer from "./sideDrawer";
import { MemoryRouter } from 'react-router-dom';
import AuthContext from '../Others/AuthContext/authContext';

describe('<Sidedrawer />', () => {
    test('should render sidedrawer component', () => {
        render(
            <AuthContext.Provider value={{ loggedInUser: {}, setBackdrop: () => {} }}>
                <MemoryRouter initialEntries={['/']}>
                    <SideDrawer sideDrawer={true}/>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        //initial assertion
        expect(screen.getByTestId('sidedrawer').className).toEqual('sideDrawer on');
    })

    test('should  not render sidedrawer component', () => {
        render(
            <AuthContext.Provider value={{ loggedInUser: {}, setBackdrop: () => {} }}>
                <MemoryRouter initialEntries={['/']}>
                    <SideDrawer sideDrawer={false}/>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        //initial assertion
        expect(screen.getByTestId('sidedrawer').className).toEqual('sideDrawer off');
    })
})
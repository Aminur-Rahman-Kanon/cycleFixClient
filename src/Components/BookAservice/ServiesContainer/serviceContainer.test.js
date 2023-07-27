import { render, screen, waitFor } from '@testing-library/react';
import ServicesContainer from './servicesContainer';
import { priceList } from '../../../Data/data';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('<ServiceContainer />', () => {
    test('should successfully render all elements', async () => {
        render(
            <MemoryRouter initialEntries={['/book-service']}>
                <ServicesContainer />;
            </MemoryRouter>
        )

        //asserting individual service lists content
        for (let i=0; i<priceList.length; i++){
            expect(screen.getByRole('heading', { name: priceList[i].h2 })).toBeInTheDocument();
            expect(screen.getByRole('img', { name: priceList[i].h2 })).toBeInTheDocument();
            expect(screen.getByText(`£${priceList[i].price}`)).toBeInTheDocument();
            expect(screen.getByRole('link', { name: `Select ${priceList[i].h2}` })).toHaveAttribute('href', `/book-service/${priceList[i].h2}/${priceList[i].price}`)
        }

        //getting the expand buttons and menus
        const expandButton = screen.getAllByTestId('expand-button');
        const expandMenu = screen.getAllByTestId('expand-menu');

        //asserting the functionality of menu expand when button is clicked
        for (let i=0; i< expandButton.length; i++){
            userEvent.click(expandButton[i]);
            await waitFor(() => expect(expandMenu[i].className).toEqual('chooseServicesIncluded'));
        }
    })
})
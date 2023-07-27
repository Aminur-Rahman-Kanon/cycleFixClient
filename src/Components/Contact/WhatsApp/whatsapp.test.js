import { render, screen } from '@testing-library/react';
import WhatsApp from './whatsapp';

describe('<Whatsapp />', () => {
    test('should render whatsapp component', () => {
        render(
            <WhatsApp />
        )

        //inital assertion
        expect(screen.getByTestId('whatsappImg')).toHaveAttribute('alt', 'whatsapp image')
        expect(screen.getByTestId('whatsappLogo')).toHaveAttribute('alt', 'whatsapp logo');
        expect(screen.getByRole('heading', { name: 'Want to connect with us in whatsapp' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Lets chat' })).toBeInTheDocument();
    })
})
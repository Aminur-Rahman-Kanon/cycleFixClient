import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import Testimonial from './testimonial';
import { mockTestimonialApi } from '../../../utils/utils';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

describe('<Testimonial />', () => {
    test('should return 3 comments from the  server', async () => {
        const mockFetch = window.fetch = jest.fn(() => mockTestimonialApi('success'));

        render(
            <MemoryRouter initialEntries={['/']}>
                <Testimonial />
            </MemoryRouter>
        )

        //initial assertion
        expect(screen.getByRole('heading', { name: 'What our client say' })).toBeInTheDocument();

        // await waitForElementToBeRemoved(() => screen.getByTestId('spinner'));
        await waitFor(() => expect(screen.getByText('hello this is a test comment')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('test user1')).toBeInTheDocument());

        //clearing the mockFetch
        mockFetch.mockClear();
    })

    test('should return error while fetching', async () => {
        const mockFetch = window.fetch = jest.fn(() => mockTestimonialApi('failed'));

        render(
            <MemoryRouter initialEntries={['/']}>
                <Testimonial />
            </MemoryRouter>
        )

        //initial assertion
        expect(screen.getByRole('heading', { name: 'What our client say' })).toBeInTheDocument();

        // await waitForElementToBeRemoved(() => screen.getByTestId('spinner'));
        await waitFor(() => expect(screen.getByText('No comments yet')).toBeInTheDocument());

        //clearing the mock
        mockFetch.mockClear();
    })
})
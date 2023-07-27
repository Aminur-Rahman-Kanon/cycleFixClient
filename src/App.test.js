import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

//mocking scrollTo property
window.scrollTo = jest.fn();

describe('<App />', () => {
  test('should render app component', async () => {
    const app = render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </HelmetProvider>
    );
    
    //selecting the elements for testing
    const sidedrawer = app.getByTestId('sidedrawer');
    const drawToggle = app.getByTestId('drawToggle');
    const backdrop = app.getByTestId('backdrop');
    
    //asserting their initial position
    expect(sidedrawer.className).toEqual('sideDrawer off');
    expect(backdrop.style.display).toEqual('none');

    //simulating a click event
    fireEvent.click(drawToggle);

    //finally asserting their position after the click event
    await waitFor(() => expect(sidedrawer.className).toEqual('sideDrawer on'));
    await waitFor(() =>  expect(backdrop.style.display).toEqual('block'))
  })

  //clearing all mocks after all tests
  afterAll(() => {
    jest.clearAllMocks();
  })
})

import { render } from '@testing-library/react';
import CreateStar from './createStar';

describe('<CreateStar />', () => {
    test('should render createStar compoent 3 active stars', () => {
        const createStar = render (
            <CreateStar rating={3} changeRating={() => {}} />
        )

        //selecting all active star
        const activeStar = createStar.getAllByTestId('active-star');
        
        //assertion
        expect(activeStar.length).toBe(3);
    })
    
    test('should render createStar component with all inactive stars', () => {
        const createStar = render(
            <CreateStar rating={0}/>
        )

        //selecting all inactive stars
        const inactiveStar = createStar.getAllByTestId('inactive-star');

        //assertion
        expect(inactiveStar.length).toBe(5);
    })
})
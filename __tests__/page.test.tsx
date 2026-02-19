import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'

describe('Page', () => {
    it('Shows filter bar', () => {
        render(<Page />)
        const filterBar = screen.getByTestId('filterBar');
        expect(filterBar).toBeInTheDocument();
    });
    it('Shows data list', () => {
        render(<Page/>);
        const dataList = screen.getByTestId('dataList');
        expect(dataList).toBeInTheDocument();
    })
})

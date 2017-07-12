import { SudokuHelpPage } from './app.po';

describe('sudoku-help App', () => {
  let page: SudokuHelpPage;

  beforeEach(() => {
    page = new SudokuHelpPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

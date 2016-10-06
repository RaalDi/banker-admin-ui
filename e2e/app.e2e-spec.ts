import { BankerUiPage } from './app.po';

describe('banker-ui App', function() {
  let page: BankerUiPage;

  beforeEach(() => {
    page = new BankerUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

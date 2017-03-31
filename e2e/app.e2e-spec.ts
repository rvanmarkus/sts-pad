import { StsPadPage } from './app.po';

describe('sts-pad App', function() {
  let page: StsPadPage;

  beforeEach(() => {
    page = new StsPadPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

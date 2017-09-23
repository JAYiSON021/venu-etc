import { PortalVenuPage } from './app.po';

describe('portal-venu App', () => {
  let page: PortalVenuPage;

  beforeEach(() => {
    page = new PortalVenuPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to vn!!');
  });
});

import { JulaiPage } from './app.po';

describe('julai App', () => {
  let page: JulaiPage;

  beforeEach(() => {
    page = new JulaiPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});

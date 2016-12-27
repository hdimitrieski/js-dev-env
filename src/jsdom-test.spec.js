import { expect } from 'chai';
import fs from 'fs';
import jsdom from 'jsdom';

describe('JSDOM Test', () => {

  it('should say hello', (done) => {
    const index = fs.readFileSync('./index.html', 'utf-8');

    jsdom.env(index, (err, window) => {
      const h1 = window.document.getElementsByTagName('h1')[0];
      expect(h1.innerHtml).to.equal('Hello');
      done();
      window.close();
    });
  });

});

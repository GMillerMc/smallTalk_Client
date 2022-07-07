/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(
  path.resolve(__dirname, "../index.html"),
  "utf8"
);

describe('index.html', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString()
  })
  describe('head', () => {
    test('it has a title', () => {
      const title = document.querySelector('title')
      expect(title.textContent).toContain('Small Talk')
    })
  })


  
  // Testing Sidebar Section
  describe('body', () => {
    it('it has material icons', () => {
      let heading = document.getElementsByClassName('sidebar')
      expect(heading).toBeTruthy()
    })
  })
  
  // Form testing
  describe('body', () => {
    it('it has a form', () => {
      let heading = document.querySelector('#form')
      expect(heading).toBeTruthy()
    })
  })

  // has Submit button 
        describe('html', () => {
            test('it has a submit button', () => {
                let postButton = document.getElementsByClassName('postButton');
                expect(postButton).toBeTruthy();
            })

        })

    // Gif Testing
    describe('body', () => {
      it('it has a random gif button', () => {
        let heading = document.getElementsByTagName('gifButton-random')
        expect(heading).toBeTruthy()
      })
    })


})

test('use jsdom in this test file', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});
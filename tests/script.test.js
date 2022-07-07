/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");
global.fetch = require("jest-fetch-mock");

let app;

describe("app", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    app = require("../client/script.js");
  });
  afterEach(() => {
    fetch.resetMocks();
  });

  describe("requests", () => {
    describe("testing random num generator", () => {
      test("get a random number between two values", () => {
        let min = 2;
        let max = 10;

        const int = app.getRandomInt(min, max);

        expect(int).toBeGreaterThanOrEqual(min);
        expect(int).toBeLessThan(max);
      });
    });

    describe("check create post function", () => {
      test("check that random name has been generated", () => {
        const fakeSubmitEvent = {
          preventDefault: jest.fn(),
          target: {
            text: "e.target.journalPost.value",
            react: [0, 0, 0],
            comments: [],
          },
        };

        app.createPost(fakeSubmitEvent);
        expect(app.randomNameGenerator()).toBeTruthy();

        app.gifReact(fakeSubmitEvent, 1);
      });
    });

    describe("testing gif react", () => {
      test("check that random name has been generated", () => {
        const fakeSubmitEvent = {
          preventDefault: jest.fn(),
          target: {
            text: "e.target.journalPost.value",
            react: [0, 0, 0],
            comments: [],
          },
        };
        // app.loadPosts(fakeSubmitEvent,1)

        // const spy = jest.spyOn(app, loadPosts(fakeSubmitEvent,1));

        // expect(spy).toBe(true)
      });
    });
  });
});

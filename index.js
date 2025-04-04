const assert = require("assert");
const { MockAgent, setGlobalDispatcher, request } = require("undici");

const mockAgent = new MockAgent();
mockAgent.disableNetConnect();

mockAgent
  .get("https://example.com")
  .intercept({ path: "/qux-a" })
  .reply(200, "qux-a");

mockAgent
  .get("https://example.com")
  .intercept({ path: "/qux-b", query: { arraykey: ["a", "b"] } })
  .reply(200, "qux-b");

mockAgent
  .get("https://example.com")
  .intercept({ path: "/qux-c", query: { arraykey: ["a", "b"] } })
  .reply(200, "qux-c");


setGlobalDispatcher(mockAgent);

const tests = [
    {
        url: "https://example.com/qux-a",
        expectedResponse: "qux-a",
      },  {
        url: "https://example.com/qux-b?arraykey=a&arraykey=b",
        expectedResponse: "qux-b",
      },  {
        url: "https://example.com/qux-c?arraykey[]=a&arraykey[]=b",
        expectedResponse: "qux-c",
      },
];

tests.forEach(async ({url, expectedResponse}) => {
    let response = '';
    try {
        response = await (await request(url)).body.text();
      } catch {
        response = 'an error occurred';
    }
    assert.strictEqual(response, expectedResponse);
})

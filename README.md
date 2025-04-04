# undici-square-params-repro

This is a reproduction showing that the `MockAgent` from `undici`
doesn't seem to intercepts of requests with search params containing
square brackets

e.g. `https://example.com/qux-c?arraykey[]=a&arraykey[]=b`

## Steps to run the reproduction

Simply run
```bash
npm i
npm start
```
and see the failing test

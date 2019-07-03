<h1 align="center">
  <a href="https://ipfs.io"><img width="720" src="https://ipfs.io/ipfs/QmdPAhQRxrDKqkGPvQzBvjYe3kU8kiEEAd2J6ETEamKAD9" alt="IPFS HTTP client LITE logo" /></a>
</h1>

<h3 align="center">A lightweight JavaScript HTTP client library for IPFS.</h3>

> An alternative client library for the IPFS HTTP API, aiming to be as lightweight as possible (<20KB) in the browser.

## Lead Maintainer

[Alan Shaw](http://github.com/alanshaw).

## Table of Contents

- [Install](#install)
- [Usage](#usage)
  - [Running the daemon with the right port](#running-the-daemon-with-the-right-port)
  - [CORS](#cors)
  - [Custom HTTP Headers](#custom-http-headers)
  - [Importing](#importing)
  - [API Docs](#api)
- [Contribute](#contribute)
- [License](#license)

## Install

This module requires Node.js and npm to install:

```sh
npm install --save ipfs-http-client-lite
```

We support both the Current and Active LTS versions of Node.js. Please see [nodejs.org](https://nodejs.org/) for what these currently are.

## Usage

### Running the daemon with the right port

To interact with the API, you need to have a local daemon running. It needs to be open on the right port. `5001` is the default, and is used in the examples below, but it can be set to whatever you need.

```sh
# Show the ipfs config API port to check it is correct
> ipfs config Addresses.API
/ip4/127.0.0.1/tcp/5001
# Set it if it does not match the above output
> ipfs config Addresses.API /ip4/127.0.0.1/tcp/5001
# Restart the daemon after changing the config

# Run the daemon
> ipfs daemon
```

### CORS

In a web browser IPFS HTTP client (either browserified or CDN-based) might encounter an error saying that the origin is not allowed. This would be a CORS ("Cross Origin Resource Sharing") failure: IPFS servers are designed to reject requests from unknown domains by default. You can whitelist the domain that you are calling from by changing your ipfs config like this:

```console
$ ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin  '["http://example.com"]'
$ ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'
```

### Custom HTTP Headers

If you wish to send custom headers with each request made by this library, for example, the Authorization header. You can use the config to do so:

```js
const ipfs = IpfsHttpClientLite({
  apiUrl: 'http://localhost:5001',
  headers: {
    Authorization: 'Bearer ' + TOKEN
  }
})
```

### Importing

```js
const IpfsHttpClientLite = require('ipfs-http-client-lite')

// Connect to ipfs daemon HTTP API server
const ipfs = IpfsHttpClientLite('http://localhost:5001')
// Note: leaving out the argument will default to this value
```

For ultra small bundle size, import just the methods you need. e.g.

```js
const cat = require('ipfs-http-client-lite/src/cat')('http://localhost:5001')
const data = await cat('QmQeEyDPA47GqnduyVVWNdnj6UBPXYPVWogAQoqmAcLx6y')
```

#### In a web browser

**Bundling**

This module can be bundled with webpack and browserify and should be compatible with most other bundlers.

**CDN**

Instead of a local installation (and bundling) you may request a remote copy of the IPFS HTTP API client from [unpkg CDN](https://unpkg.com/).

To always request the latest version, use the following:

```html
<!-- loading the minified version -->
<script src="https://unpkg.com/ipfs-http-client-lite/dist/index.min.js"></script>
<!-- loading the human-readable (not minified) version -->
<script src="https://unpkg.com/ipfs-http-client-lite/dist/index.js"></script>
```

For maximum security you may also decide to:

* Reference a specific version of the IPFS HTTP API client (to prevent unexpected breaking changes when a newer latest version is published)
* [Generate a SRI hash](https://www.srihash.org/) of that version and use it to ensure integrity
* Set the [CORS settings attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) to make anonymous requests to CDN

Example:

```html
<script src="https://unpkg.com/ipfs-http-client-lite@1.0.0/dist/index.js"
integrity="sha384-5bXRcW9kyxxnSMbOoHzraqa7Z0PQWIao+cgeg327zit1hz5LZCEbIMx/LWKPReuB"
crossorigin="anonymous"></script>
```

The CDN-based IPFS HTTP API provides the `IpfsHttpClientLite` constructor as a property of the global `window` object. Example:

```js
const ipfs = window.IpfsHttpClientLite('http://localhost:5001')
```

If you omit the URL, the client will parse `window.location.host`, and use this information. This also works, and can be useful if you want to write apps that can be run from multiple different gateways:

```js
const ipfs = window.IpfsHttpClientLite()
```

### API

This module is in heavy development, not all API methods are available (or documented) yet!

* [IpfsHttpClientLite](./API.md#ipfshttpclientlite)
* [add](./API.md#add)
* [addPullStream](./API.md#addpullstream) TODO: add docs
* [addFromStream](./API.md#addfromstream) TODO: add docs
* [addFromURL](./API.md#addfromurl) TODO: add docs
* [bitswap.stat](./API.md#bitswapstat) TODO: add docs
* [bitswap.wantlist](./API.md#bitswapwantlist) TODO: add docs
* [block.get](./API.md#blockget) TODO: add docs
* [cat](./API.md#cat)
* [catPullStream](./API.md#catpullstream) TODO: add docs
* [ls](./API.md#ls) TODO: add docs
* [lsPullStream](./API.md#lspullstream) TODO: add docs
* [id](./API.md#id) TODO: add docs
* [ping](./API.md#ping) TODO: add docs
* [pingPullStream](./API.md#pingpullstream) TODO: add docs
* [swarm.connect](./API.md#swarmconnect) TODO: add docs
* [swarm.peers](./API.md#swarmpeers) TODO: add docs
* [version](./API.md#version) TODO: add docs

Note: All API methods are documented using Promises/async/await but they also accept a callback as their last parameter.

### Testing

We run tests by executing `npm test` in a terminal window. This will run both Node.js and Browser tests, both in Chrome and PhantomJS. To ensure that the module conforms with the [`interface-ipfs-core`](https://github.com/ipfs/interface-ipfs-core) spec, we run the batch of tests provided by the interface module, which can be found [here](https://github.com/ipfs/interface-ipfs-core/tree/master/js/src).

## Contribute

Feel free to dive in! [Open an issue](https://github.com/ipfs-shipyard/js-ipfs-http-client-lite/issues/new) or submit PRs.

**Want to hack on IPFS?**

[![](https://cdn.rawgit.com/jbenet/contribute-ipfs-gif/master/img/contribute.gif)](https://github.com/ipfs/community/blob/master/CONTRIBUTING.md)

## License

Dual-licensed under Apache 2.0 and MIT terms:
- Apache License, Version 2.0, ([LICENSE-APACHE](https://github.com/ipfs-shipyard/js-ipfs-http-client-lite/blob/master/LICENSE-APACHE) or http://www.apache.org/licenses/LICENSE-2.0)
- MIT license ([LICENSE-MIT](https://github.com/ipfs-shipyard/js-ipfs-http-client-lite/blob/master/LICENSE-MIT) or http://opensource.org/licenses/MIT)

# API

* [IpfsHttpClientLite](#ipfshttpclientlite)
* [add](#add)
* [addPullStream](#addpullstream)
* [addFromStream](#addfromstream) TODO: add docs
* [addFromURL](#addfromurl) TODO: add docs
* [bitswap.stat](#bitswapstat) TODO: add docs
* [bitswap.wantlist](#bitswapwantlist) TODO: add docs
* [block.get](#blockget) TODO: add docs
* [cat](#cat)
* [catPullStream](#catpullstream) TODO: add docs
* [ls](#ls) TODO: add docs
* [lsPullStream](#lspullstream) TODO: add docs
* [id](#id) TODO: add docs
* [ping](#ping) TODO: add docs
* [pingPullStream](#pingpullstream) TODO: add docs
* [swarm.connect](#swarmconnect) TODO: add docs
* [swarm.peers](#swarmpeers) TODO: add docs
* [version](#version) TODO: add docs

Note: All API methods are documented using Promises/async/await but they also accept a callback as their last parameter.

---

## `IpfsHttpClientLite`

Construct a new IPFS client.

### `IpfsHttpClientLite([url])`

#### Parameters

* `url` (optional) - URL of the API endpoint to use.
    * Type: `String`
    * Default: `http://localhost:5001` in Node.js or `window.location.origin` in the browser.

### `IpfsHttpClientLite([options])`

#### Parameters

* `options` (optional)
    * Type: `Object`
    * Default: `null`
* `options.apiPath` (optional) - The API path from the root.
    * Type: `String`
    * Default: `/api/v0`
* `options.apiUrl` (optional) - URL of the API endpoint to use.
    * Type: `String`
    * Default: `http://localhost:5001` in Node.js or `window.location.origin` in the browser.
* `options.fetch` (optional) - Custom `fetch` implementation.
    * Type: `Function`
    * Default: `node-fetch` in Node.js and `window.fetch` in the browser.
* `options.headers` (optional) - Custom HTTP headers to send with _every_ request.
    * Type: `Object`
    * Default: `{ 'User-Agent': 'ipfs-http-client-lite/1.0.0' }`

## `add`

Add/import files and directories to IPFS and retrieve their CID(s).

### `add(input, [options]): Promise<Object[]>`

#### Parameters

* `input` - File contents or (for multiple files), description objects specifying file path and contents to add.
    * Type (one of):
        * `Buffer`, or "buffer like": `ArrayBuffer`/`TypedArray`
        * `Blob`/`File` (browser only)
        * `{ path, content: Buffer }`
        * `{ path, content: Iterable<Number> }`
        * `{ path, content: AsyncIterable<Buffer> }`
        * `{ path, content: PullStream<Buffer> }`
        * `Iterable<Number>` (e.g. array of bytes)
        * `Iterable<{ path, content: Buffer }>`
        * `Iterable<{ path, content: Iterable<Number> }>`
        * `Iterable<{ path, content: AsyncIterable<Buffer> }>`
        * `Iterable<{ path, content: PullStream<Buffer> }>`
        * `AsyncIterable<Buffer>` (e.g. a Node.js Stream)
        * `AsyncIterable<{ path, content: Buffer }>`
        * `AsyncIterable<{ path, content: Iterable<Number> }>`
        * `AsyncIterable<{ path, content: AsyncIterable<Buffer> }>`
        * `AsyncIterable<{ path, content: PullStream<Buffer> }>`
        * `PullStream<Buffer>`
* `options` (optional)
    * Type: `Object`
    * Default: `null`
* `options.chunker` (optional) - Chunking algorithm used to build IPFS DAGs.
    * Type: `String`. Available formats:
        - size-{size}
        - rabin
        - rabin-{avg}
        - rabin-{min}-{avg}-{max}
    * Default: `size-262144`
* `options.cidVersion` (optional) - The CID version to use when storing the data (storage keys are based on the CID, including its version).
    * Type: `Number` (0 or 1)
    * Default: `0`
* `options.cidBase` (optional) - Number base to display CIDs in. [Available values](https://github.com/multiformats/js-multibase/blob/master/src/constants.js).
    * Type: `String`
    * Default: `base58btc` for v0 CIDs or `base32` for v1 CIDs
* `options.enableShardingExperiment` (optional) - Allows to create directories with an unlimited number of entries currently size of UnixFS directories is limited by the maximum block size. Note this is an experimental feature.
    * Type: `Boolean`
    * Default: `false`
* `options.hashAlg` (optional) - Hashing algorithm to use when creating the CID(s). [Available values]( https://github.com/multiformats/js-multihash/blob/master/src/constants.js#L5-L343).
    * Type: `String`
    * Default: `sha2-256`
* `options.onlyHash` (optional) - Do not add the file(s) to IPFS, only calculate the CID(s).
    * Type: `Boolean`
    * Default: `false`
* `options.pin` (optional) - Pin the file(s) when adding. Setting this option to `false` will mean added files will be removed from your IPFS node when garbage collection is run.
    * Type: `Boolean`
    * Default: `true`
* `options.progress` (optional) - A function that receives progress updates as data is added to IPFS. It is called with the byte length of chunks as a file is added to IPFS.
    * Type: `Function(bytes<Number>)`
    * Default: `null`
* `options.quiet` (optional) - Return a minimal output.
    * Type: `Boolean`
    * Default: `false`
* `options.quieter` (optional) - Return only the final CID.
    * Type: `Boolean`
    * Default: `false`
* `options.rawLeaves` (optional) - If `true`, DAG leaves will contain raw file data and not be wrapped in a protobuf.
    * Type: `Boolean`
    * Default: `false` for v0 CIDs or `true` for v1 CIDs
* `options.shardSplitThreshold` (optional) - Specifies the maximum size of unsharded directory that can be generated.
    * Type: `Number`
    * Default: `1000`
* `options.signal` (optional) - A signal that can be used to abort the request
    * Type: [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
    * Default: `null`
- `options.silent` (optional) - Return no output.
    * Type: `Boolean`
    * Default: `false`
- `options.trickle` (optional) - If `true` will use the trickle DAG format for DAG generation.
  [Trickle definition from go-ipfs documentation](https://godoc.org/github.com/ipsn/go-ipfs/gxlibs/github.com/ipfs/go-unixfs/importer/trickle).
    * Type: `Boolean`
    * Default: `false`
- `options.wrapWithDirectory` (optional) - Add a directory node that contains all the added files.
    * Type: `Boolean`
    * Default: `false`

#### Returns

An array of objects with details for each file and directory that was created.

* Type: `Promise<Object[]>`

Each `Object` in the array has the following properties:

* `name` - Path for the file/directory that was added (will be equal to `hash` if no path was given)
    * Type: `String`
* `hash` - CID of the file or directory
    * Type: `String`
* `size` - File size in bytes
    * Type: `String`

#### Examples

##### Single file

A buffer:

```js
const data = Buffer.from('hello world!')
const res = await ipfs.add(data)
console.log(res)
/*
[
  {
    name: 'QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j',
    hash: 'QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j',
    size: '20'
  }
]
*/
```

A stream:

```js
const res = await ipfs.add(fs.createReadStream('./package.json'))
console.log(res)
/*
[
  {
    name: 'package.json',
    hash: 'QmPoPzFTHedjR4TJcQwx1rPv8YSqAnzzFT35194vC8UShH',
    size: '1919'
  }
]
*/
```

##### Multiple files

```js
const res = await ipfs.add([
  { path: 'my-package.json', content: fs.createReadStream('./package.json') },
  { path: 'hello.txt', content: Buffer.from('hello world!') }
])
console.log(res)
/*
[
  {
    name: 'my-package.json',
    hash: 'QmPoPzFTHedjR4TJcQwx1rPv8YSqAnzzFT35194vC8UShH',
    size: '1919'
  },
  {
    name: 'hello.txt',
    hash: 'QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j',
    size: '20'
  }
]
*/
```

Wrap multiple files in a directory:

In this example, the last item in the array is the wrapping directory, it allows you to access `hello.txt` using `ipfs.cat` with the following path `/ipfs/QmVY4sGYjQ4RNmJNBaJiWocTYAkzi4CkHfT16cXGouMdN7/hello.txt` but it can also be accessed using `ipfs.cat` with `/ipfs/QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j` (note the former uses the directory CID and the latter uses the file CID).

```js
const res = await ipfs.add([
  { path: 'my-package.json', content: fs.createReadStream('./package.json') },
  { path: 'hello.txt', content: Buffer.from('hello world!') }
], {
  wrapWithDirectory: true
})
console.log(res)
/*
[
  {
    name: 'my-package.json',
    hash: 'QmPoPzFTHedjR4TJcQwx1rPv8YSqAnzzFT35194vC8UShH',
    size: '1919'
  },
  {
    name: 'hello.txt',
    hash: 'QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j',
    size: '20'
  },
  {
    name: '',
    hash: 'QmVY4sGYjQ4RNmJNBaJiWocTYAkzi4CkHfT16cXGouMdN7',
    size: '2052'
  }
]
*/
```

## `addPullStream`

Add/import files and directories to IPFS via pull streams and retrieve their CID(s).

### `addPullStream([options]): PullThrough`

#### Parameters

* `options` (optional) See docs for [`add`](#add) for available options.
    * Type: `Object`
    * Default: `null`

#### Returns

A "through" pull stream that can be used in a pull pipeline.

#### Examples

##### Single file

```js
const data = Buffer.from('hello world!')

pull(
  pull.values([data]),
  ipfs.addPullStream(),
  pull.collect((err, res) => console.log(res))
)

/*
[
  {
    name: 'QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j',
    hash: 'QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j',
    size: '20'
  }
]
*/
```

##### Multiple files

```js
pull(
  pull.values([
    { path: 'my-package.json', content: fs.createReadStream('./package.json') },
    { path: 'hello.txt', content: Buffer.from('hello world!') }
  ]),
  ipfs.addPullStream(),
  pull.collect((err, res) => console.log(res))
)

/*
[
  {
    name: 'my-package.json',
    hash: 'QmPoPzFTHedjR4TJcQwx1rPv8YSqAnzzFT35194vC8UShH',
    size: '1919'
  },
  {
    name: 'hello.txt',
    hash: 'QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j',
    size: '20'
  }
]
*/
```

## `cat`

Read files from IPFS.

### `cat(ipfsPath, [options]): Promise<Buffer>`

#### Parameters

* `ipfsPath` - The IPFS path or CID of the file to read.
    * Type: `String`
* `options` (optional)
    * Type: `Object`
    * Default: `null`
* `options.offset` (optional) - Byte offset to start reading from
    * Type: `Number`
    * Default: `0`
* `options.length` (optional) - Number of bytes to read
    * Type: `Number`
    * Default: `null` (read to the end of the file)

#### Returns

A buffer containing the bytes for the file.

* Type: `Promise<Buffer>`

#### Examples

An IPFS path:

```js
const data = await ipfs.cat('/ipfs/QmVY4sGYjQ4RNmJNBaJiWocTYAkzi4CkHfT16cXGouMdN7/hello.txt')
console.log(data.toString('utf8'))
/*
hello world!
*/
```

A CID:

```js
const data = await ipfs.cat('QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j')
console.log(data.toString('utf8'))
/*
hello world!
*/
```

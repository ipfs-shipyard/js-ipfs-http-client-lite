# API

* [IpfsHttpClientLite](#ipfshttpclientlite)
* [add](#add)
* addFromFs
* [addFromStream](#addfromstream) TODO: add docs
* [addFromURL](#addfromurl) TODO: add docs
* [addPullStream](#addpullstream)
* [bitswap.stat](#bitswapstat) TODO: add docs
* [bitswap.wantlist](#bitswapwantlist) TODO: add docs
* [block.get](#blockget)
* [block.put](#blockput)
* [block.stat](#blockstat)
* bootstrap.add
* bootstrap.list
* bootstrap.rm
* [cat](#cat)
* [catPullStream](#catpullstream) TODO: add docs
* config.get
* config.replace
* config.set
* dag.get
* dag.put
* dag.tree
* dht.findPeer
* dht.findProvs
* dht.get
* dht.provide
* dht.put
* dht.query
* dns
* [files.cp](#filescp)
* files.flush
* files.ls
* files.lsPullStream
* [files.mkdir](#filesmkdir)
* files.mv
* files.read
* files.readPullStream
* files.rm
* files.stat
* [files.write](#fileswrite)
* [id](#id) TODO: add docs
* key.export
* key.gen
* key.import
* key.list
* key.rename
* key.rm
* [ls](#ls) TODO: add docs
* [lsPullStream](#lspullstream) TODO: add docs
* name.pubsub.cancel
* name.pubsub.state
* name.pubsub.subs
* object.data
* object.get
* object.links
* object.new
* object.patch.addLink
* object.patch.appendData
* object.patch.rmLink
* object.patch.setData
* object.put
* pin.add
* pin.ls
* pin.rm
* [ping](#ping) TODO: add docs
* [pingPullStream](#pingpullstream) TODO: add docs
* [pubsub.ls](#pubsubls)
* [pubsub.peers](#pubsubpeers)
* [pubsub.publish](#pubsubpublish)
* [pubsub.subscribe](#pubsubsubscribe)
* [pubsub.unsubscribe](#pubsubunsubscribe)
* refs
* refsPullStream
* refs.local
* refs.localPullStream
* repo.gc
* repo.stat
* repo.version
* resolve
* shutdown
* stats.bitswap
* stats.bw
* stats.bwPullStream
* stats.repo
* swarm.addrs
* [swarm.connect](#swarmconnect)
* swarm.disconnect
* swarm.localAddrs
* [swarm.peers](#swarmpeers)
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
* `options.headers` (optional) - Custom HTTP headers to send
    * Type: `Object`
    * Default: `null`
* `options.onlyHash` (optional) - Do not add the file(s) to IPFS, only calculate the CID(s).
    * Type: `Boolean`
    * Default: `false`
* `options.pin` (optional) - Pin the file(s) when adding. Setting this option to `false` will mean added files will be removed from your IPFS node when garbage collection is run.
    * Type: `Boolean`
    * Default: `true`
* `options.progress` (optional) - A function that receives progress updates as data is added to IPFS. It is called with the byte length of chunks as a file is added to IPFS.
    * Type: `Function(bytes<Number>)`
    * Default: `null`
* `options.qs` (optional) - Additional query string parameters
    * Type: `Object`
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

## block.get

Fetch a raw block from the IPFS block store or the network via bitswap if not local.

### `block.get(cid, [options]): Promise<Buffer>`

#### Parameters

* `cid` - CID of the block to fetch
    * Type: `String`
* `options` (optional)
    * Type: `Object`
    * Default: `null`
* `options.headers` (optional) - Custom HTTP headers to send
    * Type: `Object`
    * Default: `null`
* `options.qs` (optional) - Additional query string parameters
    * Type: `Object`
    * Default: `null`
* `options.signal` (optional) - A signal that can be used to abort the request
    * Type: [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
    * Default: `null`

#### Returns

A buffer containing the raw bytes of the block.

* Type: `Promise<Buffer>`

#### Example

```js
const data = await ipfs.block.get('zdpuAtpzCB7ma5zNyCN7eh1Vss1dHWuScf91DbE1ix9ZTbjAk')
console.log(data) // buffer containing block data
```

## block.put

Put a block into the IPFS block store.

### `block.put(data, [options]): Promise<Object>`

#### Parameters

* `data` - Raw data for this block
    * Type: `Buffer`/`Blob`/`File`
* `options` (optional)
    * Type: `Object`
    * Default: `null`
* `options.format` (optional) - Name of the IPLD format this block is encoded with
    * Type: `String`
    * Default: `dag-pb`
* `options.headers` (optional) - Custom HTTP headers to send
    * Type: `Object`
    * Default: `null`
* `options.mhtype` (optional) - Name of the multihash hashing algorithm to use
    * Type: `String`
    * Default: `sha2-256`
* `options.mhlen` (optional) - Length of the hash in bits
    * Type: `Number`
    * Default: `256`
* `options.pin` (optional) - Pin this block so it is not garbage collected
    * Type: `Boolean`
    * Default: `false`
* `options.qs` (optional) - Additional query string parameters
    * Type: `Object`
    * Default: {}
* `options.signal` (optional) - A signal that can be used to abort the request
    * Type: [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
    * Default: `null`

#### Returns

CID and size for the block that was added.

* Type: `Promise<Object>`

The `Object` has the following properties:

* `key` - The CID of the block
    * Type: `String`
* `size` - Size of the block in bytes
    * Type: `Number`

#### Examples

```js
const data = Buffer.from('blorb')
const res = await ipfs.block.put(data)
console.log(res)
/*
{ key: 'QmPv52ekjS75L4JmHpXVeuJ5uX2ecSfSZo88NSyxwA3rAQ', size: 5 }
*/
```

## block.stat

Get status for a block.

### `block.stat(cid, [options]): Promise<Object>`

#### Parameters

* `cid` - CID of the block
    * Type: `String`
* `options` (optional)
    * Type: `Object`
    * Default: `null`
* `options.headers` (optional) - Custom HTTP headers to send
    * Type: `Object`
    * Default: `null`
* `options.qs` (optional) - Additional query string parameters
    * Type: `Object`
    * Default: `null`
* `options.signal` (optional) - A signal that can be used to abort the request
    * Type: [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
    * Default: `null`

#### Returns

CID and size of the block.

* Type: `Promise<Object>`

The `Object` has the following properties:

* `key` - The CID of the block
    * Type: `String`
* `size` - Size of the block in bytes
    * Type: `Number`

#### Examples

```js
const res = await ipfs.block.stat('zb2rhj7crUKTQYRGCRATFaQ6YFLTde2YzdqbbhAASkL9uRDXn')
console.log(res)
/*
{ key: 'zb2rhj7crUKTQYRGCRATFaQ6YFLTde2YzdqbbhAASkL9uRDXn', size: 11 }
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
* `options.headers` (optional) - Custom HTTP headers to send
    * Type: `Object`
    * Default: `null`
* `options.offset` (optional) - Byte offset to start reading from
    * Type: `Number`
    * Default: `0`
* `options.length` (optional) - Number of bytes to read
    * Type: `Number`
    * Default: `null` (read to the end of the file)
* `options.qs` (optional) - Additional query string parameters
    * Type: `Object`
    * Default: `null`
* `options.signal` (optional) - A signal that can be used to abort the request
    * Type: [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
    * Default: `null`

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

## files.cp

Copy files into [MFS](https://docs.ipfs.io/guides/concepts/mfs/).

### `files.cp(...from, to, [options]): Promise`

#### Parameters

* `from` - Path(s) of the source to copy. It might be an existing MFS path to a file or a directory (e.g. `/my-dir/my-file.txt`) or an IPFS path (e.g. `/ipfs/QmWGeRAEgtsHW3ec7U4qW2CyVy7eA2mFRVbk1nb24jFyks`)
    * Type: `String`
* `to` - Path of the destination to copy to
    * Type: `String`
* `options` (optional)
    * Type: `Object`
    * Default: `null`
* `options.flush` (optional) - Immediately flush MFS changes to disk
    * Type: `Boolean`
    * Default: `true`
* `options.format` (optional) - Type of nodes to write any newly created directories as
    * Type: `String`
    * Default: `dag-pb`
* `options.hashAlg` (optional) - Hashing algorithm to use when creating the CID(s). [Available values]( https://github.com/multiformats/js-multihash/blob/master/src/constants.js#L5-L343).
    * Type: `String`
    * Default: `sha2-256`
* `options.headers` (optional) - Custom HTTP headers to send
    * Type: `Object`
    * Default: `null`
* `options.parents` (optional) - Create parent directories if they do not exist
    * Type: `Boolean`
    * Default: `false`
* `options.qs` (optional) - Additional query string parameters
    * Type: `Object`
    * Default: `null`
* `options.signal` (optional) - A signal that can be used to abort the request
    * Type: [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
    * Default: `null`

If `from` has multiple values then `to` must be a directory.

If `from` has a single value and `to` exists and is a directory, `from` will be copied into `to`.

If `from` has a single value and `to` exists and is a file, `from` must be a file and the contents of `to` will be replaced with the contents of `from` otherwise an error will be thrown.

If `from` is an IPFS path, and an MFS path exists with the same name, the IPFS path will be chosen.

#### Returns

A promise that resolves when the operation is complete.

* Type: `Promise`

#### Examples

```js
// To copy a file
await ipfs.files.cp('/src-file', '/dst-file')

// To copy a directory
await ipfs.files.cp('/src-dir', '/dst-dir')

// To copy multiple files to a directory
await ipfs.files.cp('/src-file1', '/src-file2', '/dst-dir')
```

## files.mkdir

Make a directory in [MFS](https://docs.ipfs.io/guides/concepts/mfs/).

### `files.mkdir(path, [options]): Promise`

#### Parameters

* `path` - path to the directory to make
    * Type: `String`
* `options` (optional)
    * Type: `Object`
    * Default: `null`
* `options.cidVersion` (optional) - The CID version to use when storing the data (storage keys are based on the CID, including its version).
    * Type: `Number` (0 or 1)
    * Default: `0`
* `options.flush` (optional) - Immediately flush MFS changes to disk
    * Type: `Boolean`
    * Default: `true`
* `options.format` (optional) - Type of nodes to write any newly created directories as
    * Type: `String`
    * Default: `dag-pb`
* `options.hashAlg` (optional) - Hashing algorithm to use when creating the CID(s). [Available values]( https://github.com/multiformats/js-multihash/blob/master/src/constants.js#L5-L343).
    * Type: `String`
    * Default: `sha2-256`
* `options.headers` (optional) - Custom HTTP headers to send
    * Type: `Object`
    * Default: `null`
* `options.parents` (optional) - Create parent directories if they do not exist
    * Type: `Boolean`
    * Default: `false`
* `options.qs` (optional) - Additional query string parameters
    * Type: `Object`
    * Default: `null`
* `options.signal` (optional) - A signal that can be used to abort the request
    * Type: [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
    * Default: `null`

#### Returns

A promise that resolves when the operation is complete.

* Type: `Promise`

#### Examples

```js
await ipfs.files.mkdir('/my/beautiful/directory')
```

## files.write

Write to a file in [MFS](https://docs.ipfs.io/guides/concepts/mfs/).

### `files.write(path, content, [options]): Promise`

#### Parameters

* `path` - Path to the file that should be written to
    * Type: `String`
* `content` - File content
    * Type (one of):
        * `Buffer`, or "buffer like": `ArrayBuffer`/`TypedArray`
        * `Blob`/`File` (browser only)
        * `Iterable<Number>` (e.g. array of bytes)
        * `AsyncIterable<Buffer>` (e.g. a Node.js Stream)
        * `PullStream<Buffer>`
* `options` (optional)
    * Type: `Object`
    * Default: `null`
* `options.cidVersion` (optional) - The CID version to use when storing the data (storage keys are based on the CID, including its version).
    * Type: `Number` (0 or 1)
    * Default: `0`
* `options.count` (optional) - Number of bytes to write
    * Type: `Number`
    * Default: All bytes provided by `content`
* `options.create` (optional) - Create file if it does not exist
    * Type: `Boolean`
    * Default: `false`
* `options.hashAlg` (optional) - Hashing algorithm to use when creating the CID(s). [Available values]( https://github.com/multiformats/js-multihash/blob/master/src/constants.js#L5-L343).
    * Type: `String`
    * Default: `sha2-256`
* `options.headers` (optional) - Custom HTTP headers to send
    * Type: `Object`
    * Default: `null`
* `options.offset` (optional) - Byte offset to begin writing at
    * Type: `Number`
    * Default: `0`
* `options.parents` (optional) - Create parent directories if they do not exist
    * Type: `Boolean`
    * Default: `false`
* `options.qs` (optional) - Additional query string parameters
    * Type: `Object`
    * Default: `null`
* `options.rawLeaves` (optional) - DAG leaf nodes contain raw file data and are not wrapped in a protobuf
    * Type: `Boolean`
    * Default: `false`
* `options.signal` (optional) - A signal that can be used to abort the request
    * Type: [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
    * Default: `null`
* `options.truncate` (optional) - Truncate the file to size zero before writing
    * Type: `Boolean`
    * Default: `false`

#### Returns

A promise that resolves when the operation is complete.

* Type: `Promise`

#### Examples

```js
await ipfs.files.write('/hello-world', Buffer.from('Hello, world!'))
```

## pubsub.ls

List subscribed topics by name.

### `pubsub.ls([options]): Promise<String[]>`

#### Parameters

* `options` (optional)
    * Type: `Object`
    * Default: `null`
* `options.headers` (optional) - Custom HTTP headers to send
    * Type: `Object`
    * Default: `null`
* `options.qs` (optional) - Additional query string parameters
    * Type: `Object`
    * Default: `null`
* `options.signal` (optional) - A signal that can be used to abort the request
    * Type: [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
    * Default: `null`

#### Returns

An array of subscribed topic names.

* Type: `Promise<String[]>`

#### Examples

```js
const res = await ipfs.pubsub.ls()
console.log(res)
/*
[ 'my-pubsub-topic' ]
*/
```

## pubsub.peers

List peers we are currently pubsubbing with, optionally filtered by topic name.

### `pubsub.peers([topic], [options]): Promise<String[]>`

#### Parameters

* `topic` (optional) - Pubsub topic name to filter peer list by
    * Type: `String`
    * Default: `null`
* `options` (optional)
    * Type: `Object`
    * Default: `null`
* `options.headers` (optional) - Custom HTTP headers to send
    * Type: `Object`
    * Default: `null`
* `options.qs` (optional) - Additional query string parameters
    * Type: `Object`
    * Default: `null`
* `options.signal` (optional) - A signal that can be used to abort the request
    * Type: [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
    * Default: `null`

#### Returns

An array of string peer IDs.

* Type: `Promise<String[]>`

#### Examples

```js
const res = await ipfs.pubsub.peers()
console.log(res)
/*
[ 'QmPefeutipT4odZHRyBE3xBcWQxmBxZqS7n5zQxKZP9TNp' ]
*/
```

## pubsub.publish

Publish a message to a given pubsub topic.

### `pubsub.publish(topic, message, [options]): Promise`

#### Parameters

* `topic` - Pubsub topic name to publish the topic to
    * Type: `String`
* `message` - Message to publish
    * Type: `Buffer`/`ArrayBuffer`/`String`
* `options` (optional)
    * Type: `Object`
    * Default: `null`
* `options.headers` (optional) - Custom HTTP headers to send
    * Type: `Object`
    * Default: `null`
* `options.qs` (optional) - Additional query string parameters
    * Type: `Object`
    * Default: `null`
* `options.signal` (optional) - A signal that can be used to abort the request
    * Type: [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
    * Default: `null`

#### Returns

`Promise` resolved when the message has been published.

* Type: `Promise`

#### Examples

```js
await ipfs.pubsub.publish('my-pubsub-topic', Buffer.from('hello world!'))
```

## pubsub.subscribe

Subscribe to messages on a given topic.

**Note that in the browser there is a per-domain open request limit (6 for most browsers)**

### `pubsub.subscribe(topic, handler, [options]): Promise`

#### Parameters

* `topic` - Pubsub topic name to subscribe to messages for
    * Type: `String`
* `handler` - A function called every time this node receives a message for the given topic.
    * Type: `Function(msg<Object>)`. Message properties:
        * `from` - Peer ID of the peer this message came from
            * Type: `Buffer`
        * `data` - Raw message data
            * Type: `Buffer`
        * `seqno` - 20 byte random message number
            * Type: `Buffer`
        * `topicIDs` - Topic names this message was published to
            * Type: `String[]`
* `options` (optional)
    * Type: `Object`
    * Default: `null`
* `options.discover` (optional) - Try to discover other peers subscribed to the same topic
    * Type: `Boolean`
    * Deafult: `false`
* `options.headers` (optional) - Custom HTTP headers to send
    * Type: `Object`
    * Default: `null`
* `options.onError` (optional) - An error handler called when the request errors or parsing of a given message fails. It is passed two parameters, the error that occurred and a boolean indicating if it was a fatal error or not (fatal errors terminate the subscription).
    * Type: `Function(err<Error>, fatal<Boolean>)`
    * Default: `null`
* `options.qs` (optional) - Additional query string parameters
    * Type: `Object`
    * Default: `null`
* `options.signal` (optional) - A signal that can be used to abort the request
    * Type: [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
    * Default: `null`

#### Returns

`Promise` resolved when initial subscription has been set up.

* Type: `Promise`

#### Examples

```js
await ipfs.pubsub.subscribe('my-pubsub-topic', msg => {
  console.log(msg)
  console.log('data: ', msg.data.toString())
})
/*
{
  from: <Buffer 12 20 70 c6 f4 37 4d 49 d2 7f 3a 26 fd 3c 91 ac 15 40 57 f5 93 2d 96 2b ec 1b ce b5 76 10 0c 54 f8 ad>,
  data: <Buffer 68 69>,
  seqno: <Buffer 15 af 62 bb 78 af 86 79>,
  topicIDs: [ 'my-pubsub-topic' ]
}
data: hi
*/
```

## pubsub.unsubscribe

Stop receiving messages for a given topic.

### `pubsub.unsubscribe(topic, [handler]): Promise`

#### Parameters

* `topic` - Pubsub topic name to unsubscribe from.
    * Type: `String`
* `handler` (optional) - The handler function currently registered for this topic. If not provided, **all** handlers for the passed topic will be unsubscribed. Note this only works using the Promise API.
    * Type: `Function`
    * Default: `null`

#### Returns

`Promise` resolved when topic has been unsubscribed.

* Type: `Promise`

#### Examples

```js
const handler = msg => console.log(msg)
await ipfs.pubsub.unsubscribe('my-pubsub-topic', handler)
```

Unsubscribe all handlers:

```js
await ipfs.pubsub.unsubscribe('my-pubsub-topic')
```

## swarm.connect

Open a connection to a given address.

### `swarm.connect(addr, [options]): Promise<String[]>`

#### Parameters

* `addr` - Multiaddr address(es) of IPFS node(s) to connect to.
    * Type: `String`|`String[]`
* `options` (optional)
    * Type: `Object`
    * Default: `null`
* `options.headers` (optional) - Custom HTTP headers to send
    * Type: `Object`
    * Default: `null`
* `options.qs` (optional) - Additional query string parameters
    * Type: `Object`
    * Default: `null`
* `options.signal` (optional) - A signal that can be used to abort the request
    * Type: [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
    * Default: `null`

#### Returns

List of connection status messages for each peer connection attempted.

* Type: `Promise<String[]>`

#### Examples

```js
const res = await ipfs.swarm.connect('/ip4/127.0.0.1/tcp/4101/ipfs/Qmeg3LQNGuiwpinKe69YBbADV2PpqGcGtcgLeaNjoxuUdV')
console.log(res)
/*
[
  'connect Qmeg3LQNGuiwpinKe69YBbADV2PpqGcGtcgLeaNjoxuUdV success'
]
*/
```

## swarm.peers

List peers with open connections.

### `swarm.peers([options]): Promise<Object[]>`

#### Parameters

* `options` (optional)
    * Type: `Object`
    * Default: `null`
* `options.direction` (optional) - Return direction information for each peer (inbound/outbound).
    * Type: `Boolean`
    * Default: `false`
* `options.headers` (optional) - Custom HTTP headers to send
    * Type: `Object`
    * Default: `null`
* `options.latency` (optional) - Return latency information for each peer.
    * Type: `Boolean`
    * Default: `false`
* `options.qs` (optional) - Additional query string parameters
    * Type: `Object`
    * Default: `null`
* `options.signal` (optional) - A signal that can be used to abort the request
    * Type: [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
    * Default: `null`
* `options.streams` (optional) - Return streams information for each peer.
    * Type: `Boolean`
    * Default: `false`
* `options.verbose` (optional) - Return streams, latency, and direction info as well as address and ID for each peer.
    * Type: `Boolean`
    * Default: `false`

#### Returns

Peer information for peers with open connections.

* Type: `Promise<Object[]>`

#### Examples

```js
const peers = await ipfs.swarm.peers({ verbose: true })
console.log(res)
/*
[
  {
    addr: '/ip6/2a03:b0c0:3:e1::130:e001/tcp/4001',
    peer: 'QmYR4jxcGUTQZ7mA5DkfBSxpdJW5Y4CsfgHFfARLAV3goA',
    latency: '27.965651ms',
    muxer: '',
    direction: 2,
    streams: [ { protocol: '/ipfs/bitswap/1.1.0' } ]
  },
  {
    addr: '/ipfs/QmdGQoGuK3pao6bRDqGSDvux5SFHa4kC1XNFfHFcvcbydY/p2p-circuit',
    peer: 'QmcqrAQZqcQxrVpw2Png7FrSfNArfEFTu9UhPopmKPZpGP',
    latency: '772.455375ms',
    muxer: '',
    direction: 2,
    streams: [
      { protocol: '/ipfs/bitswap/1.1.0' },
      { protocol: '/ipfs/kad/1.0.0' }
    ]
  },
  // ...
]
*/
```

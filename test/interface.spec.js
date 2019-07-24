'use strict'
/* eslint-env mocha */

const tests = require('interface-ipfs-core')
const isNode = require('detect-node')
const CommonFactory = require('./utils/interface-common-factory')
// const isWindows = process.platform && process.platform === 'win32'

describe('interface-ipfs-core tests', () => {
  const defaultCommon = CommonFactory.create()

  tests.bitswap(defaultCommon, {
    skip: [
      // bitswap.stat
      {
        name: 'should not get bitswap stats when offline',
        reason: 'FIXME go-ipfs returns an error https://github.com/ipfs/go-ipfs/issues/4078'
      },
      // bitswap.wantlist
      {
        name: 'should not get the wantlist when offline',
        reason: 'FIXME go-ipfs returns an error https://github.com/ipfs/go-ipfs/issues/4078'
      }
    ]
  })

  tests.block(defaultCommon, {
    skip: [{
      name: 'should get a block added as CIDv1 with a CIDv0',
      reason: 'LITE: TODO: version param needs to be removed - not implemented in go-ipfs and not valid'
    }]
  })

  tests.bootstrap(defaultCommon, { skip: { reason: 'LITE: not implemented yet' } })

  tests.config(defaultCommon, {
    // skip: [
    //   // config.replace
    //   {
    //     name: 'replace',
    //     reason: 'FIXME Waiting for fix on go-ipfs https://github.com/ipfs/js-ipfs-http-client/pull/307#discussion_r69281789 and https://github.com/ipfs/go-ipfs/issues/2927'
    //   }
    // ]
    skip: { reason: 'LITE: not implemented yet' }
  })

  tests.dag(defaultCommon, {
    // skip: [
    //   // dag.tree
    //   {
    //     name: 'tree',
    //     reason: 'TODO vmx 2018-02-22: Currently the tree API is not exposed in go-ipfs'
    //   },
    //   // dag.get:
    //   {
    //     name: 'should get a dag-pb node local value',
    //     reason: 'FIXME vmx 2018-02-22: Currently not supported in go-ipfs, it might be possible once https://github.com/ipfs/go-ipfs/issues/4728 is done'
    //   },
    //   {
    //     name: 'should get dag-pb value via dag-cbor node',
    //     reason: 'FIXME vmx 2018-02-22: Currently not supported in go-ipfs, it might be possible once https://github.com/ipfs/go-ipfs/issues/4728 is done'
    //   },
    //   {
    //     name: 'should get by CID string + path',
    //     reason: 'FIXME vmx 2018-02-22: Currently not supported in go-ipfs, it might be possible once https://github.com/ipfs/go-ipfs/issues/4728 is done'
    //   },
    //   {
    //     name: 'should get only a CID, due to resolving locally only',
    //     reason: 'FIXME: go-ipfs does not support localResolve option'
    //   }
    // ]
    skip: { reason: 'LITE: not implemented yet' }
  })

  tests.dht(defaultCommon, {
    // skip: [
    //   // dht.findpeer
    //   {
    //     name: 'should fail to find other peer if peer does not exist',
    //     reason: 'FIXME checking what is exactly go-ipfs returning https://github.com/ipfs/go-ipfs/issues/3862#issuecomment-294168090'
    //   },
    //   // dht.findprovs
    //   {
    //     name: 'should provide from one node and find it through another node',
    //     reason: 'FIXME go-ipfs endpoint doesn\'t conform with the others https://github.com/ipfs/go-ipfs/issues/5047'
    //   },
    //   // dht.get
    //   {
    //     name: 'should get a value after it was put on another node',
    //     reason: 'FIXME go-ipfs errors with  Error: key was not found (type 6) https://github.com/ipfs/go-ipfs/issues/3862'
    //   }
    // ]
    skip: { reason: 'LITE: not implemented yet' }
  })

  tests.filesRegular(defaultCommon, {
    skip: [
      // .add
      {
        name: 'should not be able to add by path',
        reason: 'LITE: TODO: rework this test - is supported here'
      },
      {
        name: 'should not be able to add a string',
        reason: 'LITE: TODO: rework this test - is supported here'
      },
      {
        name: 'should not be able to add a non-Buffer TypedArray',
        reason: 'LITE: TODO: rework this test - is supported here'
      },
      {
        name: 'should fail when passed invalid input',
        reason: 'LITE: TODO: rework this test - is supported here'
      },
      {
        name: 'should add with only-hash=true (promised)',
        reason: 'LITE: TODO: unskip when object.get is implemented'
      },
      isNode ? null : {
        name: 'should add a nested directory as array of tupples',
        reason: 'FIXME https://github.com/ipfs/js-ipfs-http-client/issues/339'
      },
      isNode ? null : {
        name: 'should add a nested directory as array of tupples with progress',
        reason: 'FIXME https://github.com/ipfs/js-ipfs-http-client/issues/339'
      },
      // .addPullStream
      isNode ? null : {
        name: 'should add pull stream of valid files and dirs',
        reason: 'FIXME https://github.com/ipfs/js-ipfs-http-client/issues/339'
      },
      // .addReadableStream
      {
        name: 'addReadableStream',
        reason: 'LITE: Node.js streams not supported'
      },
      // .addFromStream
      isNode ? null : {
        name: 'addFromStream',
        reason: 'Not designed to run in the browser'
      },
      {
        name: 'should add from a stream',
        reason: 'LITE: into-stream does not return an async iterable stream'
      },
      // .addFromFs
      isNode ? null : {
        name: 'addFromFs',
        reason: 'Not designed to run in the browser'
      },
      {
        name: 'addFromFs',
        reason: 'LITE: TODO: implement'
      },
      // .addFromURL
      isNode ? null : {
        name: 'addFromURL',
        reason: 'Not designed to run in the browser'
      },
      {
        name: 'should add from a URL with only-hash=true',
        reason: 'LITE: TODO: unskip when object.get is implemented'
      },
      // TODO: remove when interface-ipfs-core updated
      isNode ? null : {
        name: 'addFromUrl',
        reason: 'Not designed to run in the browser'
      },
      // .cat
      {
        name: 'should cat with a Buffer multihash',
        reason: 'LITE: unable to deal with raw buffer CID'
      },
      // .catPullStream
      {
        name: 'should export a chunk of a file',
        reason: 'TODO not implemented in go-ipfs yet'
      },
      {
        name: 'should export a chunk of a file in a Pull Stream',
        reason: 'TODO not implemented in go-ipfs yet'
      },
      {
        name: 'should export a chunk of a file in a Readable Stream',
        reason: 'TODO not implemented in go-ipfs yet'
      },
      // .catReadableStream
      {
        name: 'catReadableStream',
        reason: 'LITE: Node.js streams not supported'
      },
      // .get
      isNode ? null : {
        name: 'should get a directory',
        reason: 'FIXME https://github.com/ipfs/js-ipfs-http-client/issues/339'
      },
      {
        name: 'get',
        reason: 'LITE: TODO: evaluate tar stream bundle overhead'
      },
      // .getReadableStream
      {
        name: 'getReadableStream',
        reason: 'LITE: Node.js streams not supported'
      },
      // .getPullStream
      {
        name: 'getPullStream',
        reason: 'LITE: TODO: evaluate tar stream bundle overhead'
      },
      // .ls
      isNode ? null : {
        name: 'should ls with a base58 encoded CID',
        reason: 'FIXME https://github.com/ipfs/js-ipfs-http-client/issues/339'
      },
      // .lsPullStream
      isNode ? null : {
        name: 'should pull stream ls with a base58 encoded CID',
        reason: 'FIXME https://github.com/ipfs/js-ipfs-http-client/issues/339'
      },
      // .lsReadableStream
      isNode ? null : {
        name: 'should readable stream ls with a base58 encoded CID',
        reason: 'FIXME https://github.com/ipfs/js-ipfs-http-client/issues/339'
      },
      {
        name: 'lsReadableStream',
        reason: 'LITE: Node.js streams not supported'
      },
      // .refs
      {
        name: 'dag refs test',
        reason: 'FIXME unskip when 0.4.21 is released'
      },
      {
        name: 'refs',
        reason: 'LITE: unskip when object API is implemented'
      },
      // .refsReadableStream
      {
        name: 'refsReadableStream',
        reason: 'LITE: Node.js streams not supported'
      },
      // .refsPullStream
      {
        name: 'refsPullStream',
        reason: 'LITE: unskip when object API is implemented'
      },
      // .refs.local
      {
        name: 'refsLocal',
        reason: 'LITE: unskip when refs API is implemented'
      },
      // .refs.localReadableStream
      {
        name: 'refsLocalReadableStream',
        reason: 'LITE: Node.js streams not supported'
      },
      // .refs.localPullStream
      {
        name: 'refsLocalPullStream',
        reason: 'LITE: unskip when refs API is implemented'
      }
    ]
  })

  tests.filesMFS(defaultCommon, {
    skip: [{
      name: 'write',
      reason: 'LITE: depends on stat, stat not implemented yet'
    },
    {
      name: 'stat',
      reason: 'LITE: not implemented yet'
    },
    {
      name: 'mv',
      reason: 'LITE: not implemented yet'
    },
    {
      name: 'rm',
      reason: 'LITE: not implemented yet'
    },
    {
      name: 'read',
      reason: 'LITE: not implemented yet'
    },
    {
      name: 'readReadableStream',
      reason: 'LITE: Node.js streams not supported'
    },
    {
      name: 'readPullStream',
      reason: 'LITE: not implemented yet'
    },
    {
      name: 'ls',
      reason: 'LITE: not implemented yet'
    },
    {
      name: 'lsReadableStream',
      reason: 'LITE: Node.js streams not supported'
    },
    {
      name: 'lsPullStream',
      reason: 'LITE: not implemented yet'
    },
    {
      name: 'flush',
      reason: 'LITE: not implemented yet'
    }]
  })

  tests.key(defaultCommon, {
    // skip: [
    //   // key.export
    //   {
    //     name: 'export',
    //     reason: 'TODO not implemented in go-ipfs yet'
    //   },
    //   // key.import
    //   {
    //     name: 'import',
    //     reason: 'TODO not implemented in go-ipfs yet'
    //   }
    // ]
    skip: { reason: 'LITE: not implemented yet' }
  })

  tests.miscellaneous(defaultCommon, {
    skip: [
      // // stop
      // {
      //   name: 'should stop the node',
      //   reason: 'FIXME go-ipfs returns an error https://github.com/ipfs/go-ipfs/issues/4078'
      // }
      { name: 'dns', reason: 'LITE: not implemented yet' },
      { name: 'stop', reason: 'LITE: not implemented yet' },
      { name: 'resolve', reason: 'LITE: not implemented yet' }
    ]
  })

  // TODO: uncomment after https://github.com/ipfs/interface-ipfs-core/pull/361 being merged and a new release
  tests.namePubsub(CommonFactory.create({
    spawnOptions: {
      args: ['--enable-namesys-pubsub'],
      initOptions: { bits: 1024 }
    }
  }), {
    // skip: [
    //   // name.pubsub.cancel
    //   {
    //     name: 'should cancel a subscription correctly returning true',
    //     reason: 'go-ipfs is really slow for publishing and resolving ipns records, unless in offline mode'
    //   },
    //   // name.pubsub.subs
    //   {
    //     name: 'should get the list of subscriptions updated after a resolve',
    //     reason: 'go-ipfs is really slow for publishing and resolving ipns records, unless in offline mode'
    //   }
    // ]
    skip: { reason: 'LITE: not implemented yet' }
  })

  tests.object(defaultCommon, { skip: { reason: 'LITE: not implemented yet' } })

  tests.pin(defaultCommon, { skip: { reason: 'LITE: not implemented yet' } })

  tests.ping(defaultCommon, {
    skip: [
      // TODO: LITE: add reason
      'should fail when pinging a peer that is not available',
      'pingReadableStream',
      'should fail when pinging an unknown peer over pull stream'
    ]
  })

  tests.pubsub(CommonFactory.create({
    spawnOptions: {
      args: ['--enable-pubsub-experiment'],
      initOptions: { bits: 1024, profile: 'test' }
    }
  }), {
    skip: [
      {
        name: 'should error on string messags',
        reason: 'LITE: revisit, allowed here'
      }
    ].concat(isNode ? [] : [
      {
        name: 'should subscribe and unsubscribe 10 times',
        reason: 'LITE: Max 6 open XHR requests in the browser - https://stackoverflow.com/questions/561046/how-many-concurrent-ajax-xmlhttprequest-requests-are-allowed-in-popular-browse'
      },
      {
        name: 'should subscribe 10 handlers and unsunscribe once with no reference to the handlers',
        reason: 'LITE: Max 6 open XHR requests in the browser - https://stackoverflow.com/questions/561046/how-many-concurrent-ajax-xmlhttprequest-requests-are-allowed-in-popular-browse'
      }
    ])
  })

  tests.repo(defaultCommon, { skip: { reason: 'LITE: not implemented yet' } })

  tests.stats(defaultCommon, { skip: { reason: 'LITE: not implemented yet' } })

  tests.swarm(defaultCommon, {
    skip: [
      { name: 'addrs', reason: 'LITE: not implemented yet' },
      { name: 'localAddrs', reason: 'LITE: not implemented yet' },
      { name: 'disconnect', reason: 'LITE: not implemented yet' }
    ]
  })
})

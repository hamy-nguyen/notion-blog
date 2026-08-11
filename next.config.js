const fs = require('fs')
const path = require('path')
const {
  NOTION_TOKEN,
  BLOG_INDEX_ID,
} = require('./src/lib/notion/server-constants')

try {
  fs.unlinkSync(path.resolve('.blog_index_data'))
} catch (_) {
  /* non fatal */
}
try {
  fs.unlinkSync(path.resolve('.blog_index_data_previews'))
} catch (_) {
  /* non fatal */
}

const warnOrError =
  process.env.NODE_ENV !== 'production'
    ? console.warn
    : (msg) => {
        throw new Error(msg)
      }

if (!NOTION_TOKEN) {
  // We aren't able to build or serve images from Notion without the
  // NOTION_TOKEN being populated
  warnOrError(
    `\nNOTION_TOKEN is missing from env, this will result in an error\n` +
      `Make sure to provide one before starting Next.js`
  )
}

if (!BLOG_INDEX_ID) {
  // We aren't able to build or serve images from Notion without the
  // NOTION_TOKEN being populated
  warnOrError(
    `\nBLOG_INDEX_ID is missing from env, this will result in an error\n` +
      `Make sure to provide one before starting Next.js`
  )
}

module.exports = {
  webpack(cfg, { dev, isServer }) {
    if (dev || !isServer) return cfg

    // WHY: lets getBlogIndex cache the index to .blog_index_data for the rest
    // of the build, so generating N post pages doesn't refetch it N times.
    process.env.USE_CACHE = 'true'

    // WHY: the custom `build-rss.js` entry that used to be injected here is
    // gone. Next 15 emitted it as a webpack chunk registered under
    // _ENTRIES[...], not a runnable script, so `node .next/server/build-rss.js`
    // loaded it and exited 0 without ever writing a feed. The feed is now
    // served by pages/rss.xml.tsx at request time instead.
    return cfg
  },
}
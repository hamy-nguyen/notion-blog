// WHY: no page fetches Notion at build or request time any more — the site is
// static links out to Notion/Substack/Instagram. So the hard NOTION_TOKEN check
// is gone: it would fail a production deploy over a credential nothing reads.
// src/lib/notion/* is kept on disk if on-site posts ever come back, but it is
// no longer wired into the build.
module.exports = {}
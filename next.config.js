// WHY: no page fetches Notion at build or request time any more, the site is
// static links out to Notion/Substack/Instagram. So the hard NOTION_TOKEN check
// is gone: it would fail a production deploy over a credential nothing reads.
// The Notion client the fork shipped with has been deleted along with it.
module.exports = {}

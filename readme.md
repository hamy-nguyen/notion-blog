# Grace's Miraculous Ordinaries

A small static site that gathers everything I write in one place.

I write in a few different homes — long reflections on Substack, a reading log
in Notion, everyday fragments on Instagram — and none of them link to each
other. This is the front door that does.

**Live:** _not deployed yet_

## What's here

| Section | Lives on |
| --- | --- |
| Reflections | [Substack](https://substack.com/@lovingkindness77/posts) |
| Books | [Notion](https://polydactyl-dibble-8a4.notion.site/6a996176131f462c90766dc1ab4a81b3?v=2e3307dfe70b460280261ffd0f4c229c) |
| Everyday Writings | [Instagram](https://www.instagram.com/spklhm/) |
| Learning Portfolio | [Notion](https://great-throat-34f.notion.site/Learning-Portfolio-43a532e5dbb34f9eab90895370f969ed) |

To change any of these, edit the `features` array in
[`src/components/features.tsx`](src/components/features.tsx). Nothing else
needs to know about it.

## Running it

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # static production build
```

There is no `.env` and no API key. Every page is prerendered at build time and
the site makes no server-side requests, so it deploys as static files anywhere.

## Layout

```
src/
  pages/
    index.tsx      landing page + intro
    contact.tsx    email and GitHub
    _app.tsx       global styles, footer
  components/
    features.tsx   the four link cards  ← edit links here
    header.tsx     nav + page metadata
    footer.tsx
  styles/          plain CSS + CSS modules
  lib/notion/      unused, see below
```

### About `src/lib/notion/`

This site began as a fork of [ijjk/notion-blog](https://github.com/ijjk/notion-blog),
which pulled posts from a Notion database and rendered them as blog pages. That
layer is no longer wired into anything — the build doesn't reference it and no
page imports it. It's kept on disk in case posts ever move back onto this site.

Two things to know if that ever happens: it talks to Notion's *private* API
(`www.notion.so/api/v3`) using a `token_v2` session cookie, which is a
full-account credential rather than a scoped key — so it should be replaced with
the [official Notion API](https://developers.notion.com) rather than revived
as-is.

## Credits

Built on [ijjk/notion-blog](https://github.com/ijjk/notion-blog) by JJ Kasper,
MIT licensed. The original license is retained in [`license`](license).

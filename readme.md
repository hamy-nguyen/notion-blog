# Grace's Miraculous Ordinaries

A small static site that gathers everything I write in one place.

I write in a few different homes: long reflections on Substack, a reading log
in Notion, everyday fragments on Instagram. None of them link to each other.
This is the front door that does.

**Live:** _not deployed yet_

```bash
pnpm install
pnpm dev
```

The four links live in the `features` array in
[`src/components/features.tsx`](src/components/features.tsx).
`src/lib/notion/` is dead code left over from the fork and isn't wired into
anything.

Built on [ijjk/notion-blog](https://github.com/ijjk/notion-blog) by JJ Kasper,
MIT licensed. The original license is retained in [`license`](license).

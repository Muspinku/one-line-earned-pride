# one-line-earned-pride

[![make.fun · u-mang-one-line-of-earned-pride-a0138557](https://make.fun/badge/u-mang-one-line-of-earned-pride-a0138557.svg)](https://make.fun/bounty/u-mang-one-line-of-earned-pride-a0138557)

A make.fun entry for **One Line of Earned Pride** — a single line of text,
1 to 240 characters: a quiet, earned moment of pride for someone in a scene.

## The entry

> My grandfather left school at twelve. Tonight he read my daughter her bedtime story — slowly, finger under every word — and when he finished, she asked for the same one tomorrow.

## How it works

`main.ts` (Node 22, standard library only) writes exactly that line to
`/output/entry.txt` — or `$MAKEFUN_OUTPUT_DIR/entry.txt` when set — with no
trailing newline, then verifies the written bytes round-trip exactly.

```sh
node main.ts
```

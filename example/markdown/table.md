## Table

### Common table notation

```
| header1    | header2 |                 header3 \| |
| :--------- | :-----: | -------------------------: |
| cell1      |  cell2  |                      cell3 |
| 1234567890 |    >    | abcdefghijklmnopqrstuvwxyz |
| ^          |   foo   |                          < |
```

| header1    | header2 |                 header3 \| |
| :--------- | :-----: | -------------------------: |
| cell1      |  cell2  |                      cell3 |
| 1234567890 |    >    | abcdefghijklmnopqrstuvwxyz |
| ^          |   foo   |                          < |

- About Empty Cells
  - Normally, in markdown, it seems that “empty cells are ~
    merged into the left cell".
  - However, this specification is not adopted because it ~
    often happens in the middle of writing a document.
  - If you want to join the left side, “<” must be described.
- About separator character "|"
  - If you want to place a separator string "|" in a cell,~
    escape it with a backslash.

### Block notation (expanded)

Sometimes tables are easier to read if they are written in blocks because the
editor may automatically remove white space.

@@@

```table
|A|B|C|
|:|:|:|
|D|E|F|
```

@@@

```table
|A|B|C|
|:|:|:|
|D|E|F|
```

### Expanded notation

```
 |           | header  | header  | header            |
+|           | 1       | 2       | 3                 |
-|           |         |         |                   |
 |<* headerA | foo     | bar     | baz               |
#| This      | line    | is      | ignored.          |
 |<* headerB |<left    |-center  |>right             |
 |<* headerC | foo1    | foo2    | foo3              |
+|           | bar1~   | bar2~   | Breaked connect~  |
+|           | baz1    | baz2    | ~~Simple connect~~|
```

```table
 |           | header  | header  | header            |
+|           | 1       | 2       | 3                 |
-|           |         |         |                   |
 |<* headerA | foo     | bar     | baz               |
#| This      | line    | is      | ignored.          |
 |<* headerB |<left    |-center  |>right             |
 |<* headerC | foo1    | foo2    | foo3              |
+|           | bar1~   | bar2~   | Breaked connect~  |
+|           | baz1    | baz2    | ~~Simple connect~~|
```

- Symbols can be specified on the right side of the separator.

  - `>` \: Align right
  - `<` \: Align left
  - `-` \: Align center
  - `*` \: to TH cell

- Can specify a symbol at the beginning of a line.

  - `#` \: Comment
  - `+` \: Connect to upper cell
  - `-` \: End of header line

!!! warning ~ 表記は List の表記とそろえたほうがいいかもしれない

### Sample

```
-|   |
 |-A | < | B |
 | C | D |^  |
 | ^ | > |-E |
```

```table
-|   |
 |-A | < | B |
 | C | D |^  |
 | ^ | > |-E |
```

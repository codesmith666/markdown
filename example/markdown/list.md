## List

### Unordered list

```
- foo
- bar
- baz
- qux
```

- foo
- bar
- baz
- qux

### Ordered list

```
1. foo
1. bar
1. baz
1. qux
```

1. foo
1. bar
1. baz
1. qux

### Indent (2 spaces)

```
- foo
  - bar
    - baz
- qux
```

- foo
  - bar
    - baz
- qux

### Multiline

```
- foo
  1. foo
    foo1
  1. bar
    bar1
    bar2
  1. baz
     baz1
     - baz1
     - baz2
       baz3
```

- foo
  1. foo
     foo1
  1. bar
     bar1
     bar2
  1. baz
     baz1
     - baz1
     - baz2
       baz3

### Connect line "~" (expanded syntax)

```
- foo ~
  bar ~
  baz
  - nano ~
    desu ~
    gabu
- qux
```

- foo ~
  bar ~
  baz
  - nano ~
    desu ~
    gabu
- qux

### Combination

```
- foo
  1. **foo**
     //bar//
  1. ..baz.. ~
     ~~qux~~
- bar
  - foo
    - bar
    - baz !!! baz
```

- foo
  1. **foo**
     //bar//
  1. ..baz.. ~
     ~~qux~~
- bar
  - foo
    - bar
    - baz !!! baz

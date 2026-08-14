interface KeyItem {
  id: string;
  type: string;
  symbol: string;
}

export const KEYS: KeyItem[][] = [
  [
    { id: 'q', type: 'alphabet', symbol: 'q' },
    { id: 'w', type: 'alphabet', symbol: 'w' },
    { id: 'e', type: 'alphabet', symbol: 'e' },
    { id: 'r', type: 'alphabet', symbol: 'r' },
    { id: 't', type: 'alphabet', symbol: 't' },
    { id: 'y', type: 'alphabet', symbol: 'y' },
    { id: 'u', type: 'alphabet', symbol: 'u' },
    { id: 'i', type: 'alphabet', symbol: 'i' },
    { id: 'o', type: 'alphabet', symbol: 'o' },
    { id: 'p', type: 'alphabet', symbol: 'p' },
  ],
  [
    { id: 'a', type: 'alphabet', symbol: 'a' },
    { id: 's', type: 'alphabet', symbol: 's' },
    { id: 'd', type: 'alphabet', symbol: 'd' },
    { id: 'f', type: 'alphabet', symbol: 'f' },
    { id: 'g', type: 'alphabet', symbol: 'g' },
    { id: 'h', type: 'alphabet', symbol: 'h' },
    { id: 'j', type: 'alphabet', symbol: 'j' },
    { id: 'k', type: 'alphabet', symbol: 'k' },
    { id: 'l', type: 'alphabet', symbol: 'l' },
  ],
  [
    { id: 'z', type: 'alphabet', symbol: 'z' },
    { id: 'x', type: 'alphabet', symbol: 'x' },
    { id: 'c', type: 'alphabet', symbol: 'c' },
    { id: 'v', type: 'alphabet', symbol: 'v' },
    { id: 'b', type: 'alphabet', symbol: 'b' },
    { id: 'n', type: 'alphabet', symbol: 'n' },
    { id: 'm', type: 'alphabet', symbol: 'm' },
    { id: 'del', type: 'delete', symbol: '⌫' },
  ]
]

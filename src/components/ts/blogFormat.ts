interface TextToken {
  type: RichType | "text";
  value: string | TextToken[];
}

const RICH_TYPES = ["bold", "thin", "underline", "strike", "center"] as const;
type RichType = (typeof RICH_TYPES)[number];

const START_TAG_REGEX = new RegExp(`^\\$\\$(${RICH_TYPES.join("|")})\\(`);


export const parseRichText = (text: string): TextToken[] => {
  const tokens: TextToken[] = [];
  let i = 0;

  while (i < text.length) {
    const startMatch = text.slice(i).match(START_TAG_REGEX);

    if (startMatch) {
      const type = startMatch[1] as RichType;
      const contentStartIndex = i + startMatch[0].length;

      let depth = 1;
      let cur = contentStartIndex;
      let contentEndIndex = -1;

      while (cur < text.length) {
        if (text.slice(cur).match(START_TAG_REGEX)) {
          depth++;
          const subMatch = text.slice(cur).match(START_TAG_REGEX);
          cur += subMatch![0].length;
        } else if (text.startsWith(")$$", cur)) {
          depth--;
          if (depth === 0) {
            contentEndIndex = cur;
            break;
          }
          cur += 3;
        } else {
          cur++;
        }
      }

      if (contentEndIndex !== -1) {
        const innerContent = text.slice(contentStartIndex, contentEndIndex);
        tokens.push({
          type: type,
          value: parseRichText(innerContent),
        });
        i = contentEndIndex + 3;
        continue;
      }
    }

    let nextTagIndex = text.indexOf("$$", i + 1);
    if (nextTagIndex === -1) nextTagIndex = text.length;

    const plainText = text.slice(i, nextTagIndex);

    if (plainText) {
      if (!/^\s*$/.test(plainText)) {
        tokens.push({ type: "text", value: plainText });
      }
    }

    i = nextTagIndex;
  }

  return tokens;
};

export const stripRichText = (text: string): string => {
  const tokens = parseRichText(text);
  const flatten = (tks: TextToken[]): string => {
    return tks.map(t => typeof t.value === "string" ? t.value : flatten(t.value)).join("");
  };
  return flatten(tokens);
};
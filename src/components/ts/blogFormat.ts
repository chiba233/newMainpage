interface TextToken {
  type: RichType | "text";
  value: string | TextToken[];
}

const RICH_TYPES = ["bold", "thin", "underline", "strike", "center"] as const;
type RichType = (typeof RICH_TYPES)[number];

// 常量语义化
const TAG_PREFIX = "$$";
const TAG_SUFFIX = ")$$";

const START_TAG_PATTERN = `\\$\\$(${RICH_TYPES.join("|")})\\(`;

const createStartTagRegex = () => new RegExp(START_TAG_PATTERN, "g");

const STRIP_REGEX = new RegExp(
  `\\$\\$(?:${RICH_TYPES.join("|")})\\((.*?)\\)\\$\\$`,
  "gs",
);

// 空白判断
const shouldRenderText = (text: string) => text.trim().length > 0;

// 主解析器
export const parseRichText = (text: string, depthLimit = 50): TextToken[] => {
  const tokens: TextToken[] = [];
  let i = 0;

  // 限制递归深度
  if (depthLimit <= 0) {
    return [{ type: "text", value: text }];
  }

  while (i < text.length) {
    const START_TAG_REGEX = createStartTagRegex(); // 局部实例（并发安全）
    START_TAG_REGEX.lastIndex = i;

    const startMatch = START_TAG_REGEX.exec(text);

    if (startMatch && startMatch.index === i) {
      const type = startMatch[1] as RichType;
      const contentStartIndex = i + startMatch[0].length;

      let depth = 1;
      let cur = contentStartIndex;
      let contentEndIndex = -1;

      while (cur < text.length) {
        // ⚡ 精准定位 $$ 而不是 blind indexOf（优化点 3）
        const nextDollar = text.indexOf(TAG_PREFIX, cur);
        const nextEnd = text.indexOf(TAG_SUFFIX, cur);

        if (nextDollar === -1 && nextEnd === -1) break;

        if (nextDollar !== -1 && (nextEnd === -1 || nextDollar < nextEnd)) {
          const subRegex = createStartTagRegex();
          subRegex.lastIndex = nextDollar;
          const subMatch = subRegex.exec(text);

          if (subMatch && subMatch.index === nextDollar) {
            depth++;
            cur = nextDollar + subMatch[0].length;
            continue;
          }

          cur = nextDollar + TAG_PREFIX.length;
        } else {
          depth--;
          if (depth === 0) {
            contentEndIndex = nextEnd;
            break;
          }
          cur = nextEnd + TAG_SUFFIX.length;
        }
      }

      if (contentEndIndex !== -1) {
        tokens.push({
          type,
          value: parseRichText(
            text.slice(contentStartIndex, contentEndIndex),
            depthLimit - 1,
          ),
        });
        i = contentEndIndex + TAG_SUFFIX.length;
        continue;
      }
    }

    // 普通文本
    let nextTagIndex = text.indexOf(TAG_PREFIX, i + 1);
    if (nextTagIndex === -1) nextTagIndex = text.length;

    const plainText = text.slice(i, nextTagIndex);
    if (shouldRenderText(plainText)) {
      tokens.push({ type: "text", value: plainText });
    }
    i = nextTagIndex;
  }

  return tokens;
};

// strip 版本
export const stripRichText = (text: string): string => {
  let lastText = "";
  let currentText = text;

  while (currentText !== lastText) {
    lastText = currentText;
    currentText = currentText.replace(STRIP_REGEX, "$1");
  }

  return currentText.trim();
};

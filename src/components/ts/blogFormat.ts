interface TextToken {
  type: RichType | "text";
  value: string | TextToken[];
}

const RICH_TYPES = ["bold", "thin", "underline", "strike", "center", "link"] as const;
export type RichType = (typeof RICH_TYPES)[number];

const TAG_PREFIX = "$$";
const TAG_SUFFIX = ")$$";
const BLOCK_TYPES = ["center"];

const START_TAG_PATTERN = `\\$\\$(${RICH_TYPES.join("|")})\\(`;
const createStartTagRegex = () => new RegExp(START_TAG_PATTERN, "g");

const STRIP_REGEX = new RegExp(
  `\\$\\$(?:${RICH_TYPES.join("|")})\\((.*?)\\)\\$\\$`,
  "gs",
);
// 空白判断
const shouldRenderText = (text: string) => text.length > 0;

// 主解析器
export const parseRichText = (text: string, depthLimit = 50): TextToken[] => {
  const tokens: TextToken[] = [];
  let i = 0;

  // 限制递归深度
  if (depthLimit <= 0) return [{ type: "text", value: text }];
  const KNOWN_REGEX = createStartTagRegex();
  while (i < text.length) {
    KNOWN_REGEX.lastIndex = i;
    const knownMatch = KNOWN_REGEX.exec(text);
    const genericMatch = text.slice(i).match(/^\$\$([a-z]+)\(/);

    if (genericMatch) {
      const tagName = genericMatch[1];
      const isKnown = knownMatch && knownMatch.index === i;
      const contentStartIndex = i + genericMatch[0].length;

      let depth = 1;
      let cur = contentStartIndex;
      let contentEndIndex = -1;

      while (cur < text.length) {
        const nextDollar = text.indexOf(TAG_PREFIX, cur);
        const nextEnd = text.indexOf(TAG_SUFFIX, cur);

        if (nextDollar === -1 && nextEnd === -1) break;

        if (nextDollar !== -1 && (nextEnd === -1 || nextDollar < nextEnd)) {
          // 只要符合 $$any( 结构就视作嵌套
          const subMatch = text.slice(nextDollar).match(/^\$\$[a-z]+\(/);
          if (subMatch) {
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
        const innerText = text.slice(contentStartIndex, contentEndIndex);
        const parsedInner = parseRichText(innerText, depthLimit - 1);
        if (isKnown) {
          // 赋予 RichType 样式
          tokens.push({
            type: tagName as RichType,
            value: parsedInner,
          });
        } else {
          // 未知标签
          tokens.push(...parsedInner);
        }

        i = contentEndIndex + TAG_SUFFIX.length;

        // 换行修复逻辑
        if (BLOCK_TYPES.includes(tagName) && i < text.length) {
          const char = text[i];
          if (char === "\n") i++;
          else if (text.startsWith("\r\n", i)) i += 2;
        }
        continue;
      }
    }

    // 普通文本处理
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

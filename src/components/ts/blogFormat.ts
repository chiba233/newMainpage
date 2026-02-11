interface TextToken {
  type: RichType | "text";
  value: string | TextToken[];
}

const RICH_TYPES = ["bold", "thin", "underline", "strike", "center"] as const;
type RichType = (typeof RICH_TYPES)[number];

// 优化 1: 使用全局匹配和 sticky 提升正则性能
const START_TAG_PATTERN = `\\$\\$(${RICH_TYPES.join("|")})\\(`;
const START_TAG_REGEX = new RegExp(START_TAG_PATTERN, "g");
const END_TAG_STR = ")$$";

const shouldRenderText = (text: string) => !/^\s*$/.test(text);

export const parseRichText = (text: string): TextToken[] => {
  const tokens: TextToken[] = [];
  let i = 0;

  while (i < text.length) {
    // 设置正则从当前索引开始查找
    START_TAG_REGEX.lastIndex = i;
    const startMatch = START_TAG_REGEX.exec(text);

    // 只有当匹配结果就在当前指针位置时，才视为标签开始
    if (startMatch && startMatch.index === i) {
      const type = startMatch[1] as RichType;
      const contentStartIndex = i + startMatch[0].length;

      let depth = 1;
      let cur = contentStartIndex;
      let contentEndIndex = -1;

      while (cur < text.length) {
        // 查找下一个可能的 标签开始 或 标签结束
        const nextStart = text.indexOf("$$", cur);
        const nextEnd = text.indexOf(END_TAG_STR, cur);

        // 如果后面啥都没了就中断
        if (nextStart === -1 && nextEnd === -1) break;

        // 判定哪一个先出现
        if (nextStart !== -1 && (nextEnd === -1 || nextStart < nextEnd)) {
          START_TAG_REGEX.lastIndex = nextStart;
          const subMatch = START_TAG_REGEX.exec(text);
          if (subMatch && subMatch.index === nextStart) {
            depth++;
            cur = nextStart + subMatch[0].length;
            continue;
          }
          cur = nextStart + 2; // 只是普通的 $$，跳过
        } else {
          depth--;
          if (depth === 0) {
            contentEndIndex = nextEnd;
            break;
          }
          cur = nextEnd + 3;
        }
      }

      if (contentEndIndex !== -1) {
        tokens.push({
          type: type,
          value: parseRichText(text.slice(contentStartIndex, contentEndIndex)),
        });
        i = contentEndIndex + 3;
        continue;
      }
    }

    // --- 普通文本处理 ---
    let nextTagIndex = text.indexOf("$$", i + 1);
    if (nextTagIndex === -1) nextTagIndex = text.length;

    const plainText = text.slice(i, nextTagIndex);
    if (plainText && shouldRenderText(plainText)) {
      tokens.push({ type: "text", value: plainText });
    }
    i = nextTagIndex;
  }

  return tokens;
};


export const stripRichText = (text: string): string => {
  // 匹配 $$tag(内容)$$ 结构 只保留内容
  let lastText = "";
  let currentText = text;
  const STRIP_REGEX = new RegExp(`\\$\\$(?:${RICH_TYPES.join("|")})\\((.*?)\\)\\$\\$`, "gs");

  while (currentText !== lastText) {
    lastText = currentText;
    currentText = currentText.replace(STRIP_REGEX, "$1");
  }

  return currentText.trim();
};
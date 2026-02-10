interface TextToken {
  type: RichType | "text";
  value: string;
}

const RICH_TYPES = ["bold", "thin", "underline", "strike"] as const;
type RichType = (typeof RICH_TYPES)[number];

// 使用 Set 提高查询效率（在类型检查时使用）
const RICH_TYPE_SET = new Set<RichType>(RICH_TYPES);

const RICH_REGEX = new RegExp(
  `\\$\\$(${RICH_TYPES.join("|")})\\(((?:[^()]*|\\([^()]*\\))*)\\)\\$\\$`,
  "g",
);

export const stripRichText = (text: string): string => {
  return text.replace(RICH_REGEX, "$2");
};

export const parseRichText = (text: string): TextToken[] => {
  const tokens: TextToken[] = [];
  let lastIndex = 0;

  const matches = text.matchAll(RICH_REGEX);

  for (const match of matches) {
    const [full, type, value] = match;
    const index = match.index;

    if (index > lastIndex) {
      tokens.push({
        type: "text",
        value: text.slice(lastIndex, index),
      });
    }

    tokens.push({
      type: RICH_TYPE_SET.has(type as RichType) ? (type as RichType) : "text",
      value: value,
    });

    lastIndex = index + full.length;
  }

  if (lastIndex < text.length) {
    tokens.push({
      type: "text",
      value: text.slice(lastIndex),
    });
  }

  return tokens;
};
<script lang="ts" setup>
interface TextToken {
  type: string;
  value: string | TextToken[];
}

defineProps<{
  tokens: TextToken[]
}>();
</script>

<template>
  <template v-for="(token, index) in tokens" :key="index">
    <span v-if="token.type === 'text'" class="rich-text-content">{{ token.value }}</span>

    <strong v-else-if="token.type === 'bold'" class="fw-bold">
      <RichTextRenderer v-if="Array.isArray(token.value)" :tokens="token.value" />
    </strong>

    <span v-else-if="token.type === 'thin'" class="fw-thin">
      <RichTextRenderer v-if="Array.isArray(token.value)" :tokens="token.value" />
    </span>

    <u v-else-if="token.type === 'underline'" class="rich-underline">
      <RichTextRenderer v-if="Array.isArray(token.value)" :tokens="token.value" />
    </u>

    <del v-else-if="token.type === 'strike'" class="rich-strike">
      <RichTextRenderer v-if="Array.isArray(token.value)" :tokens="token.value" />
    </del>

    <div v-else-if="token.type === 'center'" class="center-text">
      <RichTextRenderer v-if="Array.isArray(token.value)" :tokens="token.value" />
    </div>
  </template>
</template>

<style lang="scss" scoped>
.rich-text-content, .fw-bold, .fw-thin, .rich-underline, .rich-strike {
  font-size: inherit;
  white-space: pre-wrap;
  color: #191919;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
}

.fw-bold {
  font-weight: bold;
}

.fw-thin {
  font-weight: 300;
}

.center-text {
  display: block;
  width: 100%;
  text-align: center;
  justify-content: center;
}

// 如果嵌套在 center-text 里的 span 需要保持居中
.center-text :deep(.rich-text-content) {
  display: inline;
}
</style>
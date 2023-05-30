<template>
  <div class="dashboardTitle">
    <n-avatar round class="titleIcon" bordered :src="iconURL"></n-avatar>
    <n-gradient-text
        class="titleText"
        :gradient="{
        deg: 180,
        from: 'rgb(104,104,104)',
        to: 'rgb(248,247,247)',
      }"
    >我宣布个事，我是个傻逼
    </n-gradient-text>
  </div>
</template>

<script lang="ts">
import {NAvatar, NGradientText} from "naive-ui";
import {defineComponent} from "vue";
import icon from "../icons/icon.jpg";

export default defineComponent({
  components: {
    NAvatar,
    NGradientText,
  },
  data() {
    return {
      iconURL: icon,
    };
  },
});
</script>

<style lang="scss">
.dashboardTitle {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 2em;
  margin-bottom: 1em;

  .titleText {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    font-size: 2em;
  }

  .titleIcon {
    width: 80px;
    height: 80px;
    margin-right: 2em;
  }
}
</style>

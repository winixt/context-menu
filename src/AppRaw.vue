<template>
  <div class="content">
    <FInput type="textarea" v-model="rawText" :rows="10"></FInput>
    <FInput type="textarea" v-model="cssText" :rows="10"></FInput>
  </div>
</template>

<script setup lang="ts">
  import { FInput } from "@fesjs/fes-design";
  import { nextTick, ref, watch } from "vue";
  import { useClipboard } from "@vueuse/core";

  const rawText = ref();
  const cssText = ref();

  const transform = () => {
    cssText.value = rawText.value
      .replace(/'/g, "")
      .replace(/,/g, ";")
      .replace(/[A-Z]/g, (match: string) => {
        return "-" + match.toLowerCase();
      })
      .replace(/};/g, "}")
      .replace(/: {/g, " {");
  };

  const { copy } = useClipboard({ source: cssText });
  watch(rawText, () => {
    if (rawText.value) {
      transform();
      copy(cssText.value);
      nextTick(() => {
        rawText.value = "";
      });
    }
  });
</script>

<style>
  .content {
    width: 800px;
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
    color: #fff;
  }
</style>

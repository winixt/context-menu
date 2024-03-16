<template>
  <div class="content">
    <FInput type="textarea" v-model="rawText" :rows="10" @contextmenu="oncontextmenu"></FInput>
    <FInput type="textarea" v-model="toText" :rows="10"></FInput>
    <Test :data="data.a" :on-change="changeData" />
    <ContextMenu ref="cm" :model="items" />
  </div>
</template>

<script setup lang="ts">
  import { FInput } from "@fesjs/fes-design";
  import { nextTick, ref, reactive, watch } from "vue";
  import { useClipboard } from "@vueuse/core";
  import Test from "./test";
  import ContextMenu from "./components/context-menu/context-menu.vue";
  // import "@imengyu/vue3-context-menu/lib/vue3-context-menu.css";
  // import ContextMenu from "@imengyu/vue3-context-menu";

  const cm = ref();
  const items = ref([
    {
      label: "Translate",
      icon: "pi pi-language",
      command(params) {
        console.log(params);
      },
    },
    {
      label: "Speech",
      icon: "pi pi-volume-up",
      items: [
        {
          label: "Start",
          icon: "pi pi-caret-right",
          command(params) {
            console.log(params);
          },
        },
        {
          label: "Stop",
          icon: "pi pi-pause",
        },
      ],
    },
    {
      separator: true,
    },
    {
      label: "Print",
      icon: "pi pi-print",
    },
  ]);
  const oncontextmenu = (event: MouseEvent) => {
    console.log("xxx");
    cm.value.show(event);
    event.preventDefault();

    // ContextMenu.showContextMenu({
    //   x: event.x,
    //   y: event.y,
    //   items: [
    //     {
    //       label: "A menu item",
    //       onClick: () => {
    //         alert("You click a menu item");
    //       },
    //     },
    //     {
    //       label: "A submenu",
    //       children: [{ label: "Item1" }, { label: "Item2" }, { label: "Item3" }],
    //     },
    //   ],
    // });
  };

  const rawText = ref();
  const toText = ref();

  const data = reactive({
    a: {
      content: "doc",
    },
  });

  const changeData = (newA) => {
    const a = data.a;
    Object.assign(a, newA);
  };

  const transform = () => {
    const rawContent = JSON.parse(rawText.value);
    const content = {
      $schema: "http://json-schema.org/draft-04/schema#",
      type: "object",
      properties: {
        code: {
          type: "string",
        },
        msg: {
          type: "string",
        },
        result: {
          type: "object",
          properties: rawContent.properties,
        },
      },
      required: ["code", "msg", "result"],
    };
    toText.value = JSON.stringify(content);
  };

  const { copy } = useClipboard({ source: toText });
  watch(rawText, () => {
    if (rawText.value) {
      transform();
      copy(toText.value);
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

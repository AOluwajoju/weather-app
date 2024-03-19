<template>
  <img
    :style="{ height: `${size * 3.2}px`, width: `${size * 3.2}px` }"
    :src="require(`~/assets/icons/${name}.svg`)"
    :alt="`${name} icon`"
  />
</template>

<script>
export default {
  name: "Icon",
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 5,
    },
  },
};
</script>

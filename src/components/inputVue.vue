<template>
    <input
            type="checkbox"
            v-bind:checked="checked"
            v-on:change="$emit('change', $event.target.checked)"
    >
</template>

<script>
  export default {
    name: "inputVue",
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      checked: Boolean
    },
    created() {
      console.log(this.$attrs)
    }
  }
</script>

<style scoped lang='less'>

</style>

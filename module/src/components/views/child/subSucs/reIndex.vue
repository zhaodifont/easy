<template lang="html">
  <img src="../img/rstar.png" class="rstar p-a" alt="" @click="toIndex">
</template>

<script>
export default {
  methods: {
    toIndex () {
      this.$router.push({name: 'index'})
    }
  }
}
</script>

<style lang="css">
.rstar{
  left:.13rem;top:.21rem;width: 1.19rem;z-index:6;
}
</style>

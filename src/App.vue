<template>
  <div id="app">
    <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html,body{
  height: 100%;
}
#app {
  font-family: '微软雅黑';
  color: #2c3e50;
  height: 100%;
  background: #f1f1f1;
  overflow: hidden;
}
.slide-fade-enter-active,.slide-fade-leave-active{
  transition: transform .6s ease-out;
}
.slide-fade-enter{
  transform: translateX(100%)
}
.slide-fade-enter-to{
  transform: translateX(0)
}

.slide-fade-leave{
  transform: translateX(0)
}
.slide-fade-leave-to{
  transform: translateX(-100%)
}

</style>

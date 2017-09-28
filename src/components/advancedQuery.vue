<template>
<div>
  <div class="queryModal-mask" v-if="show" @click="$emit('reset')"></div>
  <transition name="query">
  <div class="queryModal" v-if="show">
    <div class="header">
      <h2>高级查询</h2>
      <a class="ivu-modal-close" @click="$emit('reset')">
        <i class="ivu-icon ivu-icon-ios-close-empty"></i>
      </a>
    </div>
    <div class="main">
      <slot name="queryMain"></slot>
    </div>
    <div class="footer">
      <Button type="success"><Icon type="search"></Icon> 查询</Button>
      <Button><Icon type="ios-loop-strong"></Icon> 重置</Button>
    </div>
  </div>
  </transition>
</div>
</template>

<script>
export default{
  props: ['show'],
  data () {
    return {
      
    }
  }
}
</script>

<style>
.query-enter-active, .query-leave-active {
  transition: transform .5s
}
.query-enter, .query-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  transform: translateX(100%)
}
.queryModalWrap{
  display: none;
}
.queryModalWrap.active{
  display: block;
}

.queryModal-mask{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(255, 255, 255, 0);
  z-index: 10;
}
.queryModal{
  width: 530px;
  position: fixed;
  right: 15px;
  top: 150px;
  z-index: 20;
  border: 1px solid #f1f1f1;
  box-shadow: 0 1px 6px rgba(0,0,0,.2);
  background: #ffffff;
  border-radius: 6px;
}
.queryModal .header{
  border-bottom: 1px solid #f1f1f1;
  padding: 12px 15px; 
}
.queryModal .header h2{
  font-size: 14px;
}
.queryModal .ivu-modal-close{
  font-size: 12px;
  position: absolute;
  right: 16px;
  top: 8px;
  overflow: hidden;
  cursor: pointer;
}
.queryModal .ivu-modal-close .ivu-icon-ios-close-empty{
  font-size: 31px;
  color: #999;
  transition: color .2s ease;
  position: relative;
  top: 1px;
}
.queryModal .main{
  padding: 16px;
  box-sizing: border-box;
  max-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
}
.queryModal .footer{
  text-align: right;
  border-top: 1px solid #f1f1f1;
  padding: 10px 15px; 
}
</style>


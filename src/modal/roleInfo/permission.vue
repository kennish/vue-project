<template>
  <Modal v-model="show" :width="1100" title="角色权限管理" :closable="false" :mask-closable="false">
    <div slot="header">
        <div class="ivu-modal-header-inner">角色权限管理</div>
        <a class="ivu-modal-close" @click="del"><i class="ivu-icon ivu-icon-ios-close-empty"></i></a>
    </div>
    <div class="item-wrap" v-if="paemissionData">
      <div class="item-span" v-for="(item, index) in paemissionData" :key="index" style="display: block" @click="isactive(item, index)">
        <Icon type="arrow-right-b" :class="item.isActive? 'active-icon': null"></Icon> {{item.menuVo.menuName}} 
        <span @click.stop>
          <i-switch size="small" style="margin-right: 10px" :value="item.menuVo.isSelected == 1"></i-switch>
        </span>
        <div class="item-wrap" v-show="item.isActive" @click.stop>
          <div class="item-span" v-for="(item2, index2) in item.childList" :key="index2" style="display: block">
            {{item2.menuVo.menuName}} <i-switch size="small" style="margin-right: 10px" :value="item2.menuVo.isSelected == 1"></i-switch>
            <div class="item-wrap">
              <div class="item-span" v-for="(item3, index3) in item2.menuVo.menuMethods" :key="index3">
                {{item3.methodName}} <i-switch size="small" style="margin-right: 10px" :value="item3.isSelected == 1"></i-switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer">
        <Button type="primary" size="large">确定</Button>
        <Button size="large" @click="del">取消</Button>
    </div>
  </Modal> 
</template>

<script>
import qs from 'qs'
import Vue from 'vue'
export default {
  props: ['show', 'data'],
  data () {
    return {
      paemissionData: null
    }
  },
  created () {
    
  },
  watch: {
    show () {
      if(this.show){
        this.paemissionData = null;
        this.getPaemission();
      }
    }
  },
  methods: {
    //请求权限数据
    getPaemission () {
      this.axios.post('/tenancy-sys/admin/role/accessTree/'+this.data.id)
      .then(response => {
        this.paemissionData = response.data.result;
        this.paemissionData.forEach((item) => {
          item.isActive = false;
        })
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    },
    isactive (item, index) {
      item.isActive = !item.isActive;
      console.log(item.isActive)
      this.$set(this.paemissionData,index, item)
    },
    del () {
      this.$emit('reset')
    }
  }
}
</script>

<style>
.item-wrap .item-wrap{
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 30px;
}
.item-span{
  display: inline-block;
  font-size: 14px;
  color: #777777;
}
.active-icon{
  transform: rotate(90deg);
  transition: all .2s ease-in-out;
}
</style>


<template>
  <div v-if="show" class="iconSelect-wrap" @click.stop>
    <div class="icon-mask" @click.stop="$emit('hide')"></div>
    <div class="iconSelect-bar">
      <div class="btn-bar">
        <Button size="small" type="info" :disabled="page == 1" @click="prev">上一页</Button>
        <Button size="small" type="info" :disabled="page == pageCount" @click="next">下一页</Button>
      </div>
      <div class="iconSelect">
        <div class="icon-item" v-for="(item, index) in pageData" :key="index">
          <a href="javascript:;" @click="getType(item)">
            <Icon :type="item.type" size="18"></Icon>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import iconData from './icon';
export default {
  props: ['show'],
  data () {
    return {
      page: 1, //当前页
      rows: 20, //一页显示条数
      pageCount: 0, //总共多少页
      data: iconData.data
    }
  },
  created () {
    this.pageCount = Math.ceil(this.data.length/this.rows);
  },
  methods: {
    getType (item) {
      this.$emit('getType', item.type)
      this.$emit('hide')
    },
    next () {
      if(this.page < this.pageCount){
        this.page++;
      }
    },
    prev () {
      if(this.page > 1){
        this.page--;
      }
    }
  },
  computed: {
    pageData () {
      return this.data.filter((item) => {
        return item.index < this.page * this.rows && item.index >= (this.page-1) * this.rows
      })
    }
  }
}
</script>

<style>
  .icon-mask{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0);
    z-index: -1;
  }
  .iconSelect-wrap{
    position: absolute;
    left: 0;
    top: 34px;
    z-index: 100;
    background: #ffffff;
    width: 204px;
    height: 200px;
    border: 2px solid #eeeeee;
  }
  .iconSelect-bar{
    background: #ffffff;
    height: 100%;
  }
  .btn-bar{
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    border-bottom: 1px solid #eeeeee;
  }
  .btn-bar a{
    
  }
  .iconSelect{
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }
  .icon-item{
    display: flex;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }
  .iconSelect a{
    display: flex;
    border: 2px dotted #f1f1f1;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }
</style>


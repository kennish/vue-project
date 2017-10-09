<template>
  <Menu theme="dark" width="auto" @on-select="activeLink" accordion>
    <div class="layout-logo-left">
        <h3 class="layout-title">盈家生活金融平台</h3>
    </div>
    
    <Submenu name="1">
        <template slot="title">
            <Icon type="ios-paper"></Icon>
            系统基础模块
        </template>
        <MenuItem name="1-1">
            <router-link to="/innjia">菜单信息管理</router-link>
        </MenuItem>
        <MenuItem name="1-2">
            <router-link to="/userProfile">用户信息管理</router-link>
        </MenuItem>
    </Submenu>
    <Submenu name="2">
        <template slot="title">
            <Icon type="ios-paper"></Icon>
            系统基础模块
        </template>
        <MenuItem name="2-1">
            <router-link to="/hah">菜单方法管理</router-link>
        </MenuItem>
    </Submenu>

    <!-- <Submenu v-for="(item, index) in menuList" :key="index" :name="`${index + 1}`">
        <template slot="title">
            <Icon type="ios-paper"></Icon>
            {{item.menuVo.menuName}}
        </template>
        <MenuItem :name="`${index + 1}-${index2 + 1}`" v-for="(subItem, index2) in item.childList" :key="index2">
            <router-link to="/menuNode">{{subItem.menuVo.menuName}}</router-link>
        </MenuItem>
    </Submenu> -->

  </Menu>
</template>

<script>
export default {
  methods: {
    activeLink (name) {
      //console.log(name)
    }
  }
}
</script>

<style>
.layout-menu-left{
    background: #464c5b;
}
.layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
}
.layout-ceiling-main a{
    color: #9ba7b5;
}
.layout-hide-text .layout-text{
    display: none;
}
.ivu-col{
    transition: width .2s ease-in-out;
}
.layout-title{
    font-size: 16px;
    font-weight: normal;
    text-align: center;
    color: #ffffff;
    height: 30px;
    line-height: 30px;
}
.text-right{
    text-align: right;
    height: 47px;
    line-height: 47px;
    padding-right: 40px;
    font-size: 16px;
}
.user-r{
    vertical-align: middle;
    margin-right: 5px;
}
.lognout-btn{
    margin-left: 10px;
}
.ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title{
    /* padding: 0; */
}
.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item{
    padding: 0;
}
.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item a{
    padding: 14px 24px 14px 43px;
    display: block;
    color: rgba(255,255,255,.7);
}
.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item a:hover{
    padding: 14px 24px 14px 43px;
    display: block;
    color: #ffffff;
}
.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item a.is-active{
    background: #2d8cf0!important;
    color: #ffffff;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover{
    background: none !important;
}
</style>


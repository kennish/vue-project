<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
        <Row type="flex">
            <Col :span="spanLeft" class="layout-menu-left">
              <Menu v-if="menuList != ''" theme="dark" width="auto" @on-select="activeLink" accordion>
                <div class="layout-logo-left">
                    <h3 class="layout-title">赢家生活金融平台</h3>
                </div>
                
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-paper"></Icon>
                        系统基础模块
                    </template>
                    <MenuItem :name="1-1">
                        <router-link to="/innjia">菜单信息管理</router-link>
                    </MenuItem>
                    <MenuItem :name="1-2">
                        <router-link to="/userProfile">用户信息管理</router-link>
                    </MenuItem>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-paper"></Icon>
                        系统基础模块
                    </template>
                    <MenuItem :name="2-1">
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
            </Col>
            <Col :span="spanRight">
                <div class="layout-header">
                    <Row>
                        <Col span="12">
                            <Button type="text" @click="toggleClick">
                                <Icon type="navicon" size="32"></Icon>
                            </Button>
                        </Col>
                        <Col span="12" class="text-right">
                            <Avatar style="background-color: #87d068" class="user-r" icon="person" />
                            {{userName}}
                            <Button class="lognout-btn" type="info" size="small" @click="logout">登出</Button>
                        </Col>
                    </Row>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <BreadcrumbItem href="#">首页</BreadcrumbItem>
                        <BreadcrumbItem href="#">应用中心</BreadcrumbItem>
                        <BreadcrumbItem>某应用</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </div>
                </div>
                <div class="layout-copy">
                    2011-2016 &copy; TalkingData
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                spanLeft: 4,
                spanRight: 20,
                userName: '',
                menuList: []
            }
        },
         created () {
            let info = this.$local.fetch("innjia");
            this.userName = info.userName;

            //请求左侧菜单列表
            let formData = new FormData();
                formData.append('userId', info.id);
            this.axios.post('/tenancy-sys/admin/user/accessTree', formData)
            .then(response => {
                this.menuList = response.data.result
            })
            .catch((response) => {
                console.log(response)
            })
            
        },
        computed: {
            iconSize () {
                return this.spanLeft === 4 ? 14 : 24;
            }
        },
        methods: {
            toggleClick () {
                if (this.spanLeft === 4) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                } else {
                    this.spanLeft = 4;
                    this.spanRight = 20;
                }
            },
            logout () {
                this.$local.save("innjia", null)
                this.$Message.success("已退出,请重新登录");
                this.$router.push("/login");
            },
            activeLink (name) {
                console.log(name)
            }
        }
    }
</script>
<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        height: 100%;
    }
    .ivu-row-flex{
      height: 100%;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
        height: calc(100vh - 170px)
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
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
        padding: 0;
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

    .fade-enter-active,.fade-leave-active{
        transition: transform .6s ease-out;
    }
    .fade-enter{
        transform: translateY(30px);
        opacity: 0;
    }
    .fade-enter-to{
        transform: translateY(0);
        opacity: 1;
    }

    .fade-leave{
        transform: translateY(0);
        opacity: 1;
    }
    .fade-leave-to{
        transform: translateY(30px);
        opacity: 0;
    }
</style>
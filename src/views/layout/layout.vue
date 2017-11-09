<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 4}">
        <Row type="flex">
            <Col :span="spanLeft" class="layout-menu-left">
              <layout-menu></layout-menu>
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
                        <BreadcrumbItem href="/">首页</BreadcrumbItem>
                        <BreadcrumbItem>{{addBreadcrumb.meta.title}}</BreadcrumbItem>
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
import layoutMenu from './menu'
    export default {
        components: {
            layoutMenu
        },
        data () {
            return {
                spanLeft: 4,
                spanRight: 20,
                userName: '',
                addBreadcrumb: null
            }
        },
        watch:{
            $route(){
                this.addBreadcrumb = this.$route;
            }
        },
        created () {
            let info = this.$local.fetch("innjia");
            this.userName = info.userName;
            this.addBreadcrumb = this.$route;
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
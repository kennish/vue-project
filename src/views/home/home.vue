<template>
  <div class="home">
    <div class="logn-bar">
      <router-link to="/login" class="home-bnt" v-if="!login">
        <Button type="primary" size="small">登录</Button>
      </router-link>
      <span class="userBar" v-if="login">
        <Icon type="person"></Icon>
        {{userName}}
      </span>
      <Button type="info" size="small" v-if="login" @click="logout">登出</Button>
    </div>
    <div class="home-wrap">
      <div class="home-wrap-t">
        <h2>欢迎来到赢家生活金融平台</h2>
        <div class="home-bnt-bar">
          <router-link to="/innjia" class="home-bnt">
            <Button type="info" size="large">进入后台</Button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      login: false,
      userName: ""
    }
  },
  created () {
    let info = this.$local.fetch('innjia');
    if(info.token != undefined){
      this.login = true
      this.userName = info.userName
    }
  },
  methods: {
    logout () {
      this.$local.save("innjia", null)
      let info = this.$local.fetch('innjia');
      this.login = info.token
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.home{
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction:column;
}
.logn-bar{
  display: flex;
  justify-content: flex-end;
  padding:10px 20px 0 0;
}
.home-wrap{
  display: flex;
  flex-direction:column;
  justify-content:center;
  text-align: center;
  flex: 1;
}
.home-wrap-t{
  transform: translateY(-200px)
}
.home h2{
  font-size: 36px;
  color: #666666;
}
.home-bnt-bar{
  margin-top: 15px;
  text-align: center;
}
.userBar{
  margin-right: 20px;
  line-height: 24px;
  font-size: 16px;
  color: #666666;
}
</style>

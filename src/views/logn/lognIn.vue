<template>
    <div class="logn-in">
      <div class="wrap400">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="80">
            <FormItem label="用户名" prop="loginName">
                <Input type="text" v-model="formInline.loginName" placeholder="Username"></Input>
            </FormItem>
            <FormItem label="密码" prop="loginPwd">
                <Input type="password" v-model="formInline.loginPwd" placeholder="Password"></Input>
            </FormItem>
            <Row>
                <Col span="18">
                    <FormItem label="验证码" prop="imgCode">
                        <Input type="text" v-model="formInline.imgCode" placeholder="code"></Input>
                    </FormItem>
                </Col>
                <Col span="6">
                    <img class="codeImg" @click="changeCode" :src="imgUrl">
                </Col>
            </Row>
            
            <FormItem>
                <Button type="primary" @click="handleSubmit($event,'formInline')">登录</Button>
            </FormItem>
        </Form>
      </div>
    </div>
</template>
<script>
    import apiUrl from '@/settings/sys'
    import qs from 'qs'
    export default {
        data () {
            return {
                random: '',
                imgUrl: '',
                formInline: {
                    loginName: '',
                    loginPwd: '',
                    imgCode: '',
                    RANDOMVALIDATECODEKEY: ''
                },
                ruleInline: {
                    loginName: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    loginPwd: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ],
                    imgCode: [
                        { required: true, message: '请填写验证码', trigger: 'blur' },
                        { type: 'string', min: 4, message: '密码长度不能小于4位', trigger: 'blur' }
                    ]
                }
            }
        },
        created () {
            this.changeCode()
        },
        methods: {
            changeCode () {
                this.random =  Math.random();
                this.imgUrl = apiUrl.decoUrl + "/tenancy-sys/admin/index/imgCode?RANDOMVALIDATECODEKEY=" + this.random;
                this.formInline.RANDOMVALIDATECODEKEY = this.random;
            },
            handleSubmit(event,name) {
                event.preventDefault();
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.axios.post('/tenancy-sys/admin/index/loginIn?t='+ new Date().getTime(), qs.stringify(this.formInline))
                        .then(response => {
                            this.$Message.success(response.data.message);
                            if(response.data.code == '0000'){
                                this.$local.save('innjia',{
                                    userName: this.formInline.loginName,
                                    id: response.data.result.userId,
                                    token: response.data.result.token
                                })

                                //如果有query.redirect 就跳转到当前 否则就跳转到初始化页面
                                let redUrl = this.$route.query.redirect;
                                if(redUrl){
                                    this.$router.push('/' + this.$route.query.redirect);
                                } else{
                                    this.$router.push('/innjia');
                                }
                            }
                        })
                        .catch((response) => {
                            console.log(response)
                        })
                        
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        }
    }
</script>
<style>
.logn-in{
  width: 100%;
  height: 100%;
  text-align: center;
}
.wrap400{
  width: 360px;
  margin: 160px auto 0;
}
.ivu-form-inline .ivu-form-item{
  display: block;
}
.codeImg{
    position: relative;
    top: 3px;
    cursor: pointer;
}
</style>

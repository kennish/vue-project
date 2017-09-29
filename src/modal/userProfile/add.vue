<template>
  <Modal v-model="show" :width="1100" title="新建菜单" :closable="false" :mask-closable="false">
    <div slot="header">
        <div class="ivu-modal-header-inner">新建菜单</div>
        <a class="ivu-modal-close" @click="del"><i class="ivu-icon ivu-icon-ios-close-empty"></i></a>
    </div>
    <Form ref="addMenuForm" :model="addMenuForm" :rules="addRuleInline" :label-width="80" :inline="true">
      <FormItem label="账号" prop="loginName">
        <Input type="text" v-model="addMenuForm.loginName" placeholder="请输入账号"></Input>
      </FormItem>
      <FormItem label="姓名" prop="userName">
        <Input type="text" v-model="addMenuForm.userName" placeholder="请输入姓名"></Input>
      </FormItem>
      <FormItem label="手机" prop="mobile">
        <Input type="text" v-model="addMenuForm.mobile" placeholder="请输入手机"></Input>
      </FormItem>
      <FormItem label="邮箱" prop="email">
        <Input type="text" v-model="addMenuForm.email" placeholder="请输入邮箱"></Input>
      </FormItem>
      <FormItem label="工号" prop="jobNumber">
        <Input type="text" v-model="addMenuForm.jobNumber" placeholder="请输入工号"></Input>
      </FormItem>
      <FormItem label="密码">
        <Input type="text" value="123456" disabled placeholder="请输入密码"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
        <Button type="primary" size="large" :loading="modalLoading" @click="handleSubmit('addMenuForm')">确定</Button>
        <Button size="large" @click="del">取消</Button>
    </div>
  </Modal> 
</template>

<script>
import qs from 'qs'
export default {
  props: ['show'],
  data () {
    return {
      modalLoading: false, // 新建确定的loading
      // 新建菜单数据
      addMenuForm: {
        loginName: '',
        userName: '',
        mobile: '',
        email: '',
        jobNumber: ''
      },
      // 表单校验
      addRuleInline: {
        loginName: [
          { required: true, message: '请填写账号', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请填写姓名', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请填写手机', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请填写邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    
  },
  watch: {
    show () {
      if(this.show){
        this.$refs['addMenuForm'].resetFields(); // 每次进来重置表单数据
      }
    }
  },
  methods: {
    // 保存添加菜单
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
          if (valid) {
              this.modalLoading = true;
              this.axios.post('/tenancy-sys/admin/user/add',this.addMenuForm,{
                headers: {'Content-Type': 'application/json; charset=utf-8'}
              })
              .then((response) => {
                if (response.data.code == '0000') {
                  this.$emit('reset', true)
                  this.modalLoading = false;
                }
                this.$Message.success(response.data.message);
              })
              .catch((error) => {
                this.$Message.error('提交失败!');
                this.modalLoading = false;
              })
          } else {
              this.$Message.error('表单验证失败!');
          }
      })
    },
    del () {
      this.$emit('reset')
    }
  }
}
</script>


<template>
  <Modal v-model="show" :width="1100" title="编辑参数" :closable="false" :mask-closable="false">
    <div slot="header">
        <div class="ivu-modal-header-inner">编辑参数</div>
        <a class="ivu-modal-close" @click="del"><i class="ivu-icon ivu-icon-ios-close-empty"></i></a>
    </div>
    <Form v-if="show" ref="editForm" :model="editForm" :rules="addRuleInline" :label-width="80" :inline="true">
      <FormItem label="参数名称" prop="key">
        <Input type="text" v-model="editForm.key" placeholder="请输入参数名称"></Input>
      </FormItem>
      <FormItem label="参数内容" prop="value">
        <Input type="text" v-model="editForm.value" placeholder="参数内容"></Input>
      </FormItem>
      <FormItem label="备注" prop="remark">
        <Input type="text" v-model="editForm.remark" placeholder="请输入备注"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
        <Button type="primary" size="large" :loading="modalLoading" @click="handleSubmit('editForm')">确定</Button>
        <Button size="large" @click="del">取消</Button>
    </div>
  </Modal> 
</template>

<script>
import qs from 'qs'
export default {
  props: ['show', 'data'],
  data () {
    return {
      modalLoading: false, // 新建确定的loading
      upRoleData: null,
      // 新建菜单数据
      editForm: {
        id: '',
        key: '',
        value: '',
        remark: ''
      },
      // 表单校验
      addRuleInline: {
        value: [
          { required: true, message: '请填写参数内容', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    
  },
  watch: {
    show () {
      if(this.show){
        this.editForm = {
          id: this.data.id,
          key: this.data.paramKey,
          value: this.data.paramValue,
          remark: this.data.remark
        }
      }
    }
  },
  methods: {
    // 保存添加菜单
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
          if (valid) {
              this.modalLoading = true;
              this.axios.post('/tenancy-sys/admin/systemConf/update',qs.stringify(this.editForm))
              .then((response) => {
                if (response.data.code == '0000') {
                  this.$emit('reset', true)
                }
                this.modalLoading = false;
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
      this.$refs['editForm'].resetFields(); // 每次进来重置表单数据
      this.$emit('reset')
    }
  }
}
</script>

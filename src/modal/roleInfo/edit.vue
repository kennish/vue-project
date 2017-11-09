<template>
  <Modal v-model="show" :width="1100" title="编辑角色" :closable="false" :mask-closable="false">
    <div slot="header">
        <div class="ivu-modal-header-inner">编辑角色</div>
        <a class="ivu-modal-close" @click="del"><i class="ivu-icon ivu-icon-ios-close-empty"></i></a>
    </div>
    <Form v-if="show" ref="editForm" :model="editForm" :rules="addRuleInline" :label-width="80" :inline="true">
      <FormItem label="角色名称" prop="roleName">
        <Input type="text" v-model="editForm.roleName" placeholder="请输入角色名称"></Input>
      </FormItem>
      <FormItem label="所属角色" prop="upId">
        <Select v-model="editForm.upId" placeholder="请选择所属角色" style="width: 146px; text-align: left;" clearable>
          <Option v-for="(item, index) in upRoleData" :key="index" :value="item.id">{{item.roleName}}</Option>
        </Select>
      </FormItem>
      <FormItem label="备注" prop="remark">
        <Input type="text" v-model="editForm.remark" placeholder="请输入备注"></Input>
      </FormItem>
      <FormItem label="角色状态">
        <Select v-model="editForm.status" placeholder="请选择角色状态" style="width: 146px; text-align: left;" clearable>
          <Option value="AVAILABLE">可用</Option>
          <Option value="FORBID">禁止</Option>
          <Option value="DELETE">删除</Option>
        </Select>
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
        remark: '',
        roleName: '',
        status: '',
        upId: ''
      },
      // 表单校验
      addRuleInline: {
        roleName: [
          { required: true, message: '请填写角色名称', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请填写备注', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    
  },
  watch: {
    show () {
      if(this.show){
        console.log(this.data)
        this.getUpRole();
        this.editForm = {
          id: this.data.id,
          remark: this.data.remark,
          roleName: this.data.roleName,
          status: this.data.status,
          upId: this.data.upId
        }
      }
    }
  },
  methods: {
    //请求所属角色数据
    getUpRole () {
      let data = {
        page: 1,
        rows: 25,
        status: 'AVAILABLE',
        upId: ''
      }
      this.axios.post('/tenancy-sys/admin/role/list', qs.stringify(data))
      .then(response => {
        this.upRoleData = response.data.result;
      })
      .catch(error => {
        console.log(error)
      })
    },
    // 保存添加菜单
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
          if (valid) {
              this.modalLoading = true;
              this.axios.post('/tenancy-sys/admin/role/update',this.editForm,{
                headers: {'Content-Type': 'application/json; charset=utf-8'}
              })
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

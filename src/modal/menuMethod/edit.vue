<template>
  <Modal v-model="show" :width="1100" title="编辑菜单方法" :closable="false" :mask-closable="false">
    <div slot="header">
        <div class="ivu-modal-header-inner">编辑菜单方法</div>
        <a class="ivu-modal-close" @click="del"><i class="ivu-icon ivu-icon-ios-close-empty"></i></a>
    </div>
    <Form v-if="show" ref="editForm" :model="editForm" :rules="addRuleInline" :label-width="80" :inline="true">
      <FormItem label="方法名称" prop="methodName">
        <Input type="text" v-model="editForm.methodName" placeholder="请输入方法名称"></Input>
      </FormItem>
      <FormItem label="关键字" prop="methodTagName">
        <Input type="text" v-model="editForm.methodTagName" placeholder="请输入关键字"></Input>
      </FormItem>
      <FormItem label="所属菜单" prop="menuId">
        <Select v-model="editForm.menuId" placeholder="请选择所属菜单" style="width: 146px; text-align: left;" clearable>
          <Option v-for="(item, index) in menuList" :key="index" :value="item.id">{{item.menuName}}</Option>
        </Select>
      </FormItem>
      <FormItem label="状态" prop="isSelected">
        <Select v-model="editForm.isSelected" placeholder="请选择状态" style="width: 146px; text-align: left;">
          <Option :value="1">已选择</Option>
          <Option :value="0">未选择</Option>
        </Select>
      </FormItem>
      <FormItem label="方法状态" prop="status">
        <Select v-model="editForm.status" placeholder="请选择方法状态" style="width: 146px; text-align: left;">
          <Option value="AVAILABLE">可用</Option>
          <Option value="FORBID">禁止</Option>
          <Option value="DELETE">删除</Option>
        </Select>
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
      menuListData: [],
      // 新建菜单数据
      editForm: {
        id: '',
        methodName: '',
        methodTagName: '',
        menuId: '',
        isSelected: '',
        status: '',
        remark: ''
      },
      // 表单校验
      addRuleInline: {
        methodName: [
          { required: true, message: '请填写方法名称', trigger: 'blur' }
        ],
        methodTagName: [
          { required: true, message: '请填写关键字', trigger: 'blur' }
        ],
        menuId: [
          { required: true, message: '请填写所属菜单', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    
  },
  watch: {
    show () {
      if(this.show){
        this.getMenuList();
        this.editForm = {
          id: this.data.id,
          methodName: this.data.methodName,
          methodTagName: this.data.methodTagName,
          menuId: this.data.menuId,
          isSelected: this.data.isSelected,
          status: this.data.status,
          remark: this.data.remark
        }
      }
    }
  },
  computed: {
    menuList () {
      return this.menuListData.filter((item) => {
        return item.level == 1
      })
    }
  },
  methods: {
    //获取所属菜单
    getMenuList () {
      this.axios.post('/tenancy-sys/admin/menu/all/list')
      .then((response) => {
        if (response.data.code == '0000') {
          this.menuListData = response.data.result
        }
      })
      .catch((errpr) => {
        console.log(error)
      })
    },
    // 保存添加菜单
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
          if (valid) {
              this.modalLoading = true;
              this.axios.post('/tenancy-sys/admin/menuMethod/update', this.editForm, {
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

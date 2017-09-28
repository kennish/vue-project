<template>
  <Modal v-model="show" :width="1100" title="新建菜单" :closable="false" :mask-closable="false">
    <div slot="header">
        <div class="ivu-modal-header-inner">新建菜单</div>
        <a class="ivu-modal-close" @click="del('editMenuForm')"><i class="ivu-icon ivu-icon-ios-close-empty"></i></a>
    </div>
    <Form v-if="show" ref="editMenuForm" :model="editMenuForm" :rules="addRuleInline" :label-width="80" :inline="true">
      <FormItem label="菜单名称" prop="menuName">
        <Input type="text" v-model="editMenuForm.menuName" placeholder="请输入菜单名称"></Input>
      </FormItem>
      <FormItem label="菜单图标" prop="menuIconCss">
        <Input type="text" v-model="editMenuForm.menuIconCss" placeholder="请输入菜单图标"></Input>
      </FormItem>
      <FormItem label="排序字符" prop="sort">
        <Input type="text" v-model="editMenuForm.sort" placeholder="请输入排序字符"></Input>
      </FormItem>
      <FormItem label="所属菜单" prop="upId">
        <Select v-model="editMenuForm.upId" placeholder="请选择" style="width: 162px" clearable>
          <Option :value="item.id" v-for="(item,index) in upMenu" :key="index">{{item.menuName}}</Option>
        </Select>
      </FormItem>
      <FormItem label="请求路径" prop="menuPath">
        <Input type="text" v-model="editMenuForm.menuPath" placeholder="请输入请求路径"></Input>
      </FormItem>
      <FormItem label="菜单类型" prop="menuType">
        <Select v-model="editMenuForm.menuType" placeholder="请选择" style="width: 162px" clearable>
          <Option value="INTERNAL">内部</Option>
          <Option value="EXTERNAL">外部</Option>
        </Select>
      </FormItem>
      <FormItem label="备注" prop="remark">
        <Input type="text" v-model="editMenuForm.remark" placeholder="请输入备注"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
        <Button type="primary" size="large" :loading="modalLoading" @click="handleSubmit('editMenuForm')">确定</Button>
        <Button size="large" @click="del('editMenuForm')">取消</Button>
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
      upMenuList: null,
      // 新建菜单数据
      editMenuForm: null,
      // 表单校验
      addRuleInline: {
        menuName: [
          { required: true, message: '请填写菜单名称', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请填写排序字段', trigger: 'blur' }
        ],
        menuPath: [
          { required: true, message: '请填写请求路径', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    
  },
  watch: {
    show () {
      if(this.show){
        this.editMenuForm = this.data;
        this.axios.post('/tenancy-sys/admin/menu/all/list')
        .then((response) => {
          this.upMenuList = response.data.result;
        })
        .catch((error) => {
          this.$Message.error('获取所属菜单数据失败');
        })
      }
    }
  },
  computed: {
    upMenu () {
      if(this.upMenuList){
        return this.upMenuList.filter((item) => {
          return item.level == 0
        })
      }
    }
  },
  methods: {
    // 保存添加菜单
    handleSubmit (name) {
      delete this.editMenuForm.upMenuName;
      delete this.editMenuForm.isSelected;
      delete this.editMenuForm.createTime;
      delete this.editMenuForm.menuMethods;
      delete this.editMenuForm._index;
      delete this.editMenuForm._rowKey;
      this.$refs[name].validate((valid) => {
          if (valid) {
              this.modalLoading = true;
              this.axios.post('/tenancy-sys/admin/menu/update',this.editMenuForm,{
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
    del (name) {
      this.$refs[name].resetFields();
      this.$emit('reset')
    }
  }
}
</script>


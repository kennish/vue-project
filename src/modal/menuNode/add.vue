<template>
  <Modal v-model="show" :width="1100" title="新建菜单" :closable="false" :mask-closable="false">
    <div slot="header">
        <div class="ivu-modal-header-inner">新建菜单</div>
        <a class="ivu-modal-close" @click="del"><i class="ivu-icon ivu-icon-ios-close-empty"></i></a>
    </div>
    <Form ref="addMenuForm" :model="addMenuForm" :rules="addRuleInline" :label-width="80" :inline="true">
      <FormItem label="菜单名称" prop="menuName">
        <Input type="text" v-model="addMenuForm.menuName" placeholder="请输入菜单名称"></Input>
      </FormItem>
      <!-- <FormItem label="菜单图标" prop="menuIconCss">
        <Input type="text" v-model="addMenuForm.menuIconCss" placeholder="请输入菜单图标"></Input>
      </FormItem> -->
      <FormItem label="菜单图标" prop="menuIconCss">
        <Input type="text" style="width:162px" v-model="addMenuForm.menuIconCss" placeholder="请输入菜单图标">
          <Button slot="append" icon="ios-keypad-outline" @click="iconHide">
            <icon-select :show="iconShow" @getType="getType" @hide="iconHide"></icon-select>
          </Button>
          
        </Input>
      </FormItem>
      <FormItem label="排序字符" prop="sort">
        <Input type="text" v-model="addMenuForm.sort" placeholder="请输入排序字符"></Input>
      </FormItem>
      <FormItem label="所属菜单" prop="upId">
        <Select v-model="addMenuForm.upId" placeholder="请选择" style="width: 162px" clearable>
          <Option :value="item.id" v-for="(item,index) in upMenu" :key="index">{{item.menuName}}</Option>
        </Select>
      </FormItem>
      <FormItem label="请求路径" prop="menuPath">
        <Input type="text" v-model="addMenuForm.menuPath" placeholder="请输入请求路径"></Input>
      </FormItem>
      <FormItem label="菜单类型" prop="menuType">
        <Select v-model="addMenuForm.menuType" placeholder="请选择" style="width: 162px" clearable>
          <Option value="INTERNAL">内部</Option>
          <Option value="EXTERNAL">外部</Option>
        </Select>
      </FormItem>
      <FormItem label="备注" prop="remark">
        <Input type="text" v-model="addMenuForm.remark" placeholder="请输入备注"></Input>
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
import iconSelect from '@/components/iconSelector/iconSelector'
export default {
  components: {iconSelect},
  props: ['show'],
  data () {
    return {
      iconShow: false,
      mymodal: true,
      modalLoading: false, // 新建确定的loading
      upMenuList: null,
      // 新建菜单数据
      addMenuForm: {
        menuName: '',
        menuIconCss: '',
        sort: '',
        upId: '',
        menuPath: '',
        menuType: 'INTERNAL',
        remark: ''
      },
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
        this.$refs['addMenuForm'].resetFields(); // 每次进来重置表单数据
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
      this.$refs[name].validate((valid) => {
          if (valid) {
              this.modalLoading = true;
              this.axios.post('/tenancy-sys/admin/menu/add',this.addMenuForm,{
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
    //获取icon样式
    getType (t) {
      this.addMenuForm.menuIconCss = t;
    },
    //隐藏icon选择器
    iconHide () {
      this.iconShow = !this.iconShow;
    },
    del () {
      this.$emit('reset')
    }
  }
}
</script>


<template>
  <Modal v-model="show" :width="1100" title="图片上传" :closable="false" :mask-closable="false">
    <div slot="header">
        <div class="ivu-modal-header-inner">图片上传</div>
        <a class="ivu-modal-close" @click="del"><i class="ivu-icon ivu-icon-ios-close-empty"></i></a>
    </div>
    <Form v-if="show">
      <up-load-img :length="3" :action="`/innjia-service/innjia/api/uploadFileSave.json`"></up-load-img>
    </Form>
    <div slot="footer">
        <Button type="primary" size="large" :loading="modalLoading" @click="handleSubmit('upLoadForm')">确定</Button>
        <Button size="large" @click="del">取消</Button>
    </div>
  </Modal> 
</template>

<script>
import qs from 'qs';
import upLoadImg from '@/components/upLoadImg/upLoadImg'
export default {
  components: {
    upLoadImg
  },
  props: ['show', 'data'],
  data () {
    return {
      modalLoading: false, // 新建确定的loading
      upRoleData: null,
      // 新建菜单数据
      upLoadForm: {
        id: '',
        key: '',
        value: '',
        remark: ''
      }
    }
  },
  created () {
    
  },
  watch: {
    show () {
      if(this.show){
        
      }
    }
  },
  methods: {
    // 保存添加菜单
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
          if (valid) {
              this.modalLoading = true;
              this.axios.post('/tenancy-sys/admin/systemConf/update',qs.stringify(this.upLoadForm))
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
      this.$emit('reset')
    }
  }
}
</script>

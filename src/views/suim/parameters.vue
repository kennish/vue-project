<template>
<div>
      <Row>
          <Col span="8">
            <div class="handle-bar">
                <Button type="primary" size="small" @click="modal1 = true"><Icon type="plus-round"></Icon> 新建</Button>
                <Button type="warning" size="small" @click="edit('')"><Icon type="edit"></Icon> 编辑</Button>
                <Button type="error" size="small" @click="deleteHandle"><Icon type="close-round"></Icon> 删除</Button>
                <Dropdown trigger="click">
                    <Button size="small">
                        更多功能
                        <Icon type="arrow-down-b"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem>导出数据</DropdownItem>
                        <DropdownItem>查看详情</DropdownItem>
                        <DropdownItem>会员征信</DropdownItem>
                        <DropdownItem>修改密码</DropdownItem>
                        <DropdownItem>查看合同</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
          </Col>
          <Col span="16">
            <div class="query-bar">
                <Input style="width: auto" v-model="query.key" size="small" placeholder="参数名称名称"></Input>
                <Button type="success" size="small" @click="getDatas"><Icon type="search"></Icon> 查询</Button>
                <Button size="small" @click="queryShow = true"><Icon type="gear-a"></Icon> 高级查询</Button>
            </div>
          </Col>
      </Row>
    <div class="tab-main" ref="tab">
      <Spin size="large" fix v-if="loading"></Spin>
      <Table :columns="columns" :data="data" :height="tabHeight" @on-selection-change="rowdatas" size="small" ref="table" stripe></Table>
    </div>
    <div class="pager-bar">
      <Page v-if="pager" :total="pager.recordCount" show-sizer @on-change="changePage" @on-page-size-change="getPageSize" placement="top"></Page>
    </div>
    <div>
        <add-modal :show="modal1" @reset="resetModal"></add-modal>
        <edit-modal :show="editModal" :data="rowData[0]" @reset="resetModal"></edit-modal>
        <up-load :show="upLoadModal" @reset="resetModal"></up-load>
        <advanced-query :show="queryShow" @reset="resetQueryModal">
            <div slot="queryMain">
                <Form :label-width="80" inline>
                    <FormItem label="输入框">
                    <Input placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="输入框">
                    <Input placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="输入框">
                    <Input placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="输入框">
                    <Input placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="输入框">
                    <Input placeholder="请输入"></Input>
                    </FormItem>
                </Form>
            </div>
        </advanced-query>
    </div>
</div>
</template>
<script>
import qs from 'qs'
import addModal from '@/modal/parameters/add'
import editModal from '@/modal/parameters/edit'
import upLoad from '@/modal/parameters/upLoadModal'
import advancedQuery from '@/components/advancedQuery'
export default {
    components: {
        addModal,
        editModal,
        upLoad,
        advancedQuery
    },
    data () {
        return {
            modal1: false, // 控制新建弹出窗
            editModal: false, // 控制编辑弹出窗
            upLoadModal: false, // 控制图片上传
            loading: false, // 控制loding
            tabHeight: window.innerHeight - 300, // 计算tab的高度
            data: [], // 存储核心数据
            pager: null,
            rowData: [], // 存储复选框选中的数据
            queryShow: false, // 控制高级查询弹出窗
            // 查询条件
            query: {
                key: '',
                page: 1,
                rows: 10,
                order: 'asc',
                sort: 'sort'
            },
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    "title": "参数名称",
                    "width": 150,
                    "key": "paramKey"
                },
                {
                    "title": "参数内容",
                    "key": "paramValue"
                },
                {
                    "title": "备注",
                    "key": "remark"
                },
                {
                    "title": "创建时间",
                    "key": "createTime",
                    "ellipsis": "true"
                },
                {
                    "title": "操作",
                    "width": 200,
                    "key": "",
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.edit(params)
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.upLoad(params)
                                    }
                                }
                            }, '图片')
                        ]);
                    }
                    
                }
            ]
        }
    },
    created () {
        this.getDatas();
    },
    computed: {
        
    },
    methods: {
        // 上传图片
        upLoad (params) {
          this.upLoadModal = true;
        },
        edit (params) {
            if(params == ''){ // 没有params即为顶部操作
                if (this.rowData.length == 0) {
                    this.$Message.error('请选择编辑项!');
                } else if (this.rowData.length >= 2) {
                    this.$Message.error('一次只能编辑一项!');
                } else{
                    this.editModal = true;
                }
            } else{  // 行内操作
                this.$refs.table.selectAll(false); // 取消所有选中项并且清空其绑定的数据
                this.editModal = true;
                this.rowData.push(params.row);
            }
        },
        // 分页导航事件 回调index
        changePage (index) {
            this.$refs.table.selectAll(false); // 取消所有选中项并且清空其绑定的数据
            this.query.page = index;
            this.getDatas();
        },
        //切换每页条数时的回调，返回切换后的每页条数
        getPageSize (size) {
            this.query.rows = size;
            this.getDatas();
        },
        // 获取数据
        getDatas () {
            this.loading = !this.loading;
            this.axios.post('/tenancy-sys/admin/systemConf/list',qs.stringify(this.query))
            .then(response => {
                if (response.data.code == '0000') {
                    this.data = response.data.result;
                    this.pager = response.data.pager
                    this.loading = !this.loading;
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        
        // 点击多选按钮触发的事件，返回选中的数据
        rowdatas (selection) {
            this.rowData = selection;
        },
        //重置modal状态 和取消选中项 如果返回true表示异步请求成功需要刷新当前页面
        resetModal (boolean) {
            if(boolean){
                this.getDatas()
            } else{ // 点击关闭按钮回来的
                this.$refs.table.selectAll(false); // 取消所有选中项并且清空其绑定的数据
            }
            this.modal1 = false;
            this.editModal = false;
            this.upLoadModal = false;
        },
        // 重置高级查询状态
        resetQueryModal () {
            this.queryShow = false;
        },
        // 删除
        deleteHandle () {
            if (this.rowData.length == 0) {
                this.$Message.error('请选择编辑项!');
            } else{
                let ids = "";
                this.rowData.forEach((item) => {
                    ids += item.id + ',';
                });
                ids = ids.substring(0,ids.length-1);

                this.$Modal.confirm({
                    title: '警告',
                    content: '<p>您确定要删除选中项吗</p>',
                    loading: true,
                    onOk: () => {
                        this.axios.post('/tenancy-sys/admin/systemConf/delete', qs.stringify({'ids': ids}))
                        .then((response) => {
                            if(response.data.code == '0000'){
                                this.$Modal.remove();
                                this.getDatas()
                            }
                            this.$Message.success(response.data.message);
                        })
                        .catch((error) => {
                            this.$Message.error('删除失败!');
                        })
                    },
                    onCancel: () => {
                        // this.$Message.info('点击了取消');
                    }
                });

            }
        }
    }
}
</script>
<style>
.handle-bar,.query-bar{
    margin-bottom: 15px;
    margin-top: 5px;
}
.query-bar{
    text-align: right;
}
.pager-bar{
    text-align: right;
    padding-top: 10px;
}
.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
.demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eee;
}
.tab-main{
    position: relative;
}
.ivu-spin-fix{
    display: block;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, .4);
}
.ivu-spin-fix .ivu-spin-main{
    width: 44px;
    height: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -20px;
    margin-left: -22px;
}

.ivu-table-fixed-body{
    /* 不加当有横向滚动条的时候样式有bug */
    padding-bottom: 16px;
}
</style>

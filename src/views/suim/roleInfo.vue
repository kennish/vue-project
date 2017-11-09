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
                <Input style="width: auto" v-model="query.roleName" size="small" placeholder="角色名称"></Input>
                <Select size="small" v-model="query.upId" placeholder="请选择所属角色" style="width: 146px; text-align: left;" clearable>
                    <Option v-for="(item, index) in upData" :key="index" :value="item.id">{{item.roleName}}</Option>
                </Select>
                <Select size="small" v-model="query.status" placeholder="请选择状态" style="width: 146px; text-align: left;" clearable>
                    <Option value="AVAILABLE">可用</Option>
                    <Option value="FORBID">禁止</Option>
                    <Option value="DELETE">删除</Option>
                </Select>
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
        <permission-modal :show="permissionModal" :data="rowData[0]" @reset="resetModal"></permission-modal>
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
import addModal from '@/modal/roleInfo/add'
import editModal from '@/modal/roleInfo/edit'
import permissionModal from '@/modal/roleInfo/permission'
import advancedQuery from '@/components/advancedQuery'
export default {
    components: {
        addModal,
        editModal,
        permissionModal,
        advancedQuery
    },
    data () {
        return {
            modal1: false, // 控制新建弹出窗
            editModal: false, // 控制编辑弹出窗
            permissionModal: false, // 控制权限弹出窗
            loading: false, // 控制loding
            tabHeight: window.innerHeight - 300, // 计算tab的高度
            data: [], // 存储核心数据
            pager: null,
            rowData: [], // 存储复选框选中的数据
            queryShow: false, // 控制高级查询弹出窗
            upMenuLists: null,  //存储所属菜单
            upData: null, // 存储所属角色数据
            // 查询条件
            query: {
                roleName: '',
                upId: '',
                status: '',
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
                    "title": "角色名称",
                    "width": 150,
                    "key": "roleName"
                },
                {
                    "title": "所属角色",
                    "key": "upRoleName"
                },
                {
                    "title": "角色等级",
                    "key": "level",
                    render: (h, {row}) => {
                      if (row.level == 0) {
                        return h('span', {
                          props: {},
                          style: {}
                        }, '一级角色')
                      } else if (row.level == 1) {
                        return h('span', {
                          props: {},
                          style: {}
                        }, '二级角色')
                      }
                    }
                },
                {
                    "title": "角色状态",
                    "sortable": true,
                    "key": "status",
                    render: (h, {row}) => {
                        if (row.status == "AVAILABLE") {
                            return h('span',{
                                props: {
                                    
                                },
                                style: {
                                    color: '#19be6b'
                                }
                            }, '可用')
                        } else if (row.status == "FORBID") {
                            return h('span',{
                                props: {
                                    
                                },
                                style: {
                                    color: '#f90'
                                }
                            }, '禁止')
                        } else if (row.status == "DELETE") {
                            return h('span',{
                                props: {
                                    
                                },
                                style: {
                                    color: '#ed3f14'
                                }
                            }, '删除')
                        }
                    }
                },
                {
                    "title": "备注",
                    "key": "remark",
                    "ellipsis": "true"
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
                                        this.rolePermission(params)
                                    }
                                }
                            }, '权限'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {

                                },
                                on: {
                                    click: () => {
                                        //this.resetPSW(params)
                                    }
                                }
                            }, '成员')
                        ]);
                    }
                    
                }
            ]
        }
    },
    created () {
        this.getDatas();
        this.getUpDatas();
    },
    computed: {
        upMenus () {
            if(this.upMenuLists){
                return this.upMenuLists.filter((item) => {
                    return item.level == 0
                })
            }
        }
    },
    methods: {
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
        // 角色权限
        rolePermission (params) {
            if(params == ''){ // 没有params即为顶部操作
                if (this.rowData.length == 0) {
                    this.$Message.error('请选择编辑项!');
                } else if (this.rowData.length >= 2) {
                    this.$Message.error('一次只能编辑一项!');
                } else{
                    this.permissionModal = true;
                }
            } else{  // 行内操作
                this.$refs.table.selectAll(false); // 取消所有选中项并且清空其绑定的数据
                this.permissionModal = true;
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
            this.axios.post('/tenancy-sys/admin/role/list',qs.stringify(this.query))
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
        // 获取所属角色数据
        getUpDatas () {
          this.axios.post('/tenancy-sys/admin/role/all/list')
          .then(response => {
            if (response.data.code == '0000') {
              this.upData = response.data.result;
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
            this.permissionModal = false;
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
                        this.axios.post('/tenancy-sys/admin/user/batchDelete', qs.stringify({'ids': ids}))
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
        },
        //重置密码
        resetPSW (params) {

            this.$Modal.confirm({
                title: '警告',
                content: '<p>重置后密码为123456，您确定要这么做吗</p>',
                loading: true,
                onOk: () => {
                    this.axios.post('/tenancy-sys/admin/user/reset/password', qs.stringify({'userId': params.row.id}))
                    .then((response) => {
                        if(response.data.code == '0000'){
                            this.$Modal.remove();
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

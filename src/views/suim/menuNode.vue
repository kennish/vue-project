<template>
  <div>
    <div class="query-bar">
      <Input style="width: auto" v-model="query.menuName" size="small" placeholder="姓名"></Input>
      <Button type="success" size="small" @click="getDatas"><Icon type="search"></Icon> 查询</Button>
    </div>
    <div class="handle-bar">
      <Button type="info" size="small" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> 导出原始数据</Button>
      <Button type="info" size="small" @click="exportData(2)"><Icon type="ios-download-outline"></Icon> 导出排序和过滤后的数据</Button>
      <Button type="info" size="small" @click="exportData(3)"><Icon type="ios-download-outline"></Icon> 导出自定义数据</Button>
    </div>
    <div class="tab-main" style="position: relative">
      <Spin fix>
          <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
          <div>Loading</div>
      </Spin>
      <Table :columns="columns" :data="data" :height="650" size="small" ref="table" stripe></Table>
    </div>
    <div class="pager-bar">
      <Page v-if="pager" :total="pager.recordCount" show-sizer @on-change="changePage" @on-page-size-change="getPageSize" placement="top"></Page>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
    export default {
        data () {
            return {
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        "title": "菜单名称",
                        "key": "menuName",
                        "width": 200
                    },
                    {
                        "title": "菜单等级",
                        "key": "level",
                        "width": 150,
                        "sortable": true,
                        filters: [
                            {
                                label: '大于4000',
                                value: 1
                            },
                            {
                                label: '小于4000',
                                value: 2
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.show > 4000;
                            } else if (value === 2) {
                                return row.show < 4000;
                            }
                        }
                    },
                    {
                        "title": "所属菜单",
                        "key": "upMenuName",
                        "sortable": true
                    },
                    {
                        "title": "跳转路径",
                        "key": "menuPath",
                        "sortable": true
                    },
                    {
                        "title": "排序",
                        "key": "sort",
                        "sortable": true
                    },
                    {
                        "title": "菜单类型",
                        "key": "menuType",
                        "sortable": true
                    },
                    {
                        "title": "菜单状态",
                        "key": "status",
                        "sortable": true
                    },
                    {
                        "title": "创建时间",
                        "key": "createTime",
                        "sortable": true
                    },
                    {
                        "title": "操作",
                        "key": "",
                        "sortable": true,
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
                                  }, '编辑')
                              ]);
                        }
                        
                    }
                ],
                data: [],
                pager: null,
                query: {
                  menuName: '',
                  status: 'AVAILABLE',
                  page: 1,
                  rows: 10,
                  order: 'asc',
                  sort: 'sort'
                }
            }
        },
        created () {
          this.getDatas();
        },
        methods: {
            exportData (type) {
                if (type === 1) {
                    this.$refs.table.exportCsv({
                        filename: '原始数据'
                    });
                } else if (type === 2) {
                    this.$refs.table.exportCsv({
                        filename: '排序和过滤后的数据',
                        original: false
                    });
                } else if (type === 3) {
                    this.$refs.table.exportCsv({
                        filename: '自定义数据',
                        columns: this.columns8.filter((col, index) => index < 4),
                        data: this.data7.filter((data, index) => index < 4)
                    });
                }
            },
            edit (params) {
              console.log(params.index)
            },
            // 分页导航事件 回调index
            changePage (index) {
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
              this.axios.post('/tenancy-sys/admin/menu/list',qs.stringify(this.query))
              .then(response => {
                this.data = response.data.result;
                this.pager = response.data.pager
              })
              .catch(error => {
                console.log(error)
              })
            }     
        }
    }
</script>
<style>
  .handle-bar,.query-bar{
    margin-bottom: 10px;
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
  .ivu-spin-fix{
    display: block;
    width: 44px;
    height: 40px;
    top: 50%;
    left: 50%;
    margin-top: -20px;
    margin-left: -22px;
  }
  
</style>


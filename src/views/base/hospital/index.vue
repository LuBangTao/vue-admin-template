<template>
  <div>
    <el-card>
      <div slot="header">
        <el-form :inline="true" :model="search" class="search-form">
          <el-form-item label="医院名称">
            <el-select v-model="search.hospital" clearable filterable placeholder="医院名称">
              <el-option v-for="(item) in hospitals" :key="item.id" :label="item.value" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
          <el-form-item style="float: right">
            <el-button type="primary" @click="handleAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
      <tableTemplate
        ref="tableTemplate"
        :table-title="tableTitle"
        :table-col="tableCol"
        :table-data="tableData"
        :operator="operator"
        :first-table-col="firstTableCol"
        :total="total"
        :page.sync="queryParams.page"
        :limit.sync="queryParams.limit"
        @handleSelectionChange="handleSelectionChange"
        @pagination="getList"
      />
    </el-card>
    <!--新增/编辑页-->
    <base-form v-if="showEditForm" ref="baseForm" />
  </div>
</template>

<script>
// 引入API接口
import { page } from '@/api/hospital'
// 通用的Table模型
import tableTemplate from '@/components/table/template'
import BaseForm from '@/views/base/hospital/baseForm'
export default {
  components: {
    BaseForm,
    tableTemplate
  },
  data() {
    return {
      showEditForm: false,
      hospitals: [],
      projects: [],
      versions: [],
      // 查询参数
      search: {
        hospital: ''
      },
      queryParams: {
        page: 1,
        limit: 10
      },
      type: 'success',
      total: 2,
      // element-ui中对table属性的设置
      tableTitle: {
        'border': true,
        'stripe': true,
        'highlightCurrentRow': true
      },
      // 设置table的列
      tableCol: [
        { prop: 'hospitalName', label: '医院名称' },
        { prop: 'address', label: '详细地址' },
        { prop: 'createTime', label: '创建时间' },
        { prop: 'updateTime', label: '更新时间' }
      ],
      // table的基本操作
      operator: [
        { 'text': '详情', click: (row, col, cellValue) => { return this.getInfo(row) } },
        { 'text': '删除', click: (row, col, cellValue) => { return this.delInfo(row) } },
        { 'text': '编辑', click: (row, col, cellValue) => { return this.editInfo(row) } }
      ],
      // 模拟数据
      tableData: [
        {
          id: 1,
          hospitalName: '北京协和医院(东单院区)',
          address: '北京市东城区帅府园1号',
          createTime: '2022-01-01',
          updateTime: '2022-01-01',
          children: [{
            id: 11,
            hospitalName: '北京协和医院(西院)',
            address: '北京市西城区二龙路大木仓胡同41号',
            createTime: '2022-01-01',
            updateTime: '2022-01-01'
          }]
        },
        {
          id: 2,
          hospitalName: '北京协和医院(西院)',
          address: '北京市西城区二龙路大木仓胡同41号',
          createTime: '2022-01-01',
          updateTime: '2022-01-01'
        }],
      firstTableCol: {
        'select': false,
        'type': 'selection'
      }
    }
  },
  // 页面首次加载
  mounted: function() {
    this.handleSearch()
  },
  methods: {
    // 查
    handleSearch() {
      console.log(this.search)
      page({}).then(res => {
        // 把请求到的数据给testDatas数组
        this.tableData = res.data.records
        // 当前页数
        this.current = res.data.current
        // 当前页数量
        this.pageSize = res.data.size
        // 分页总数
        this.total = res.data.total
      })
    },
    getInfo(val) {
      // 触发父方法
      console.log('获取详情', val)
    },
    delInfo(val) {
      // 触发父方法
      console.log('删除信息', val)
    },
    handleAdd(val) {
      // 触发父方法
      console.log('编辑信息', val)
      this.showEditForm = true
      this.$nextTick(() => {
        this.$refs.baseForm.init({})
      })
    },
    getImgurl(val) {
      // console.log(val.img)
      return val.img
    },
    sexFormatter(val) {
      return val.sex === 0 ? '男' : '女'
    },
    handleSelectionChange(val) {
      console.log('监听选择框', val)
    },
    getList(queryParams) {
      console.log('父级方法', queryParams)
    },
    listImgUrl() {
      const array = []
      array.push('https://pic1.zhimg.com/80/v2-894ab624807fd4cfa33dd4e42cc90ac8_720w.jpg?source=1940ef5c')
      array.push('https://cdn.pixabay.com/photo/2021/07/01/21/20/girl-6380331_960_720.jpg')
      return array
    },
    render(h, params) {
      console.log(123)
      return h('span', null, '我是一个render组件')
    }
  }
}
</script>
<style>
.search-form .el-form-item{margin-bottom: 0px;}
</style>

<template>
  <div>
    <el-card>
      <div slot="header">
        <el-form :inline="true" :model="search" class="search-form">
          <el-form-item label="医院">
            <el-select v-model="search.hospital" clearable placeholder="医院">
              <el-option v-for="(item) in hospitals" :key="item.id" :label="item.value" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="项目">
            <el-select v-model="search.project" clearable placeholder="项目">
              <el-option v-for="(item) in projects" :key="item.id" :label="item.value" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="版本">
            <el-select v-model="search.version" clearable placeholder="版本">
              <el-option v-for="(item) in versions" :key="item.id" :label="item.value" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button type="primary" @click="handleSearch">导出</el-button>
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
  </div>
</template>

<script>

// 通用的Table模型
import tableTemplate from '@/components/table/template'

export default {
  components: {
    tableTemplate
  },
  data() {
    return {
      hospitals: [],
      projects: [],
      versions: [],
      search: {
        hospital: '',
        project: '',
        version: ''
      },
      queryParams: {
        page: 1,
        limit: 10
      },
      type: 'success',
      total: 3,
      // element-ui中对table属性的设置
      tableTitle: {
        'border': true,
        'stripe': true,
        'highlightCurrentRow': true
      },
      // 设置table的列
      tableCol: [
        { prop: 'hospitalName', label: '医院名称' },
        { prop: 'projectName', label: '项目名称' },
        { prop: 'version', label: '版本号' },
        { prop: 'deployDate', label: '部署日期' },
        { prop: 'issueNum', label: '反馈问题数' },
        { prop: 'solvedNum', label: '已解决' },
        { prop: 'maintainer', label: '驻场人员' }
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
          hospitalName: '北京协和医院',
          projectName: '协同任务管理系统',
          version: '1.0.0',
          deployDate: '2022-01-01',
          issueNum: 5,
          solvedNum: 3,
          maintainer: '张三'
        }, {
          hospitalName: '北京大学第一医院',
          projectName: '协同任务管理系统',
          version: '1.0.0',
          deployDate: '2022-01-01',
          issueNum: 6,
          solvedNum: 1,
          maintainer: '张三'
        }, {
          hospitalName: '河北医科大',
          projectName: '协同任务管理系统',
          version: '1.0.0',
          deployDate: '2022-01-01',
          issueNum: 0,
          solvedNum: 0,
          maintainer: '张三'
        }],
      firstTableCol: {
        'select': false,
        'type': 'selection'
      }
    }
  },
  methods: {
    // 查
    handleSearch() {
      console.log(this.search)
    },
    getInfo(val) {
      // 触发父方法
      console.log('获取详情', val)
    },
    delInfo(val) {
      // 触发父方法
      console.log('删除信息', val)
    },
    editInfo(val) {
      // 触发父方法
      console.log('编辑信息', val)
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
      return h('span', null, '我是一个render组件')
    }
  }
}
</script>
<style>
.search-form .el-form-item{margin-bottom: 0px;}
</style>

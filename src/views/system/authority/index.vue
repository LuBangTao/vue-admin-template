<template>
  <div>
    <el-card>
      <div slot="header">
        <el-form :inline="true" :model="formInline" class="search-form">
          <el-form-item label="审批人">
            <el-input v-model="formInline.user" placeholder="审批人" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
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
      formInline: {
        user: '',
        region: ''
      },
      queryParams: {
        page: 1,
        limit: 10
      },
      type: 'success',
      total: 50,
      // element-ui中对table属性的设置
      tableTitle: {
        'border': true,
        'stripe': true,
        'highlightCurrentRow': true
      },
      // 设置table的列
      tableCol: [
        { prop: 'date', label: '日期' },
        { prop: 'name', label: '姓名' },
        { prop: 'address', label: '地址', width: 300 },
        { prop: 'src',
          label: '图片',
          getImgurl: (row, col, cellValue) => { return this.getImgurl(row) },
          previewSrcList: (row, col, cellValue) => { return this.listImgUrl(row) } },
        { prop: 'sex', label: '性别',
          formatter: (row, col, cellVaule) => { return this.sexFormatter(row) } },
        { prop: 'src', label: '图片',
          getImgurl: (row, col, cellValue) => { return this.getImgurl(row) } },
        { prop: 'text', label: '函数', render: (h, params) => { return this.render(h, params) } }
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
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          sex: 0,
          img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2F50%2Fv2-193cbb243dc14d3a016caaa54ba02837_hd.jpg&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628435704&t=deb5584cb9ff53fe6977f14a5e0755bb'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          sex: 1,
          img: 'https://pic1.zhimg.com/80/v2-894ab624807fd4cfa33dd4e42cc90ac8_720w.jpg?source=1940ef5c'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          sex: 0,
          img: 'xx.jpg'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          sex: 1,
          img: 'xx.jpg'
        }],
      firstTableCol: {
        'select': true,
        'type': 'selection'
      }
    }
  },
  methods: {
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
      console.log(val.img)
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


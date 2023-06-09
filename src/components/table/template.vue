<!-- pro-table.vue -->
<template>
  <div>
    <el-table
      empty-text="暂无数据"
      :data="tableData"
      style="width: 100%"
      row-key="id"
      lazy
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :stripe="tableTitle.stripe"
      :border="tableTitle.border"
      :fit="tableTitle.fit"
      :highlight-current-row="tableTitle.highlightCurrentRow"
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      @selection-change="handleSelectionChange"
    >
      <!--表格第一列-->
      <el-table-column
        v-if="firstTableCol.select"
        :type="firstTableCol.type"
        :width="firstTableCol.width"
      />
      <!--表格其它列-->
      <el-table-column
        v-for="(value,index) in tableCol"
        :key="index"
        :prop="value.prop"
        :label="value.label"
        :width="value.width"
      >
        <template slot-scope="scope">
          <template v-if="!value.render">
            <template v-if="value.formatter">
              {{ value.formatter(scope.row, value) }}
            </template>
            <template v-else-if="value.getImgurl">
              <el-image
                :src="value.getImgurl(scope.row, value)"
                style="width: 70px; height: 70px"
                :preview-src-list="value.previewSrcList ? value.previewSrcList(scope.row, value) : value.getImgurl(scope.row, value).split(',')"
              />
            </template>
            <template v-else>
              {{ scope.row[value.prop] }}
            </template>
          </template>
          <!--扩展dom-->
          <template v-else>
            <Table :key="`cus${index}`" :render="value.render" :param="scope.row" />
          </template>
        </template>
      </el-table-column>
      <!--基础操作-->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-for="(value,index) in operator" :key="index" type="text" @click="value.click(scope.row, value)">
            {{ value.text }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页插件-->
    <el-pagination
      v-show="total>0"
      :total="total"
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 30, 50]"
      layout="total, sizes, prev, pager, next, jumper"
      v-bind="$attrs"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
// render函数
import Table from './table'
export default {
  components: { Table },
  props: {
    tableTitle: {
      type: Object,
      default() {
        return {
          stripe: false,
          border: false,
          fit: true,
          highlightCurrentRow: false
        }
      }
    },
    firstTableCol: {
      type: Object,
      default() {
        return {
          select: false,
          width: 55,
          type: 'selection'
        }
      }
    },
    tableCol: {
      type: Array,
      default() {
        return []
      }
    },
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    operator: {
      type: Array,
      default() {
        return []
      }
    },
    total: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    autoScroll: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    // 监听table选择框
    handleSelectionChange(selection) {
      // 调用父组件对应的方法 handleSelectionChange
      this.$emit('handleSelectionChange', selection)
    },
    // 监听每页多少条数据（limit）
    handleSizeChange(limit) {
      this.$emit('pagination', { page: this.currentPage, limit: limit })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    // 监听当前是第几页（page）
    handleCurrentChange(page) {
      this.$emit('pagination', { page: page, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  }
}
</script>
<style scoped>
.el-pagination{margin-top: 10px;}
</style>

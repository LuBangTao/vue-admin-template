<template>
  <el-dialog
    :title="!form.id ? '新增':'修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="医院名称" prop="name" required>
        <el-input v-model="form.hospitalName" type="text" />
      </el-form-item>
      <el-form-item label="医院地址" prop="code" required>
        <el-input v-model="form.address" type="text" />
      </el-form-item>
      <el-form-item>
        <el-button v-if="!form.id" type="primary" @click="addSubMenu()">新增子菜单</el-button>
        <el-button v-if="!form.id" type="primary" @click="handleSave()">保存</el-button>
        <el-button v-else type="primary" @click="handleUpdate()">更新</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { mapState } from 'vuex'
// import { list } from '@/api/teacher'
export default {
  name: 'BaseForm',
  data: function() {
    return {
      visible: false,
      searchTeachers: [],
      ruleForm: {
        birthday: ''
      },
      subMenus: [],
      form: {
      }
    }
  },
  // 用于获取最新状态的值并渲染
  computed: mapState({
    searchGrades: state => state.dict.grade,
    searchClasses: state => state.dict.class
  }),
  methods: {
    init(data) {
      this.form = data
      this.visible = true
      // 获取教师信息
      // list().then(res => {
      //   this.searchTeachers = res.data
      // })
    },
    // 保存数据
    handleSave(o) {
      console.log(this.form)
      // saveInfo(this.form).then(res => {
      //   this.$message({
      //     type: 'success',
      //     message: '保存成功'
      //   })
      //   this.visible = false
      //   this.$parent.handleSearch()
      // })
    }, // 更新已有数据
    handleUpdate(o) {
      // updateInfo(this.form).then(res => {
      //   this.$message({
      //     type: 'success',
      //     message: '更新成功'
      //   })
      //   this.visible = false
      //   this.$parent.handleSearch()
      // })
    },
    // 添加子菜单
    addSubMenu(o) {
      console.log(this.form)
      if (this.form.subMenus === undefined) {
        this.form['subMenus'] = []
      }
      this.$nextTick(() => {
        this.form.subMenus.push({})
      })
    },
    //
    removeSubMenu(item) {
      var index = this.form.subMenus.indexOf(item)
      if (index !== -1) {
        this.form.subMenus.splice(index, 1)
      }
    }
  }
}
</script>

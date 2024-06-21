<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddTag">新增标签</el-button>
    <el-table :data="tagList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="标签ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="标签名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">修改</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType === 'Edit' ? '修改标签' : '新增标签'">
      <el-form :model="tag" label-width="80px" label-position="left">
        <el-form-item v-if="dialogType === 'Edit'" label="标签ID">
          <el-input v-model="tag.id" placeholder="标签ID" disabled />
        </el-form-item>
        <el-form-item label="标签名称">
          <el-input v-model="tag.name" placeholder="标签名称" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmTag">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTags, saveTag, delTag } from '@/api/tag'

export default {
  // 标签管理
  name: 'TagManage',
  components: {},
  data () {
    return {
      tagList: [],
      dialogVisible: false,
      dialogType: 'New',
      tag: {}
    }
  },
  created () {
    this.getTagList()
  },
  methods: {
    async getTagList () {
      const res = await getTags()
      this.tagList = res.data
    },
    handleDelete ({ $index, row }) {
      this.$confirm('确认删除此标签?', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await delTag(row.id)
          this.tagList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch(err => {
          console.error(err)
        })
    },
    handleEdit (scope) {
      this.tag = scope.row
      this.dialogType = 'Edit'
      this.dialogVisible = true
    },
    handleAddTag () {
      this.tag = {}
      this.dialogType = 'New'
      this.dialogVisible = true
    },
    async confirmTag () {
      await saveTag(this.tag)
      this.getTagList()
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        type: 'success'
      })
    }
  }
}
</script>

<style>
.el-input {
  width: 300px;
}
</style>

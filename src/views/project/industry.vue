<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddindustry">新增行业</el-button>
    <el-table :data="industryList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="行业ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="行业名称">
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

    <el-dialog :visible.sync="dialogVisible" :title="dialogType === 'Edit' ? '修改行业' : '新增行业'">
      <el-form :model="industry" label-width="80px" label-position="left">
        <el-form-item v-if="dialogType === 'Edit'" label="行业ID">
          <el-input v-model="industry.id" placeholder="行业ID" disabled />
        </el-form-item>
        <el-form-item label="行业名称">
          <el-input v-model="industry.name" placeholder="行业名称" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmindustry">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getIndustries, saveIndustry, delIndustry } from '@/api/industry'

export default {
  // 行业管理
  name: 'IndustryManage',
  components: {},
  data () {
    return {
      industryList: [],
      dialogVisible: false,
      dialogType: 'New',
      industry: {}
    }
  },
  created () {
    this.getIndustryList()
  },
  methods: {
    async getIndustryList () {
      const res = await getIndustries()
      this.industryList = res.data
    },
    handleDelete ({ $index, row }) {
      this.$confirm('确认删除此行业?', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await delIndustry(row.id)
          this.industryList.splice($index, 1)
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
      this.industry = scope.row
      this.dialogType = 'Edit'
      this.dialogVisible = true
    },
    handleAddindustry () {
      this.industry = {}
      this.dialogType = 'New'
      this.dialogVisible = true
    },
    async confirmindustry () {
      await saveIndustry(this.industry)
      this.getIndustryList()
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

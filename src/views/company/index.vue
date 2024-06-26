<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddCompany">新增公司</el-button>
    <el-table :data="filterList.length ? filterList : companyList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="公司ID" width="100px">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="公司名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="公司地址">
        <template slot-scope="scope">
          {{ scope.row.area + ' ' + scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations" width="300px">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">修改</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
          <el-button type="success" size="small" @click="finaningRecord(scope)">查看融资记录</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType === 'Edit' ? '修改公司' : '新增公司'">
      <el-form ref="companyForm" :model="company" :rules="rules" label-width="80px" label-position="left">
        <el-form-item v-if="dialogType === 'Edit'" label="公司ID">
          <el-input v-model="company.id" placeholder="公司ID" readonly disabled />
        </el-form-item>
        <el-form-item label="公司名称" prop="name">
          <el-input v-model="company.name" placeholder="公司名称" />
        </el-form-item>
        <el-form-item label="所在地" prop="area">
          <el-cascader
            v-model="area"
            :options="options"
            :props="{ expandTrigger: 'hover', label: 'areaName', value: 'areaId' }"
          />
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="company.address" prefix-icon="el-icon-location" placeholder="请输入详细地址" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="cancel">取消</el-button>
        <el-button type="primary" @click="submitForm">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCompanyList, saveCompany, delCompany } from '@/api/company'
import { getRegions } from '@/api/region'

export default {
  // 公司机构管理
  name: 'CompanyManage',
  components: {},
  data () {
    var validArea = (rule, value, callback) => {
      if (this.area.length !== 3) {
        return callback(new Error('请选择公司所在地'))
      }
      callback()
    }
    return {
      companyList: [],
      filterList: [],
      dialogVisible: false,
      dialogType: 'New',
      company: {},
      area: [],
      options: [],
      rules: {
        name: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在3到20个字符', trigger: 'blur' }
        ],
        area: [
          { type: 'array', validator: validArea, required: true, message: '请选择公司所在地', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入公司详细地址', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在3到20个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    compAddr () {
      return function (arr, detail) {
        return arr.join(' ') + ' ' + detail
      }
    }
  },
  created () {
    this.getCompanyList()
  },
  methods: {
    async getCompanyList () {
      const res = await getCompanyList()
      this.companyList = res.data
    },
    handleDelete ({ $index, row }) {
      this.$confirm('确认删除此公司?', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await delCompany(row.key)
          this.companyList.splice($index, 1)
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
      this.company = scope.row
      this.area = scope.row.values
      this.getAddrOptions()
      this.dialogType = 'Edit'
      this.dialogVisible = true
    },
    handleAddCompany () {
      this.company = {}
      this.area = []
      this.getAddrOptions()
      this.dialogType = 'New'
      this.dialogVisible = true
    },
    async getAddrOptions () {
      const res = await getRegions()
      this.options = res.data
    },
    finaningRecord (scope) {
      this.$router.push({
        path: '/company/financing',
        query: {
          companyId: scope.row.id
        }
      })
    },
    submitForm () {
      this.$refs.companyForm.validate((valid) => {
        if (valid) {
          this.confirmCompany()
        } else {
          return false
        }
      })
    },
    cancel () {
      this.$refs.companyForm.resetFields()
      this.dialogVisible = false
    },
    async confirmCompany () {
      if (this.area.length > 0) {
        this.company.areaId = this.area[this.area.length - 1]
      }
      await saveCompany(this.company)
      this.getCompanyList()
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

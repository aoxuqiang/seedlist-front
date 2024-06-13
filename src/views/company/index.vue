<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddCompany">新增公司</el-button>
    <el-table :data="filterList.length ? filterList : companyList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="公司ID" width="100px">
        <template slot-scope="scope">
          {{ scope.row.key }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="公司简称">
        <template slot-scope="scope">
          {{ scope.row.shortName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="公司全称" width="200px">
        <template slot-scope="scope">
          {{ scope.row.fullName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="公司地址">
        <template slot-scope="scope">
          {{ compAddr(scope.row.addressDesc, scope.row.addressDetail) }}
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
      <el-form :model="company" label-width="80px" label-position="left">
        <el-form-item v-if="dialogType === 'Edit'" label="公司ID">
          <el-input v-model="company.key" placeholder="公司ID" readonly />
        </el-form-item>
        <el-form-item label="公司全称">
          <el-input v-model="company.fullName" placeholder="公司全称" />
        </el-form-item>
        <el-form-item label="公司简称">
          <el-input v-model="company.shortName" placeholder="请输入公司简称" />
        </el-form-item>
        <el-form-item label="公司地址">
          <el-cascader v-model="value" :options="options" :props="{ expandTrigger: 'hover' }" @change="handleChange" />
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="company.addressDetail" placeholder="请输入公司详细地址" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmCompany">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCompanyList, saveCompany, delCompany } from '@/api/company'

export default {
  // 公司机构管理
  name: 'CompanyManage',
  components: {},
  data () {
    return {
      companyList: [],
      filterList: [],
      dialogVisible: false,
      dialogType: 'New',
      company: {},
      value: [],
      options: [
        {
          value: 1,
          label: '北京',
          children: [
            { value: 2, label: '东城区' },
            { value: 3, label: '西城区' }
          ]
        },
        {
          value: 2,
          label: '山西省',
          children: [
            {
              value: 4,
              label: '吕梁',
              children: [
                { value: 10, label: '兴县' },
                { value: 10, label: '易县' }
              ]
            }
          ]
        }
      ]
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
      this.dialogType = 'Edit'
      this.dialogVisible = true
    },
    handleAddCompany () {
      this.company = {}
      this.dialogType = 'New'
      this.dialogVisible = true
    },
    finaningRecord (scope) {
      this.$router.push({
        path: '/company/financing',
        query: {
          companyId: scope.row.key
        }
      })
    },
    async confirmCompany () {
      const isEdit = this.dialogType === 'Edit'
      if (isEdit) {
        await saveCompany(this.company)
        for (let index = 0; index < this.companyList.length; index++) {
          if (this.companyList[index].key === this.company.key) {
            this.companyList.splice(index, 1, Object.assign({}, this.company))
            break
          }
        }
      } else {
        await saveCompany(this.company)
        this.company.key = Math.round(Math.random() * 100)
        this.companyList.push(this.company)
      }
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

<template>
  <div class="app-container">
    融资公司
    <el-select v-model="company" placeholder="请选择" value-key="key" filterable @change="changeCompany(company)">
      <el-option v-for="item in companyList" :key="item.key" :label="item.shortName" :value="item" />
    </el-select>
    <el-button type="primary" style="margin-left: 20px;" @click="handleAddFinancing">新增融资</el-button>
    <el-table :data="companyFinancingList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="融资轮次">
        <template slot-scope="scope">
          {{ scope.row.turn }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="现估值">
        <template slot-scope="scope">
          {{ scope.row.valuation }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="融资金额">
        <template slot-scope="scope">
          {{ scope.row.amount }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="融资状态">
        <template slot-scope="scope">
          {{ scope.row.status.desc }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">修改</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType === 'Edit' ? '修改融资' : '新增融资'">
      <el-form :model="companyFinancingItem" label-width="80px" label-position="left">
        <el-form-item label="公司全称">
          {{ company.shortName }}
        </el-form-item>
        <el-form-item label="融资轮次">
          <el-input v-model="companyFinancingItem.turn" placeholder="请输入融资轮次" />
        </el-form-item>
        <el-form-item label="公司估值">
          <el-input v-model="companyFinancingItem.valuation" placeholder="请输入金额" />
        </el-form-item>
        <el-form-item label="融资金额">
          <el-input v-model="companyFinancingItem.amount" placeholder="请输入金额" />
        </el-form-item>
        <el-form-item label="融资状态">
          <el-select v-model="companyFinancingItem.status" value-key="status">
            <el-option v-for="item in rzStatus" :key="item.status" :label="item.desc" :value="item" />
          </el-select>
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
import { getCompanyList, getCompanyFinancing, saveCompanyFinancing, delCompanyFinancing, getFinancingStatusList } from '@/api/company'

export default {
  // 公司机构管理
  name: 'CompanyManage',
  components: {},
  data () {
    return {
      company: {},
      companyList: [],
      companyFinancingList: [],
      companyFinancingItem: {},
      financingStatusList: [],
      dialogVisible: false,
      dialogType: 'New',
      companyTypes: [
        { type: 1, name: '融资公司' },
        { type: 2, name: '对标公司' },
        { type: 3, name: '投资机构' }
      ],
      rzStatus: [
        { status: 0, desc: '待融资' },
        { status: 1, desc: '已融资' }
      ],
      companyType: {}
    }
  },
  created () {
    this.getCompanyList()
    if (this.$route.query.companyId) {
      this.getCompanyFinancing(this.$route.query.companyId)
    }
  },
  methods: {
    async getCompanyList () {
      const res = await getCompanyList()
      this.companyList = res.data
      if (this.$route.query.companyId) {
        this.company = this.companyList.find(item => item.key === this.$route.query.companyId)
      }
    },
    async getCompanyFinancing (companyId) {
      const res = await getCompanyFinancing(companyId)
      this.companyFinancingList = res.data
    },
    changeCompany (item) {
      this.getCompanyFinancing(item.key)
      this.company = item
    },
    handleAddFinancing () {
      if (!this.company.key) {
        this.$message({ type: 'warning', message: '请先选择融资公司' })
        return
      }
      this.dialogType = 'New'
      this.dialogVisible = true
    },
    handleDelete ({ $index, row }) {
      this.$confirm('确认删除此公司?', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await delCompanyFinancing(row.key)
          this.companyFinancingList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch(err => {
          console.error(err)
        })
    },
    async handleEdit (scope) {
      this.companyFinancingItem = scope.row
      this.dialogType = 'Edit'
      this.dialogVisible = true
      const res = await getFinancingStatusList()
      this.financingStatusList = res.data
    },
    async confirmCompanyFinancing () {
      const isEdit = this.dialogType === 'Edit'
      if (isEdit) {
        await saveCompanyFinancing(this.companyFinancingItem)
        for (let index = 0; index < this.companyFinancingList.length; index++) {
          if (this.companyFinancingList[index].key === this.companyFinancingItem.key) {
            this.companyFinancingList.splice(index, 1, Object.assign({}, this.companyFinancingItem))
            break
          }
        }
      } else {
        await saveCompanyFinancing(this.companyFinancingItem)
        this.companyFinancingItem.key = Math.round(Math.random() * 100)
        this.companyFinancingList.push(this.company)
      }
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        type: 'success'
      })
    },
    // 关键字搜索
    keywordChange (keywords) {
      this.filterList = this.seachArray(this.companyList, keywords)
      this.total = this.filterList.length
    },

    seachArray (arr, keyword) {
      const newArr = arr.filter(item => {
        // toUpperCase()将输入内容与对应的字段都转换为大写，这样可以实现不区分大小写，都能搜索到
        return item.shortName.toUpperCase().includes(keyword.toUpperCase()) || item.shortName.toUpperCase().includes(keyword.toUpperCase())
      })
      return newArr
    }
  }
}
</script>

<style>
.el-input {
  width: 300px;
}
</style>

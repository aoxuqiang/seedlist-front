<template>
  <div class="app-container">
    <el-button type="primary" style="margin-left: 20px;" @click="handleAddFinancing">新增融资</el-button>
    <el-table :data="companyFinancingList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="融资轮次">
        <template slot-scope="scope">
          {{ computeTurn(scope.row.turn) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="现估值">
        <template slot-scope="scope">
          {{ showMoney(scope.row.valuation) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="融资金额">
        <template slot-scope="scope">
          {{ showMoney(scope.row.amount) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="融资状态">
        <template slot-scope="scope">
          {{ computeState(scope.row.state) }}
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
      <el-form :model="companyFinancingItem" label-position="left">
        <el-form-item label="融资轮次">
          <el-select v-model="companyFinancingItem.turn" placeholder="请选择融资轮次">
            <el-option v-for="item in turns" :key="item.code" :label="item.desc" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item label="公司估值">
          <el-input
            v-model="companyFinancingItem.valuation"
            prefix-icon="el-icon-coin"
            placeholder="请输入金额"
            oninput="value=value.replace(/[^0-9.]/g,'')"
          />
        </el-form-item>
        <el-form-item label="融资金额">
          <el-input
            v-model="companyFinancingItem.amount"
            prefix-icon="el-icon-coin"
            placeholder="请输入金额"
            oninput="value=value.replace(/[^0-9.]/g,'')"
          />
        </el-form-item>
        <el-form-item label="融资状态">
          <el-select v-model="companyFinancingItem.state">
            <el-option v-for="item in rzStatus" :key="item.state" :label="item.desc" :value="item.state" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmCompanyFinancing">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getCompanyFinancing, saveCompanyFinancing, delCompanyFinancing, getTurnList } from '@/api/company'

export default {
  // 公司机构管理
  name: 'CompanyManage',
  components: {},
  data () {
    return {
      turns: [],
      companyId: null,
      companyFinancingList: [],
      companyFinancingItem: {},
      dialogVisible: false,
      dialogType: 'New',
      rzStatus: [
        { state: 0, desc: '待融资' },
        { state: 1, desc: '已融资' }
      ]
    }
  },
  computed: {
    computeTurn () {
      return (item) => {
        return this.turns.filter(t => t.code === item)[0].desc
      }
    },
    computeState () {
      return (item) => {
        return this.rzStatus.filter(t => t.state === item)[0].desc
      }
    },
    showMoney () {
      return (money) => {
        if (money > 100000000) {
          return money / 100000000 + '亿'
        } else if (money > 10000) {
          return money / 10000 + '万'
        } else {
          return money + '元'
        }
      }
    }
  },
  created () {
    this.getTurns()
    if (this.$route.query.companyId) {
      this.companyId = this.$route.query.companyId
      this.getCompanyFinancing(this.companyId)
    }
  },
  methods: {
    async getTurns () {
      const res = await getTurnList()
      this.turns = res.data
    },
    async getCompanyFinancing (companyId) {
      const res = await getCompanyFinancing(companyId)
      this.companyFinancingList = res.data
    },
    changeCompany (company) {
      this.getCompanyFinancing(company.id)
    },
    handleAddFinancing () {
      if (!this.companyId) {
        this.$message({ type: 'warning', message: '请先选择融资公司' })
        return
      }
      this.companyFinancingItem = {}
      this.dialogType = 'New'
      this.dialogVisible = true
    },
    handleDelete ({ $index, row }) {
      this.$confirm('确认删除此融资记录？', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await delCompanyFinancing(row.id)
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
    },
    async confirmCompanyFinancing () {
      const isEdit = this.dialogType === 'Edit'
      this.companyFinancingItem.companyId = this.companyId
      await saveCompanyFinancing(this.companyFinancingItem)
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        type: 'success'
      })
      if (!isEdit) {
        this.getCompanyFinancing(this.companyId)
      }
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

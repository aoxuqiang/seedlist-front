<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddInvestor">新增投资机构</el-button>
    <el-table :data="investorList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="机构ID" width="100px">
        <template slot-scope="scope">
          {{ scope.row.key }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="机构名称" width="200px">
        <template slot-scope="scope">
          <a :href="scope.row.homelink" target="_blank" class="homelink">{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="机构简介" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.desc }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="机构官网">
        <template slot-scope="scope">
          {{ scope.row.homelink }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations" width="300px">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">修改</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType === 'Edit' ? '修改投资机构' : '新增投资机构'">
      <el-form :model="investor" label-width="80px" label-position="left">
        <el-form-item v-if="dialogType === 'Edit'" label="机构ID">
          <el-input v-model="investor.key" placeholder="投资机构ID" readonly />
        </el-form-item>
        <el-form-item label="机构名称">
          <el-input v-model="investor.name" placeholder="公司全称" />
        </el-form-item>
        <el-form-item label="机构简介">
          <el-input v-model="investor.desc" placeholder="公司简称" type="textarea" />
        </el-form-item>
        <el-form-item label="机构官网">
          <el-input v-model="investor.homelink" placeholder="机构官网" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmInvestor">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getInvestorList, saveInvestor, delInvestor } from '@/api/investor'

export default {
  name: 'InvestorManage', // 公司机构管理
  components: {},
  data () {
    return {
      investorList: [],
      dialogVisible: false,
      dialogType: 'New',
      investor: {}
    }
  },
  created () {
    this.getInvestorList()
  },
  methods: {
    async getInvestorList () {
      const res = await getInvestorList()
      this.investorList = res.data
    },
    handleDelete ({ $index, row }) {
      this.$confirm('确认删除此机构?', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await delInvestor(row.key)
          this.investorList.splice($index, 1)
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
      this.investor = scope.row
      this.dialogType = 'Edit'
      this.dialogVisible = true
    },
    handleAddInvestor () {
      this.investor = {}
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
    async confirmInvestor () {
      const isEdit = this.dialogType === 'Edit'
      if (isEdit) {
        await saveInvestor(this.company)
        for (let index = 0; index < this.investorList.length; index++) {
          if (this.investorList[index].key === this.investor.key) {
            this.investorList.splice(index, 1, Object.assign({}, this.investor))
            break
          }
        }
      } else {
        await saveInvestor(this.investor)
        this.investor.key = Math.round(Math.random() * 100)
        this.investorList.push(this.investor)
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

a.homelink {
  text-decoration: none;
  color: #006eda;
}

a.homelink:hover {
  text-decoration: none;
  color: #006eda;
  border-bottom: 2px solid blue;
}
</style>

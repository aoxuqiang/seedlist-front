<template>
  <div class="app-container">
    <el-button type="primary" @click="createMeeting">创建会议</el-button>
    <el-table :data="investorList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="会议ID" width="100px">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="会议名称" width="200px">
        <template slot-scope="scope">
          <a :href="scope.row.name" target="_blank" class="homelink">{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="关联项目" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getInvestorList, saveInvestor, delInvestor } from '@/api/investor'

export default {
  name: 'InvestorManage', // 投资人管理
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

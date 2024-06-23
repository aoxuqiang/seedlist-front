<template>
  <div class="app-container">
    <el-button type="primary" @click="syncInvestor">同步投资人</el-button>
    <el-table :data="userList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="微信用户ID" width="100px">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="名称" width="200px">
        <template slot-scope="scope">
          <a :href="scope.row.name" target="_blank" class="homelink">{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUserList } from '@/api/user'

export default {
  name: 'UserManage', // 投资人管理
  components: {},
  data () {
    return {
      userList: [],
      dialogVisible: false,
      dialogType: 'New',
      investor: {}
    }
  },
  created () {
    this.getInvestorList()
  },
  methods: {
    async getUserList () {
      const res = await getUserList()
      this.userList = res.data
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

<template>
  <div class="app-container">
    <el-table :data="userList" style="width: 60%;margin-top:30px;" border>
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
      <el-table-column align="center" label="邮箱" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations" width="300px">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleOrg(scope)">关联机构</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="关联投资机构">
      <el-form :model="org" label-width="80px" label-position="left">
        <el-form-item label="用户名称">
          <el-input v-model="user.name" disable />
        </el-form-item>
        <el-form-item label="机构名称">
          <el-input v-model="org.name" placeholder="请输入机构名称" />
        </el-form-item>
      </el-form>
      <div style="text-align:left;">
        <el-button type="danger" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmOrg">确认</el-button>
      </div>
    </el-dialog>
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
      user: {},
      dialogVisible: false,
      dialogType: 'New',
      orgId: null
    }
  },
  created () {
    this.getUserList()
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

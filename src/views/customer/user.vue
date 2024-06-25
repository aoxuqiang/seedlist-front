<template>
  <div class="app-container">
    <el-table :data="userList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="微信用户ID" width="100px">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="名称" width="200px">
        <template slot-scope="scope">
          <a :href="scope.row.name" target="_blank">{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属机构">
        <template slot-scope="scope">
          <a :href="scope.row.name" target="_blank">{{ getOrg(scope.row.orgId) }}</a>
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
          <el-button type="primary" size="small" @click="handleOrg(scope.row)">关联机构</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" title="关联投资机构">
      <el-form :model="user" label-width="80px" label-position="left">
        <el-form-item label="用户名称">
          <el-input v-model="user.name" disable />
        </el-form-item>
        <el-form-item label="关联机构" prop="orgId">
          <el-select v-model="user.orgId" value-key="id" style="width: 500px" placeholder="请选择">
            <el-option v-for="item in orgList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
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
import { getUserList, updateOrg } from '@/api/user'
import { getOrgList } from '@/api/org'

export default {
  name: 'UserManage', // 投资人管理
  components: {},
  data () {
    return {
      userList: [],
      user: {},
      dialogVisible: false,
      dialogType: 'New',
      orgList: []
    }
  },
  computed: {
    getOrg () {
      return (item) => {
        if (item != null) {
          return this.orgList.filter(t => t.id === item)[0].name
        }
      }
    }
  },
  created () {
    this.getOrgList()
    this.getUserList()
  },
  methods: {
    async getOrgList () {
      const res = await getOrgList()
      this.orgList = res.data
    },
    async getUserList () {
      const res = await getUserList()
      this.userList = res.data
    },
    handleOrg (user) {
      this.dialogVisible = true
      this.user = user
    },
    async confirmOrg () {
      await updateOrg(this.user.id, this.user.orgId)
      this.dialogVisible = false
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

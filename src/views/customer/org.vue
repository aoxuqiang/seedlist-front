<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAdd">新增投资机构</el-button>
    <el-table :data="orgList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="机构ID" width="100px">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="机构名称" width="200px">
        <template slot-scope="scope">
          <a :href="scope.row.homeLink" target="_blank" class="homelink">{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="机构简介" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="机构官网">
        <template slot-scope="scope">
          {{ scope.row.homeLink }}
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
      <el-form ref="orgForm" :model="org" :rules="rule" label-width="80px" label-position="left">
        <el-form-item v-if="dialogType === 'Edit'" label="机构ID">
          <el-input v-model="org.id" placeholder="投资机构ID" readonly />
        </el-form-item>
        <el-form-item label="机构名称" prop="name">
          <el-input v-model="org.name" placeholder="请输入机构名称" />
        </el-form-item>
        <el-form-item label="机构简介" prop="description">
          <el-input v-model="org.description" placeholder="请输入机构简介" />
        </el-form-item>
        <el-form-item label="机构官网" prop="homeLink">
          <el-input v-model="org.homeLink" placeholder="机构官网">
            <template slot="prepend">http://</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="cancel">取消</el-button>
          <el-button type="primary" @click="submitForm">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getOrgList, saveOrg } from '@/api/org'

export default {
  name: 'OrgManage', // 公司机构管理
  components: {},
  data () {
    return {
      orgList: [],
      org: {},
      dialogVisible: false,
      dialogType: 'New',
      rule: {
        name: [
          { required: true, message: '请输入机构名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在3到20个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入机构简介', trigger: 'blur' },
          { min: 5, max: 200, message: '长度在5到200个字符', trigger: 'blur' }
        ],
        homeLink: [
          { required: true, message: '请输入机构官网', trigger: 'blur' },
          { min: 8, max: 200, message: '长度在8到200个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getOrgList()
  },
  methods: {
    async getOrgList () {
      const res = await getOrgList()
      this.orgList = res.data
    },
    handleAdd () {
      this.org = {}
      this.dialogType === 'New'
      this.dialogVisible = true
    },
    handleEdit (scope) {
      this.org = scope.row
      this.dialogType === 'Edit'
      this.dialogVisible = true
    },
    cancel () {
      this.$refs.orgForm.resetFields()
      this.dialogVisible = false
    },
    submitForm () {
      this.$refs.orgForm.validate((valid) => {
        if (valid) {
          this.confirmAdd()
        } else {
          return false
        }
      })
    },
    async confirmAdd () {
      const isEdit = this.dialogType === 'Edit'
      await saveOrg(this.org)
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        type: 'success'
      })
      if (!isEdit) {
        this.getOrgList()
      }
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

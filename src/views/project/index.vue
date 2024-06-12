<!-- eslint-disable space-before-function-paren -->
<template>
  <div class="app-container">
    <div v-show="showlist == 1" id="list-project">
      <el-button type="primary" @click="handleAddProject">新增项目</el-button>
      <el-table :data="projectList" style="width: 100%; margin-top: 30px" borderd>
        <el-table-column align="center" label="项目ID">
          <template slot-scope="scope">
            {{ scope.row.key }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="项目名称">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column align="header-center" label="一句话简介">
          <template slot-scope="scope">
            {{ scope.row.description }}
          </template>
        </el-table-column>
        <el-table-column align="header-center" label="细分赛道">
          <template slot-scope="scope">
            {{ scope.row.track }}
          </template>
        </el-table-column>
        <el-table-column align="header-center" label="标签">
          <template slot-scope="scope">
            {{ scope.row.tags.map((tag) => tag.name).join('、') }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="Operations">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope)">Edit</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope)">Delete</el-button>
            <el-button type="primary" size="small" @click="sendInfo(scope)">发送项目</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="showlist == 2" id="add-project" style="margin-top: 10px">
      <el-form>
        <el-form-item label="项目名称" label-width="100px">
          <el-input v-model.trim="addProject.name" />
        </el-form-item>
        <el-form-item label="标签" label-width="100px">
          <el-drag-select v-model="addProject.tags" style="width: 500px" multiple placeholder="请选择">
            <el-option v-for="item in tagList" :key="item.key" :label="item.name" :value="item.key" />
          </el-drag-select>
        </el-form-item>
        <el-form-item label="主打产品" label-width="100px">
          <el-input v-model.trim="addProject.product" />
        </el-form-item>
        <el-form-item label="应用领域" label-width="100px">
          <el-input v-model.trim="addProject.domain" />
        </el-form-item>
        <el-form-item label="财务信息" label-width="100px">
          <el-input v-model.trim="addProject.finance" />
        </el-form-item>
        <el-form-item label="团队背景" label-width="100px">
          <el-input v-model.trim="addProject.team" />
        </el-form-item>
        <el-form-item label="竞争对手" label-width="100px">
          <el-input v-model.trim="addProject.jzds" />
        </el-form-item>
        <el-form-item label="已投机构" label-width="100px">
          <el-input v-model.trim="addProject.ytjg" />
        </el-form-item>
        <el-form-item label="备注" label-width="100px">
          <el-input v-model.trim="addProject.remark" />
        </el-form-item>
        <el-form-item label="BP" label-width="100px">
          <el-input v-model.trim="addProject.bpUrl" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div v-show="showlist == 3" id="send-project" style="margin-top: 10px">
      <el-form>
        <el-form-item label="项目名称" label-width="100px">
          <el-input v-model.trim="sendProject.name" />
        </el-form-item>
        <el-form-item label="发送人" label-width="100px">
          <el-drag-select v-model="sendUsers" style="width: 500px" multiple placeholder="请选择">
            <el-option v-for="item in tagList" :key="item.wxUserId" :label="item.name" :value="item.wxUserId" />
          </el-drag-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendSubmit">发送</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getProjects, delProject } from '@/api/project'
import { getCompanyList } from '@/api/company'
import { getTags } from '@/api/tag'
import { getInvestorList } from '@/api/investor'
import ElDragSelect from '@/components/DragSelect'

export default {
  name: 'MyProject',
  components: { ElDragSelect },
  data() {
    return {
      projectList: [],
      showlist: 1,
      sendProject: {},
      sendUsers: [],
      addProject: {
        tags: []
      },
      companys: [],
      traceList: [
        {
          id: 1,
          name: '半导体'
        },
        {
          id: 2,
          name: '新能源'
        }
      ],
      tagList: [],
      value: []
    }
  },
  created() {
    this.getPorjectList()
  },
  methods: {
    submit() { },
    async getPorjectList() {
      const res = await getProjects()
      this.projectList = res.data
    },
    async getCompany() {
      const res = await getCompanyList()
      this.companys = res.data
    },
    async getTagList() {
      const res = await getTags()
      this.tagList = res.data
    },
    async getUserList() {
      const res = await getInvestorList()
      this.sendUsers = res.data
    },
    handleEdit(scope) {
      this.showlist = 2
      this.addProject = scope.row
      this.getTagList()
    },
    sendInfo(scope) {
      this.sendProject = scope.row
      this.getUserList()
      this.showlist = 3
    },
    sendSubmit() {
      this.$message({
        type: 'success',
        message: '发送成功'
      })
      setTimeout(() => {
        this.showlist = 1
      }, 1000)
    },
    handleDelete({ $index, row }) {
      this.$confirm('确认删除此项目?', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await delProject(row.key)
          this.projectList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch((err) => {
          console.error(err)
        })
    },
    handleAddProject() {
      this.showlist = 2
      this.getCompany()
      this.getTagList()
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      console.log(file)
    }
  }
}
</script>

<style>
.el-input {
  width: 300px;
}
</style>


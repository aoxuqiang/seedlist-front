<!-- eslint-disable space-before-function-paren -->
<template>
  <div class="app-container">
    <!-- 展示项目列表 -->
    <div v-show="showType == 1" id="list-project">
      <el-button type="primary" @click="linkAdd">新增项目</el-button>
      <!-- 项目列表 -->
      <el-table :data="projectList" border style="width: 100%; margin-top: 30px">
        <el-table-column align="center" label="项目编号" width="100" fixed>
          <template slot-scope="scope">
            {{ scope.row.no }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="项目名称" width="150">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column align="header-center" label="项目简介">
          <template slot-scope="scope">
            {{ scope.row.brief }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="Operations" fixed="right" width="600">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="linkDetail(scope.row.id)">查询详情</el-button>
            <el-button type="primary" size="small" @click="linkDetail(scope.row.id)" v-text="scope.row.status == 0 ? '上架' : '下架'" />
            <el-button type="warning" size="small" @click="linkEdit(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
            <el-button type="primary" size="small" @click="creMeeting(scope)">创建会议</el-button>
            <el-button type="primary" size="small" @click="sendInfo(scope)">发送项目/BP</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 发送项目或BP -->
    <div v-show="showType == 2" id="send-project" style="margin-top: 10px">
      <el-form>
        <el-form-item label="项目名称" label-width="100px">
          <el-input v-model.trim="sendProject.name" disabled />
        </el-form-item>
        <el-form-item label="发送人" label-width="100px">
          <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;" />
          <el-checkbox-group v-model="sendUsers" @change="handleCheckedUserChange">
            <el-checkbox v-for="u in users" :key="u.wxUserId" :label="u">{{ u.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendSubmit(1)">发送项目</el-button>
          <el-button type="primary" @click="sendSubmit(2)">发送BP</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog :visible.sync="dialogVisible" title="新增会议">
      <el-form :model="meeting" label-width="80px" label-position="left">
        <el-form-item label="会议时间">
          <div>
            <el-date-picker
              :key="project.id"
              v-model="meeting.meetingTime"
              type="datetime"
              placeholder="请选择会议时间"
            />
          </div>
        </el-form-item>
        <el-form-item label="会议名称">
          <el-input v-model="meeting.name" placeholder="请输入会议名称" />
        </el-form-item>
        <el-form-item label="会议链接">
          <el-input v-model="meeting.link" placeholder="请输入会议链接" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmAddMeeting">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getProjects, delProject } from '@/api/project'
import { getCompanyList } from '@/api/company'
import { getInvestorList } from '@/api/investor'
import { saveMeeting } from '@/api/meeting'

export default {
  name: 'MyProject',
  data () {
    return {
      dialogVisible: false,
      checkAll: false,
      isIndeterminate: true,
      projectList: [],
      showType: 1, // 1-展示项目列表  2- 发送项目或BP
      sendProject: {},
      users: [],
      sendUsers: [],
      addProject: {
        name: '',
        tags: []
      },
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在1到20个字符', trigger: 'blur' }
        ],
        product: [
          { required: true, message: '请输入产品', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在1-20个字符', trigger: 'blur' }
        ]
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
      value: [],
      project: {},
      meeting: {}
    }
  },
  created () {
    this.getPorjectList()
  },
  methods: {
    creMeeting (scope) {
      this.project = scope.row
      this.dialogVisible = true
    },
    async confirmAddMeeting () {
      this.meeting.projectId = this.project.id
      console.log('addMeetingInfo:', this.meeting)
      await saveMeeting(this.meeting)
      this.$message({
        type: 'success',
        message: '会议创建成功'
      })
      this.dialogVisible = false
      this.meeting = {}
      this.prject = {}
    },
    handleCheckAllChange (val) {
      console.log('===================', val)
      this.sendUsers = val ? this.users : []
      this.isIndeterminate = false
    },
    handleCheckedUserChange (value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.users.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.users.length
    },
    linkDetail (id) {
      this.$router.push({
        path: './detail',
        query: { id }
      })
    },
    submit () {
      this.$refs['addProject'].validate((valid) => {
        if (valid) {
          // TODO 提交请求
          console.log(this.addProject)
          this.$message({
            type: 'success',
            message: '项目添加成功'
          })
          this.showlist = 1
          console.log(this.projectList)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancel () { // 取消处理
      this.showlist = 1
    },
    async getPorjectList () {
      const res = await getProjects()
      this.projectList = res.data
    },
    async getCompany () {
      const res = await getCompanyList()
      this.companys = res.data
    },
    async getUserList () {
      const res = await getInvestorList()
      this.users = res.data
    },
    linkAdd () {
      this.$router.push({
        path: './edit'
      })
    },
    linkEdit (id) {
      this.$router.push({
        path: './edit',
        query: { id }
      })
    },
    sendInfo (scope) {
      this.sendProject = scope.row
      this.getUserList()
      this.showType = 2
    },
    sendSubmit (type) {
      // TODO 发送项目
      this.$message({
        type: 'success',
        message: '发送成功'
      })
      setTimeout(() => {
        this.showlist = 1
      }, 1000)
    },
    handleDelete ({ $index, row }) {
      this.$confirm('确认删除此项目?', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
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
    handleAvatarSuccess (res, file) {
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

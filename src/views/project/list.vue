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
            <el-button
              :type="scope.row.show == 0 ? 'primary' : 'danger'"
              size="small"
              @click="changeShow(scope.row)"
              v-text="scope.row.show == 0 ? '上架' : '下架'"
            />
            <el-button type="warning" size="small" @click="linkEdit(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
            <el-button type="primary" size="small" @click="creMeeting(scope)">创建会议</el-button>
            <el-button type="primary" size="small" @click="sendInfo(scope)">发送BP</el-button>
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
          <el-checkbox-group v-model="sendUsers" value-key="id" @change="handleCheckedUserChange">
            <el-checkbox v-for="u in users" :key="u.id" :label="u">{{ u.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendSubmit()">发送BP</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog :visible.sync="dialogVisible" title="新增会议">
      <el-form :model="meeting" label-width="80px" label-position="left">
        <el-form-item label="会议时间">
          <div>
            <el-date-picker :key="project.id" v-model="meeting.startTime" type="datetime" placeholder="请选择会议时间" />
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
import { getProjects, delProject, changeShow, sendBP2Users } from '@/api/project'
import { getCompanyList } from '@/api/company'
import { getUserList } from '@/api/user'
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
    async changeShow (item) {
      const msg = item.show === 0 ? '确认上架此项目' : '确认下架此项目'
      const num = 1 - item.show
      const id = item.id
      this.$confirm(msg, '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async (item) => {
          await changeShow(id, num)
          item.show = num
        })
        .catch((err) => {
          console.error(err)
        })
    },
    dateFormate (date) {
      // 格式化日期
      var formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2)
      return formattedDate
    },
    async confirmAddMeeting () {
      this.meeting.projectId = this.project.id
      this.meeting.startTime = this.dateFormate(this.meeting.startTime)
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
      console.log('开始http请求')
      const res = await getProjects()
      console.log('请求响应数据', res.data)
      this.projectList = res.data
    },
    async getCompany () {
      const res = await getCompanyList()
      this.companys = res.data
    },
    async getUserList () {
      const res = await getUserList()
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
    async sendSubmit () {
      const projectId = this.sendProject.id
      console.log('sendUsers', this.sendUsers)
      const sendUsers = this.sendUsers.map(item => item.id).join(',')
      await sendBP2Users(projectId, sendUsers)
      this.$message({
        type: 'success',
        message: '发送成功'
      })
      setTimeout(() => {
        this.showType = 1
      }, 1000)
    },
    handleDelete ({ $index, row }) {
      this.$confirm('确认删除此项目?', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await delProject(row.id)
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

<template>
  <div class="app-container">
    <el-table v-show="!showSend" :data="meetingList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="会议名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="关联项目">
        <template slot-scope="scope">
          <router-link :to="{ path: '../project/detail', query: { id: scope.row.projectId } }">
            <el-link type="success">{{ scope.row.projectName }}</el-link>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" label="会议时间">
        <template slot-scope="scope">
          {{ scope.row.startTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="会议链接">
        <template slot-scope="scope">
          {{ scope.row.link }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations" fixed="right" width="400">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="linkDetail(scope)">会议详情</el-button>
          <el-button type="primary" size="small" @click="handleSend(scope.row)">发送邀请</el-button>
          <el-button type="warning" size="small" @click="handleEdit(scope)">修改</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="showSend" id="send-project" style="margin-top: 10px">
      <el-form :model="meeting">
        <el-form-item label="会议名称" label-width="100px">
          <el-input v-model.trim="meeting.name" disabled />
        </el-form-item>
        <el-form-item label="发送人" label-width="100px">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;" />
          <el-checkbox-group v-model="sendUsers" value-key="id" @change="handleCheckedUserChange">
            <el-checkbox v-for="u in userList" :key="u.id" :label="u">{{ u.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="showSend = !showSend">取消</el-button>
          <el-button type="primary" @click="confirmSend()">发送会议邀请</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog :visible.sync="dialogVisible" title="修改会议">
      <el-form :model="meeting" label-width="80px" label-position="left">
        <el-form-item label="会议时间">
          <div>
            <el-date-picker :key="meeting.id" v-model="meeting.startTime" type="datetime" placeholder="请选择会议时间" />
          </div>
        </el-form-item>
        <el-form-item label="会议名称">
          <el-input v-model="meeting.name" placeholder="请输入会议名称" disabled />
        </el-form-item>
        <el-form-item label="会议链接">
          <el-input v-model="meeting.link" placeholder="请输入会议链接" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateMeeting">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMeetingList, delMeeting, saveMeetingInvite, saveMeeting } from '@/api/meeting'
import { getProjects } from '@/api/project'
import { getUserList } from '@/api/user'

export default {
  // 标签管理
  name: 'MeetingManage',
  components: {},
  data () {
    return {
      meetingList: [],
      showSend: false,
      meeting: {},
      userList: [],
      sendUsers: [],
      checkAll: false,
      isIndeterminate: true,
      dialogVisible: false
    }
  },
  created () {
    this.getMeetingList()
  },
  methods: {
    async getMeetingList () {
      const res = await getMeetingList()
      this.meetingList = res.data
    },
    async getProjectList () {
      const res = await getProjects()
      this.projects = res.data
    },
    async handleSend (meeting) {
      this.meeting = meeting
      const res = await getUserList()
      this.userList = res.data
      this.showSend = true
    },
    handleDelete ({ $index, row }) {
      this.$confirm('确认删除此会议?', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await delMeeting(row.key)
          this.tagList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch(err => {
          console.error(err)
        })
    },
    linkDetail (scope) {
      this.$router.push({
        path: 'detail',
        query: { id: scope.row.id }
      })
    },
    handleEdit (scope) {
      this.meeting = scope.row
      this.dialogVisible = true
    },
    async updateMeeting () {
      this.meeting.startTime = this.dateFormate(this.meeting.startTime)
      await saveMeeting(this.meeting)
      this.$message({
        type: 'success',
        message: '会议更新成功'
      })
      this.dialogVisible = false
      this.meeting = {}
    },
    dateFormate (date) {
      // 格式化日期
      var formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2)
      return formattedDate
    },
    handleCheckAllChange (val) {
      console.log('===================', val)
      this.sendUsers = val ? this.userList : []
      this.isIndeterminate = false
    },
    handleCheckedUserChange (value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.userList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.userList.length
    },
    async confirmSend () {
      await saveMeetingInvite(this.meeting.id, this.sendUsers.map(item => item.id).join(','))
      this.$message({
        type: 'success',
        message: '发送成功'
      })
      this.showSend = false
    }
  }
}
</script>

<style>
.el-input {
  width: 300px;
}
</style>

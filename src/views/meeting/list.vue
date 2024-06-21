<template>
  <div class="app-container">
    <el-button type="primary" @click="addMeeting">新增会议</el-button>
    <el-table :data="meetingList" style="width: 100%;margin-top:30px;" border>
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
          <router-link :to=" {path: '../project/detail',query:{id: scope.row.project.id}} ">
            <el-link type="success">{{ scope.row.project.name }}</el-link>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" label="会议时间">
        <template slot-scope="scope">
          {{ scope.row.meetingTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="会议链接">
        <template slot-scope="scope">
          {{ scope.row.link }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations" fixed="right" width="400">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="linkDetail(scope)">会议详情</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">发送邀请</el-button>
          <el-button type="primary" size="small" @click="handleEdit(scope)">修改</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMeetingList, delMeeting, saveMeeting } from '@/api/meeting'
import { getProjects } from '@/api/project'

export default {
  // 标签管理
  name: 'MeetingManage',
  components: {},
  data () {
    return {
      meetingList: [],
      dialogVisible: false,
      dialogType: 'New',
      meeting: {}
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
    addMeeting () {
      this.meeting = {}
      this.dialogType = 'New'
      this.dialogVisible = true
    },
    handleEdit (scope) {
      this.tag = scope.row
      this.dialogType = 'Edit'
      this.dialogVisible = true
    },
    async confirm () {
      const isEdit = this.dialogType === 'Edit'
      if (isEdit) {
        await saveMeeting(this.tag)
        for (let index = 0; index < this.tagList.length; index++) {
          if (this.tagList[index].key === this.tag.key) {
            this.tagList.splice(index, 1, Object.assign({}, this.tag))
            break
          }
        }
      } else {
        await saveMeeting(this.tag)
        this.tag.key = Math.round(Math.random() * 100)
        this.tagList.push(this.tag)
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
</style>

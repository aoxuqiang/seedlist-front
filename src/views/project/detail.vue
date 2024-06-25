<!-- eslint-disable space-before-function-paren -->
<template>
  <div id="detail-project">
    <el-container>
      <el-main>
        <el-divider content-position="left">详细信息</el-divider>
        <el-row>
          <el-col :span="16">
            项目编号: {{ project.no }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            项目简称：{{ project.name }}
          </el-col>
          <el-col :span="8">
            关联公司：<el-link type="primary" class="link">{{ project.company.name }}</el-link>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            项目简介：{{ project.brief }}
          </el-col>
          <el-col :span="8">
            核心产品： {{ project.product }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            核心客户：{{ project.custom }}
          </el-col>
          <el-col :span="8">
            团队背景： {{ project.team }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            应用领域：{{ project.domain }}
          </el-col>
          <el-col :span="8">
            标签： {{ project.tagList.map((tag) => tag.name).join('、') }}
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">浏览记录({{ scanList.length }})</el-menu-item>
          <el-menu-item index="2">BP申请记录({{ applyList.length }})</el-menu-item>
          <el-menu-item index="3">BP发送记录({{ sendList.length }})</el-menu-item>
          <el-menu-item index="4">会议记录({{ meetingList.length }})</el-menu-item>
        </el-menu>
      </el-header>
      <el-main v-if="activeIndex == 1">
        <el-table :data="scanList" border style="width: 100%; margin-top: 30px">
          <el-table-column align="center" label="用户id" width="100" fixed>
            <template slot-scope="scope">
              {{ scope.row.uid }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="用户名称" width="150">
            <template slot-scope="scope">
              {{ scope.row.uname }}
            </template>
          </el-table-column>
          <el-table-column align="header-center" label="浏览时间">
            <template slot-scope="scope">
              {{ scope.row.createdTime }}
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-main v-if="activeIndex == 2">
        <el-table :data="applyList" border style="width: 100%; margin-top: 30px">
          <el-table-column align="center" label="用户id" width="150">
            <template slot-scope="scope">
              {{ scope.row.uid }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="用户名称" width="150">
            <template slot-scope="scope">
              {{ scope.row.uname }}
            </template>
          </el-table-column>
          <el-table-column align="header-center" label="发送时间">
            <template slot-scope="scope">
              {{ scope.row.createdTime }}
            </template>
          </el-table-column>
          <el-table-column align="header-center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="sendBP(scope.row)">发送BP</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-main v-if="activeIndex == 3">
        <el-table :data="sendList" border style="width: 100%; margin-top: 30px">
          <el-table-column align="center" label="用户id" width="150">
            <template slot-scope="scope">
              {{ scope.row.uid }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="用户名称" width="150">
            <template slot-scope="scope">
              {{ scope.row.uname }}
            </template>
          </el-table-column>
          <el-table-column align="header-center" label="发送时间">
            <template slot-scope="scope">
              {{ scope.row.createdTime }}
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-main v-if="activeIndex == 4">
        <el-table :data="meetingList" border style="width: 100%; margin-top: 30px">
          <el-table-column align="center" label="会议ID" width="100">
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="会议名称" width="150">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column align="header-center" label="会议时间" width="200">
            <template slot-scope="scope">
              {{ scope.row.startTime }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="linkMeeting(scope.row.id)">查询详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getProject, getScanList, getBpApplyList, getBpSendList, sendBP2Users } from '@/api/project'
import { getProjectMeetings } from '@/api/meeting'

export default {
  name: 'MyProject',
  data () {
    return {
      project: {
        tagList: [],
        company: {}
      },
      scanList: [],
      applyList: [],
      sendList: [],
      meetingList: [],
      activeIndex: 1
    }
  },
  created () {
    if (this.$route.query.id) {
      console.log('===============', this.$route.query.id)
      this.getPorject(this.$route.query.id)
      this.getScanList(this.$route.query.id)
      this.getBpApplyList(this.$route.query.id)
      this.getBpSendList(this.$route.query.id)
      this.getMeetingList(this.$route.query.id)
    }
  },
  methods: {
    linkMeeting (id) {
      this.$router.push({
        path: '../meeting/detail',
        query: { id }
      })
    },
    // 查询项目详情
    async getPorject (id) {
      const res = await getProject(id)
      this.project = res.data
    },
    // 查询项目浏览记录
    async getScanList (id) {
      const res = await getScanList(id)
      this.scanList = res.data
    },
    // 查询BP申请记录
    async getBpApplyList (id) {
      const res = await getBpApplyList(id)
      this.applyList = res.data
    },

    // 查询BP发送记录
    async getBpSendList (id) {
      const res = await getBpSendList(id)
      this.sendList = res.data
    },

    async getMeetingList (id) {
      const res = await getProjectMeetings(id)
      this.meetingList = res.data
    },

    // 操作发送BP
    async sendBP (row) {
      await sendBP2Users(row.projectId, row.uid)
      this.$message({
        type: 'success',
        message: '发送成功'
      })
    },
    handleAvatarSuccess (res, file) {
      console.log(res)
      console.log(file)
    },
    handleSelect (key, keyPath) {
      this.activeIndex = key
    }
  }
}
</script>

<style>
.el-row {
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-input {
  width: 300px;
}

.link {
  font-size: 17px;
}
</style>

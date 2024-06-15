<!-- eslint-disable space-before-function-paren -->
<template>
  <div id="meeting-detail">
    <el-container>
      <el-main>
        <el-divider content-position="left">详细信息</el-divider>
        <el-row>
          会议名称: {{ meeting.name }}
        </el-row>
        <el-row>
          关联项目：
          <router-link :to=" {path: '../project/detail',query:{id: meeting.project.id}} ">
            <el-link type="success">{{ meeting.project.name }}</el-link>
          </router-link>
        </el-row>
        <el-row>
          会议时间：{{ meeting.meetingTime }}
        </el-row>
        <el-row>
          会议链接: {{ meeting.link }}
        </el-row>
      </el-main>
    </el-container>
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">邀请记录({{ visitList.length }})</el-menu-item>
          <el-menu-item index="2">报名记录({{ signList.length }})</el-menu-item>
        </el-menu>
      </el-header>
      <el-main v-if="activeIndex == 1">
        <el-table :data="visitList" border style="width: 100%; margin-top: 30px">
          <el-table-column align="center" label="用户id" width="100" fixed>
            <template slot-scope="scope">
              {{ scope.row.wxUserId }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="用户名称" width="150">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column align="header-center" label="邀请时间">
            <template slot-scope="scope">
              {{ scope.row.scanTime }}
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-main v-if="activeIndex == 2">
        <el-table :data="signList" border style="width: 100%; margin-top: 30px">
          <el-table-column align="center" label="用户id" width="150">
            <template slot-scope="scope">
              {{ scope.row.wxUserId }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="用户姓名" width="150">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column align="header-center" label="报名时间">
            <template slot-scope="scope">
              {{ scope.row.sendTime }}
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getMeeting, getMeetingSignList, getMeetingInviteList } from '@/api/meeting'

export default {
  name: 'MeetingDetail',
  data () {
    return {
      meeting: {},
      visitList: [],
      signList: [],
      activeIndex: 0
    }
  },
  created () {
    if (this.$route.query.id) {
      console.log('===============', this.$route.query.id)
      var mid = this.$route.query.id
      this.getMeeting(mid)
      this.getInviteList(mid)
      this.getSignList(mid)
    }
  },
  methods: {
    async getMeeting (id) {
      const res = await getMeeting(id)
      this.meeting = res.data
    },
    async getInviteList (id) {
      const res = await getMeetingInviteList(id)
      this.visitList = res.data
    },
    async getSignList (id) {
      const res = await getMeetingSignList(id)
      this.signList = res.data
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
  font-size:17px;
}
</style>

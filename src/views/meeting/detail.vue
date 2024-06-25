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
          <router-link :to="{ path: '../project/detail', query: { id: meeting.projectId } }">
            <el-link type="success">{{ meeting.projectName }}</el-link>
          </router-link>
        </el-row>
        <el-row>
          会议时间：{{ meeting.startTime }}
        </el-row>
        <el-row>
          会议链接: {{ meeting.link }}
        </el-row>
      </el-main>
    </el-container>
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">邀请记录({{ inviteList.length }})</el-menu-item>
          <el-menu-item index="2">报名记录({{ applyList.length }})</el-menu-item>
        </el-menu>
      </el-header>
      <el-main v-if="activeIndex == 1">
        <el-table :data="inviteList" border style="width: 100%; margin-top: 30px">
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
          <el-table-column align="header-center" label="邀请时间">
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
          <el-table-column align="center" label="用户姓名" width="150">
            <template slot-scope="scope">
              {{ scope.row.uname }}
            </template>
          </el-table-column>
          <el-table-column align="header-center" label="申请时间">
            <template slot-scope="scope">
              {{ scope.row.createdTime }}
            </template>
          </el-table-column>
          <el-table-column align="header-center" label="审核状态">
            <template slot-scope="scope">
              {{ auditDesc(scope.row.auditStatus) }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="Operations" fixed="right" width="600">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                :disabled="scope.row.auditStatus != 0"
                @click="auditPass(scope.row.id)"
              >审核通过</el-button>
              <el-button
                type="danger"
                size="small"
                :disabled="scope.row.auditStatus != 0"
                @click="auditRefuse(scope.row.id)"
              >审核拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getMeeting, getMeetingApplyList, getMeetingInviteList, passApply, refuseApply } from '@/api/meeting'

export default {
  name: 'MeetingDetail',
  data () {
    return {
      meeting: {},
      inviteList: [],
      applyList: [],
      activeIndex: 0
    }
  },
  computed: {
    auditDesc () {
      return state => {
        if (state === 0) {
          return '待审核'
        } else if (state < 0) {
          return '审核拒绝'
        }
        return '审核通过'
      }
    }
  },
  created () {
    if (this.$route.query.id) {
      console.log('===============', this.$route.query.id)
      const id = this.$route.query.id
      this.getMeeting(id)
      this.getInviteList(id)
      this.getApplyList(id)
    }
  },
  methods: {
    async getMeeting (id) {
      const res = await getMeeting(id)
      this.meeting = res.data
    },
    async getInviteList (id) {
      const res = await getMeetingInviteList(id)
      this.inviteList = res.data
    },
    async getApplyList (id) {
      const res = await getMeetingApplyList(id)
      this.applyList = res.data
    },
    handleAvatarSuccess (res, file) {
      console.log(res)
      console.log(file)
    },
    handleSelect (key, keyPath) {
      this.activeIndex = key
    },
    async auditPass (id) {
      await passApply(id)
      this.applyList.filter(item => item.id === id)[0].state = 1
    },
    async auditRefuse (id) {
      await refuseApply(id)
      this.applyList.filter(item => item.id === id)[0].state = -1
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

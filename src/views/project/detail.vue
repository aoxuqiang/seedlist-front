<!-- eslint-disable space-before-function-paren -->
<template>
  <div id="detail-project">
    <el-container>
      <el-main>
        <el-divider content-position="left">详细信息</el-divider>
        <el-row>
          <el-col :span="16">
            项目编号: {{ project.pno }}
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
            项目简介：{{ project.desc }}
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
            标签： {{ project.tags.map((tag) => tag.name).join('、') }}
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">浏览记录</el-menu-item>
          <el-menu-item index="2">发送记录</el-menu-item>
          <el-menu-item index="3">会议记录</el-menu-item>
        </el-menu>
      </el-header>
      <el-main v-if="activeIndex == 1">
        <el-table :data="scanList" border style="width: 100%; margin-top: 30px">
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
          <el-table-column align="header-center" label="浏览时间">
            <template slot-scope="scope">
              {{ scope.row.scanTime }}
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-main v-if="activeIndex == 2">
        <el-table :data="sendList" border style="width: 100%; margin-top: 30px">
          <el-table-column align="center" label="类型" width="150">
            <template slot-scope="scope">
              {{ scope.row.type == 1? '发送项目' : '发送BP' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="用户id" width="150">
            <template slot-scope="scope">
              {{ scope.row.wxUserId }}
            </template>
          </el-table-column>
          <el-table-column align="header-center" label="发送时间">
            <template slot-scope="scope">
              {{ scope.row.sendTime }}
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-main v-if="activeIndex == 3">
        <el-table :data="meetingList" border style="width: 100%; margin-top: 30px">
          <el-table-column align="center" label="会议名称" width="150">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column align="header-center" label="会议时间" width="150">
            <template slot-scope="scope">
              {{ scope.row.meetingTime }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="linkDetail(scope.row.id)">查询详情</el-button>
              <el-button type="warning" size="small" @click="linkEdit(scope.row.id)">编辑</el-button>
              <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getProject } from '@/api/project'

export default {
  name: 'MyProject',
  data () {
    return {
      project: {
        tags: [],
        company: {}
      },
      scanList: [
        {
          'wxUserId': '123',
          'name': '张三',
          'scanTime': '2024-4-16 12:29:00'
        },
        {
          'wxUserId': '456',
          'name': '李四',
          'scanTime': '2024-4-16 12:29:00'
        }
      ],
      sendList: [
        {
          'wxUserId': '12321',
          'sendTime': '2024-4-16 12:29:00'
        }
      ],
      meetingList: [
        {
          'id': 1,
          'name': '会议1',
          'meetingTime': '2024-4-16 12:29:00'
        }
      ],
      activeIndex: 0
    }
  },
  created () {
    if (this.$route.query.id) {
      console.log('===============', this.$route.query.id)
      this.getPorject(this.$route.query['id'])
    }
  },
  methods: {
    async getPorject (id) {
      const res = await getProject(id)
      this.project = res.data
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

<!-- eslint-disable space-before-function-paren -->
<template>
  <!-- 新增、编辑项目 -->
  <div id="edit-project" style="margin-top: 10px">
    <el-form ref="project" :model="project" :rules="rules">
      <el-form-item label="项目编号" prop="no" label-width="100px">
        <el-input v-model.trim="project.no" :disabled="optType == 2" />
      </el-form-item>
      <el-form-item label="项目名称" prop="name" label-width="100px">
        <el-input v-model.trim="project.name" />
      </el-form-item>
      <el-form-item label="关联公司" label-width="100px" prop="companyId">
        <el-select v-model="project.companyId" style="width: 500px" placeholder="请选择">
          <el-option v-for="item in companys" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="项目简介" prop="brief" label-width="100px">
        <el-input v-model.trim="project.brief" />
      </el-form-item>
      <el-form-item label="项目标签" label-width="100px">
        <el-select v-model="project.tagList" value-key="id" style="width: 500px" multiple placeholder="请选择">
          <el-option v-for="item in tagList" :key="item.id" :label="item.name" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="所属行业" label-width="100px" prop="industryId">
        <el-select v-model="project.industryId" style="width: 500px" placeholder="请选择">
          <el-option v-for="item in industryList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="主打产品" label-width="100px" prop="product">
        <el-input v-model.trim="project.product" />
      </el-form-item>
      <el-form-item label="核心客户" label-width="100px">
        <el-input v-model.trim="project.custom" />
      </el-form-item>
      <el-form-item label="应用领域" label-width="100px">
        <el-input v-model.trim="project.domain" />
      </el-form-item>
      <el-form-item label="团队背景" label-width="100px">
        <el-input v-model.trim="project.team" />
      </el-form-item>
      <el-form-item label="竞争对手" label-width="100px">
        <el-input v-model.trim="project.competitor" />
      </el-form-item>
      <el-form-item label="项目备注" label-width="100px">
        <el-input v-model.trim="project.remark" />
      </el-form-item>
      <el-form-item label="项目BP" label-width="100px">
        <el-input v-model.trim="project.bp" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="margin-left:100px" @click="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getProject, saveProject } from '@/api/project'
import { getCompanyList } from '@/api/company'
import { getTags } from '@/api/tag'
import { getIndustries } from '@/api/industry'

export default {
  name: 'EditProject',
  data () {
    return {
      optType: 1, // 1- 新增 2-修改
      project: {
        name: '',
        tags: []
      },
      rules: {
        no: [
          { required: true, message: '请输入项目编号', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在1到20个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在1到20个字符', trigger: 'blur' }
        ],
        brief: [
          { required: true, message: '请输入项目简介', trigger: 'blur' },
          { min: 5, max: 200, message: '长度在5到200个字符', trigger: 'blur' }
        ],
        product: [
          { required: true, message: '请输入产品', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在1-20个字符', trigger: 'blur' }
        ],
        companyId: [
          { required: true, message: '请选择关联公司', trigger: 'blur' }
        ],
        industryId: [
          { required: true, message: '请选择行业', trigger: 'blur' }
        ]
      },
      company: {},
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
  created () {
    this.getTagList()
    this.getIndustryList()
    this.getCompanys()
  },
  methods: {
    async getCompanys () {
      const res = await getCompanyList()
      this.companys = res.data
      if (this.$route.query.id) {
        this.optType = 2
        this.getProject(this.$route.query.id)
      }
    },
    async getIndustryList () {
      const res = await getIndustries()
      this.industryList = res.data
    },
    async getTagList () {
      const res = await getTags()
      this.tagList = res.data
    },
    async getProject (id) {
      const res = await getProject(id)
      this.project = res.data
    },
    async saveProject (project) {
      await saveProject(project)
    },
    submit () {
      this.$refs['project'].validate((valid) => {
        if (valid) {
          this.saveProject(this.project)
          this.$message({
            type: 'success',
            message: '项目更新成功'
          })
          this.$router.push('list')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancel () {
      // TODO 处理取消
    }
  }
}
</script>

<style>
.el-input {
  width: 300px;
}
</style>

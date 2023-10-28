<template>
    <div class="app-container">
        <div v-show="showlist" id="list-project">
            <el-button type="primary" @click="handleAddProject">新增项目</el-button>
            <el-table :data="projectList" style="width: 100%;margin-top:30px;" border>
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
                        {{ scope.row.tags.map(tag => tag.name).join("、") }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="Operations">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="handleEdit(scope)">Edit</el-button>
                        <el-button type="danger" size="small" @click="handleDelete(scope)">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-show="!showlist" id="add-project" style="margin-top: 10px;">
            <el-form>
                <el-form-item label="项目名称" label-width="100px">
                    <el-input v-model.trim="addProject.name" />
                </el-form-item>
                <el-form-item label="公司全称" label-width="100px">
                    <el-select v-model="addProject.company" placeholder="请选择">
                        <el-option v-for="item in companys" :key="item.key" :label="item.shortName"
                            :value="item.shortName" />
                    </el-select>
                </el-form-item>
                <el-form-item label="简述" label-width="100px">
                    <el-input v-model.trim="addProject.description" />
                </el-form-item>
                <el-form-item label="细分赛道" label-width="100px">
                    <el-select v-model="addProject.trace" placeholder="请选择">
                        <el-option v-for="item in traceList" :key="item.id" :label="item.name" :value="item.name" />
                    </el-select>
                </el-form-item>
                <el-form-item label="标签" label-width="100px">
                    <el-drag-select v-model="addProject.tags" style="width:500px;" multiple placeholder="请选择">
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
                <el-form-item>
                    <el-button type="primary" @click="submit">保存</el-button>
                </el-form-item>
            </el-form>
            <p>上传BP</p>
            <el-upload ref="upload" :http-request="upload" :show-file-list="true" action="http"
                :before-upload="beforeAvatarUpload" :auto-upload="true" :on-success="handleAvatarSuccess"
                class="upload-demo" drag name="file" multiple>
                <i class="el-icon-upload" />
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
            <p>上传路演视频</p>
            <el-upload ref="upload" :http-request="upload" :show-file-list="true" action="http"
                :before-upload="beforeAvatarUpload" :auto-upload="true" :on-success="handleAvatarSuccess"
                class="upload-demo" drag name="file" multiple>
                <i class="el-icon-upload" />
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
        </div>
    </div>
</template>

<script>
import { getProjects, delProject } from '@/api/project'
import { getCompanyList } from '@/api/company'
import { getTags } from '@/api/tag'
import ElDragSelect from '@/components/DragSelect'

export default {
    name: 'MyProject',
    components: { ElDragSelect },
    data () {
        return {
            projectList: [],
            showlist: true,
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
    created () {
        this.getPorjectList()
    },
    methods: {
        submit () {

        },
        async getPorjectList () {
            const res = await getProjects()
            this.projectList = res.data
        },
        async getCompany () {
            const res = await getCompanyList()
            this.companys = res.data
        },
        async getTagList () {
            const res = await getTags()
            this.tagList = res.data
        },
        handleEdit (scope) {
            this.showlist = false
            this.addProject = scope.row
            this.getTagList()
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
                .catch(err => {
                    console.error(err)
                })
        },
        handleAddProject () {
            this.showlist = false
            this.getCompany()
            this.getTagList()
        },
        upload (file) {
            const formData = new FormData()
            formData.append('files[]', file.file)
            // 多文件上传带其他参数，传递formdata和data不能一起传递，要传递formdata   就不能有data
            formData.append('id', 1)
            formData.append('Content-Type', 'multipart/form-data')
        },
        // 上传前的大小验证及格式验证
        beforeAvatarUpload (file) {
            return true
            // const isJPG = file.name.slice(-4) === '.jar'
            // const isLt2M = file.size / 1024 / 1024 < 2
            // if (!isJPG) {
            //   this.$message({
            //     message: '上传文件只能是 JAR 格式',
            //     type: 'error'
            //   })
            // }
            // if (!isLt2M) {
            //   this.$message({
            //     message: '上传图片大小不能超过 2MB',
            //     type: 'error'
            //   })
            // }
            // return isJPG && isLt2M
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

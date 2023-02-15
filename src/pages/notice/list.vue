<template>
  <el-card class="border-0" shadow="never">
    <!-- 新增|刷新 -->
    <ListHeader @create="handleCreate" @refresh="getData"></ListHeader>
    <!-- 表格 -->
    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column prop="title" label="公告标题" />
      <el-table-column prop="content" label="内容" width="400" />
      <el-table-column prop="create_time" label="创建时间" width="300" />
      <el-table-column prop="update_time" label="更新时间" width="300" />
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            text
            @click="handleEdit(scope.row)"
            >修改</el-button
          >
          <el-popconfirm
            title="是否删除该公告?"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button type="primary" size="small" text>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div class="flex items-center justify-center mt-5">
      <el-pagination
        background
        layout="prev, pager ,next"
        :total="total"
        :current-page="currentPage"
        :page-size="limit"
        @current-change="getData"
      />
    </div>

    <form-drawer
      ref="formDrawerRef"
      :title="drawerTitle"
      @submit="handleSubmit"
    >
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="80px"
        :inline="false"
      >
        <el-form-item label="公告标题" placeholder="公告标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="公告内容" placeholder="公告内容" prop="content">
          <el-input v-model="form.content" type="textarea" :rows="5"></el-input>
        </el-form-item>
      </el-form>
    </form-drawer>
  </el-card>
</template>

<script setup>
import FormDrawer from '~/components/FormDrawer.vue';
import { getNoticeList, createNotice, updateNotice, deleteNotice } from '~/api/notice.js'
import { useInitTable, useInitForm } from '../../composables/useCommon';
import ListHeader from "~/components/ListHeader.vue"

const {
  tableData,
  loading,
  currentPage,
  total,
  limit,
  getData,
  handleDelete
} = useInitTable({
  getList: getNoticeList,
  delete: deleteNotice
})

const { formDrawerRef,
  formRef,
  form,
  rules,
  drawerTitle,
  handleCreate,
  handleSubmit,
  handleEdit } = useInitForm({
    getData,
    create: createNotice,
    update: updateNotice,
    form: {
      title: "",
      content: ""
    },
    rules: {
      title: [{
        required: true,
        message: "公告标题不能为空",
        trigger: blur

      }],
      content: [{
        required: true,
        message: "公告内容不能为空",
        trigger: blur

      }]
    }
  })

</script>

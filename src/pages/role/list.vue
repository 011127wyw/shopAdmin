<!-- 角色管理 -->
<template>
  <el-card shadow="never" class="border-0">
    <!-- 新增|刷新 -->
    <ListHeader @create="handleCreate" @refresh="getData" />

    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column prop="name" label="角色名称" />
      <el-table-column prop="desc" label="角色描述" width="380" />
      <el-table-column label="状态" width="120">
        <template #default="{ row }">
          <el-switch
            :modelValue="row.status"
            :active-value="1"
            :inactive-value="0"
            :loading="row.statusLoading"
            :disabled="row.super == 1"
            @change="handleStatusChange($event, row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250" align="center">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            text
            @click="openSetRule(scope.row)"
            >权限配置</el-button
          >

          <el-button
            type="primary"
            size="small"
            text
            @click="handleEdit(scope.row)"
            >修改</el-button
          >

          <el-popconfirm
            title="是否要删除该公告？"
            confirmButtonText="确认"
            cancelButtonText="取消"
            @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button text type="primary" size="small">删除</el-button>
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

    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="80px"
        :inline="false"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="desc">
          <el-input
            v-model="form.desc"
            placeholder="角色描述"
            type="textarea"
            :rows="5"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
    </FormDrawer>

    <!-- 权限配置-表单树形控件 -->
    <FormDrawer
      ref="setRuleFormDrawerRef"
      title="权限配置"
      @submit="handleSetRuleSubmit"
    >
      <el-tree-v2
        ref="elTreeRef"
        node-key="id"
        :default-expanded-keys="defaultExpandedKeys"
        :check-strictly="checkStrictly"
        show-checkbox
        :data="treeData"
        :props="{ label: 'name', children: 'child' }"
        :height="treeHeight"
        @check="handleTreeCheck"
      >
        <template #default="{ data }">
          <div>
            <el-tag size="small" :type="data.menu ? '' : 'info'">{{
              data.menu ? "菜单" : "权限"
            }}</el-tag>
            <span class="ml-2 text-sm">{{ data.name }}</span>
          </div>
        </template>
      </el-tree-v2>
    </FormDrawer>
  </el-card>
</template>
<script setup>
import { ref } from "vue"
import ListHeader from "~/components/ListHeader.vue";
import FormDrawer from "~/components/FormDrawer.vue";
import {
  getRoleList,
  createRole,
  updateRole,
  deleteRole,
  updateRoleStatus,
  setRoleRules
} from "~/api/role"
import { useInitTable, useInitForm } from '~/composables/useCommon.js'
import { getRuleList } from "~/api/rule.js"
import { toast } from "../../composables/util";

const {
  tableData,
  loading,
  currentPage,
  total,
  limit,
  getData,
  handleDelete,
  handleStatusChange
} = useInitTable({
  getList: getRoleList,
  delete: deleteRole,
  updateStatus: updateRoleStatus
})

const {
  formDrawerRef,
  formRef,
  form,
  rules,
  drawerTitle,
  handleSubmit,
  handleCreate,
  handleEdit
} = useInitForm({
  form: {
    name: "",
    desc: "",
    status: 1
  },
  rules: {
    name: [{
      required: true,
      message: '角色名称不能为空',
      trigger: 'blur'
    }],
    desc: [{
      required: true,
      message: '角色描述不能为空',
      trigger: 'blur'
    }],
  },
  getData,
  update: updateRole,
  create: createRole
})

// 抽屉列表
const setRuleFormDrawerRef = ref(null)
// 权限配置表单树形控件列表
const treeData = ref([])
// 虚拟树形控件动态高度
const treeHeight = ref(0)
// 角色 ID
const roleId = ref(0)
// 树形控件默认展开
const defaultExpandedKeys = ref([])
// 获取当前角色拥有的权限的 id
const ruleIds = ref([])
//  树形控件节点
const elTreeRef = ref(null)
// 树形控件父子节点关联 默认 false 互相关联
const checkStrictly = ref(false)

const openSetRule = (row) => {
  // console.log(row);
  roleId.value = row.id
  treeHeight.value = window.innerHeight - 180
  // 获取数据前先设置不互相关联
  checkStrictly.value = true
  getRuleList(1).then(res => {
    // 默认拿到每个节点的展开的id（默认展开一级的节点）
    defaultExpandedKeys.value = res.list.map(o => o.id)
    treeData.value = res.list
    setRuleFormDrawerRef.value.open()
    // 获取当前角色拥有的权限的 id
    ruleIds.value = row.rules.map(o => o.id)
    setTimeout(() => {
      // setCheckedKeys 通过 keys 设置目前勾选的节点(这里通过id)
      elTreeRef.value.setCheckedKeys(ruleIds.value)
      // 获取数据后再设置关联，为了保证点一个父节点可以选中所有子节点的一键选中功能
      checkStrictly.value = false
    }, 150);
  })
}

const handleSetRuleSubmit = () => {
  setRuleFormDrawerRef.value.showLoading()
  setRoleRules(roleId.value, ruleIds.value)
    .then(res => {
      toast("权限配置成功")
      getData()
      setRuleFormDrawerRef.value.close()
    })
    .finally(() => {
      setRuleFormDrawerRef.value.hideLoading()
    })
}

const handleTreeCheck = (...e) => {
  // 在 e 中拿到 checkedKeys,halfCheckedKeys 得到的就是 当前角色拥有的权限的 id
  const { checkedKeys, halfCheckedKeys } = e[1]
  // 解构赋值给 ruleIds
  ruleIds.value = [...checkedKeys, ...halfCheckedKeys]
}
</script>
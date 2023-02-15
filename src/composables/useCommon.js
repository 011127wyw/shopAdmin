import { reactive, ref, computed } from 'vue'
import { toast } from "~/composables/util"

// 组合式 API 特性封装 - 列表分页和搜素 修改状态和删除 批量删除功能
export function useInitTable(opt = {}) {

    // const searchForm = reactive({
    //     keyword: ""
    //   })

    // // 重置搜索 使页面回到原来列表
    // const resetSearchForm = () => {
    //      searchForm.keyword = ""
    //      getData()
    //  }
    // 传入的列表
    let searchForm = null
    let resetSearchForm = null
    if (opt.searchForm) {
        searchForm = reactive({ ...opt.searchForm })
        resetSearchForm = () => {
            for (const key in opt.searchForm) {
                searchForm[key] = opt.searchForm[key]
            }
            getData()
        }
    }

    const tableData = ref([])
    // 加载动画
    const loading = ref(false)

    // 分页
    // 当前页
    const currentPage = ref(1)
    // 总条数 （数据）
    const total = ref(0)
    // 每页多少条（数据）
    const limit = ref(10)

    // // 获取数据  p 是哪里传来的
    function getData(p = null) {
        if (typeof p == 'number') {
            currentPage.value = p
        }
        loading.value = true
        opt.getList(currentPage.value, searchForm).then(res => {
            if (opt.onGetListSuccess && typeof opt.onGetListSuccess == 'function') {
                opt.onGetListSuccess(res)
            } else {
                tableData.value = res.list
                total.value = res.totalCount
            }
        }
        ).finally(() => {
            loading.value = false
        })
    }
    getData()


    // 管理员状态修改
    const handleStatusChange = (status, row) => {
        row.statusLoading = true
        opt.updateStatus(row.id, status)
            .then(res => {
                toast("修改状态成功")
                // 将函数返回的将要修改的状态值（0或1）赋给 当前的状态
                row.status = status

            }).finally(() => {
                row.statusLoading = false
            })
    }



    // 删除
    const handleDelete = (id) => {
        loading.value = true
        opt.delete(id)
            .then(res => {
                toast("删除成功")
                getData()
            })
            .finally(() => loading.value = false)
    }


    // 多选选中ID
    const multiSelectionIds = ref([])

    // 多选框节点(批量删除)
    const multipleTableRef = ref(null)

    const handleSelectionChange = (e) => {
        multiSelectionIds.value = e.map(e => e.id)
    }

    // 批量删除
    const handleMultiDelete = () => {
        loading.value = true
        opt.delete(multiSelectionIds.value)
            .then(res => {
                toast("删除成功")
                // 清空选中
                if (multipleTableRef.value) {
                    multipleTableRef.value.clearSelection()
                }
                getData()
            })
            .finally(() => {
                loading.value = false

            })
    }


    // 批量修改状态
    const handleMultiStatusChange = (status) => {
        loading.value = true
        opt.updateStatus(multiSelectionIds.value, status)
            .then(res => {
                toast("状态成功")
                // 清空选中
                if (multipleTableRef.value) {
                    multipleTableRef.value.clearSelection()
                }
                getData()
            })
            .finally(() => {
                loading.value = false

            })
    }

    return {
        searchForm,
        tableData,
        loading,
        currentPage,
        total,
        limit,
        getData,
        resetSearchForm,
        handleStatusChange,
        handleDelete,
        multipleTableRef,
        multiSelectionIds,
        handleSelectionChange,
        handleMultiDelete,
        handleMultiStatusChange
    }
}

// 组合式 API 特性封装 - 新增和修改功能
export function useInitForm(opt = {}) {
    const formDrawerRef = ref(null)
    const formRef = ref(null)
    const defaultForm = opt.form
    const form = reactive({})

    const rules = opt.rules || {}

    // 修改
    const editId = ref(0)
    const drawerTitle = computed(() => editId.value ? "修改" : "新增")

    // 重置表单
    function resetForm(row = false) {
        // 清楚规则
        if (formRef.value) formRef.value.clearValidate()
        // 将传入的 row 值 赋给每一个 form
        for (const key in defaultForm) {
            form[key] = row[key]
        }
    }

    // 新增
    const handleCreate = () => {
        editId.value = 0
        resetForm(defaultForm)
        formDrawerRef.value.open()
    }

    // 编辑
    const handleEdit = (row) => {
        editId.value = row.id
        resetForm(row)
        formDrawerRef.value.open()
    }



    // 提交表单
    const handleSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) return

            formDrawerRef.value.showLoading()

            let body = {}
            if (opt.beforeSubmit && typeof opt.beforeSubmit == 'function') {
                body = opt.beforeSubmit({ ...form })
            } else {
                body = form
            }

            // 当在修改和新增分别提交表单时，分别提交显示不同的内容
            const fun = editId.value ? opt.update(editId.value, body) : opt.create(body)

            fun.then(res => {
                toast(drawerTitle.value + "成功")
                opt.getData(editId.value ? "false" : 1)
                formDrawerRef.value.close()
            })
                .finally(() => formDrawerRef.value.hideLoading())
        })
    }


    return {
        formDrawerRef,
        formRef,
        form,
        rules,
        editId,
        drawerTitle,
        resetForm,
        handleCreate,
        handleSubmit,
        handleEdit
    }
}



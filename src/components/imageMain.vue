<template>
  <!-- 图库界面主体部分封装 -->
  <el-main class="image-main" v-loading="loading">
    <div class="top" p-3>
      <el-row :gutter="10">
        <el-col
          :span="6"
          :offset="0"
          v-for="(item, index) in list"
          :key="index"
        >
          <el-card
            shadow="hover"
            class="relative mb-3"
            :body-style="{ padding: 0 }"
            :class="{ 'border-blue-800': item.checked }"
          >
            <el-image
              :src="item.url"
              class="h-[240px]"
              style="width: 100%"
              :preview-src-list="[item.url]"
              :initial-index="0"
            ></el-image>
            <div class="image-title">{{ item.name }}</div>
            <div class="flex justify-center items-center p-2">
              <el-checkbox
                v-if="openChoose"
                v-model="item.checked"
                @change="handleChooseChange(item)"
              ></el-checkbox>
              <el-button
                type="primary"
                size="small"
                text
                @click="handleEdit(item)"
                >修改名称</el-button
              >
              <el-popconfirm
                title="是否删除该图片？"
                confirmButtonText="确认"
                cancelButtonText="取消"
                @confirm="handleDelete(item.id)"
              >
                <template #reference>
                  <el-button type="primary" size="small" text>删除</el-button>
                </template>
              </el-popconfirm>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="bottom">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="currentPage"
        :page-size="limit"
        @current-change="getData"
      />
    </div>
  </el-main>
  <!-- 上传图片组件 -->
  <form-drawer ref="formDrawerRef" title="上传图片" destoryOnClose>
    <el-upload
      drag
      :action="uploadImageAction"
      :headers="{
        token,
      }"
      multiple
      name="img"
      :data="{ image_class_id }"
      :on-success="uploadSuccess"
      :on-error="uploadError"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">将文件拖到此处,或 <em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">只能上传jpg/png文件,且不超过500kb</div>
      </template>
    </el-upload>
  </form-drawer>
</template>

<script setup>
import { computed, ref } from 'vue'
import { getImageList, updateImage, deleteImage } from '~/api/image.js'
import FormDrawer from './FormDrawer.vue';
import { showPrompt, toast } from '~/composables/util.js'
import { uploadImageAction } from '~/api/image.js'
import { getToken } from '../composables/auth';



// 分页
// 当前页
const currentPage = ref(1)
// 总条数 （数据）
const total = ref(0)
// 每页多少条（数据）
const limit = ref(10)
const list = ref([])
const loading = ref(false)
const image_class_id = ref(0)

// 获取数据  p 是哪里传来的
function getData(p = null) {
  if (typeof p == 'number') {
    currentPage.value = p
  }
  loading.value = true
  getImageList(image_class_id.value, currentPage.value).then(res => {
    // console.log(res);
    // 获取后端传来的总条数
    total.value = res.totalCount
    list.value = res.list.map(o => {
      o.checked = false
      return o
    })
  }).finally(() => {
    loading.value = false
  })
}

// 根据分类ID重新加载图片列表
const loadData = (id) => {
  currentPage.value = 1
  image_class_id.value = id
  getData()
}

// 修改名称
const handleEdit = (item) => {
  showPrompt("修改名称", item.name)
    .then(({ value }) => {

      loading.value = true
      updateImage(item.id, value)
        .then(res => {
          toast("修改成功")
          getData()
        })
        .finally(() => {
          loading.value = false
        })

    })
}

// 删除图片
const handleDelete = (id) => {
  loading.value = true
  deleteImage([id]).then(res => {
    toast("删除成功")
    getData()
  })
    .finally(() => {
      loading.value = false
    })
}


// 打开抽屉
const formDrawerRef = ref(null)
const handleUpload = () => formDrawerRef.value.open()

// 获取上传图片的 token
const token = getToken()

const props = defineProps({
  data: Object,
  // 去掉复选框
  openChoose: {
    type: Boolean,
    default: false
  },
  limit: {
    type: Number,
    default: 1
  }
})

// 上传成功
const uploadSuccess = (response, uploadFile, uploadFiles) => {
  console.log(response);
  toast("上传成功",)
  getData(1)
}

// 上传失败
const uploadError = (error, uploadFile, uploadFiles) => {
  let mes = JSON.parse(error.message).msg || "上传失败"
  toast(msg, "error")
}

// 复选框 change
// 给父组件(ChooseImage传值
const emit = defineEmits(['choose'])
// 选中的照片  拿到列表里面选中的对象赋值给 changeImage
const changeImage = computed(() => list.value.filter(o => o.checked))
const handleChooseChange = (item) => {
  if (item.checked && changeImage.value.length > props.limit) {
    item.checked = false
    return toast(`最多选中${props.limit}张照片`, "error")
  }
  emit('choose', changeImage.value)
}


// 将方法暴露给父组件
defineExpose({
  handleUpload,
  loadData
})


</script>

<style>
.image-main {
  position: relative;
}

.image-main .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}
.image-main .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
}

.image-title {
  position: absolute;
  top: 212px;
  right: -1px;
  left: -1px;
  @apply text-sm truncate text-gray-100 bg-opacity-20 bg-gray-800 px-2 py-1;
}
</style>
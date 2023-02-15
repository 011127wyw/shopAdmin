<!-- 新增管理员  表单头像图片组件 -->
<template>
  <!-- 上传头像 后图片预览 -->
  <div v-if="modelValue && preview">
    <el-image
      v-if="typeof modelValue == 'string'"
      :src="modelValue"
      fit="cover"
      class="w-[100px] h-[100px] rounded border mr-2 t-pointop-1"
    ></el-image>
    <div v-else class="flex flex-wrap">
      <div
        class="relative mx-1 mb-2 w-[100px] h-[100px]"
        v-for="(url, index) in modelValue"
        :key="index"
      >
        <el-icon
          class="
            absolute
            right-[5px]
            top-[5px]
            cursor-pointer
            bg-white
            rounded-full
          "
          @click="removeImage(url)"
          style="z-index: 10"
          ><CircleClose
        /></el-icon>
        <el-image
          :src="url"
          fit="cover"
          class="w-[100px] h-[100px] rounded border mr-2 t-pointop-1"
        ></el-image>
      </div>
    </div>
  </div>

  <div v-if="preview" class="choose-image-btn" @click="open">
    <el-icon :size="25" class="text-gray-500"><Plus /></el-icon>
  </div>
  <el-dialog title="选择照片" v-model="dialogVisible" width="80%" top="5vh">
    <!-- 插入图片组件 -->
    <el-container class="bg-white rounded" style="height: 70vh">
      <el-header class="image-header">
        <el-button type="primary" size="small" @click="handleOpenCreate"
          >新增图片分类</el-button
        >
        <el-button type="warning" size="small" @click="handleOpenUpload"
          >上传图片</el-button
        >
      </el-header>
      <el-container>
        <!-- 图库侧边组件 -->
        <image-aside ref="ImageAsideRef" @change="handleAsideChange" />
        <!-- 图库主体组件 -->
        <image-main
          :limit="limit"
          openChoose
          ref="ImageMainRef"
          @choose="handleChoose"
        />
      </el-container>
    </el-container>

    <template #footer>
      <span>
        <el-button type="primary" @click="submit">确认</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { valueEquals } from "element-plus"
import { ref } from "vue"
import imageAside from '~/components/imageAside.vue'
import imageMain from '~/components/imageMain.vue'
import { toast } from "~/composables/util"

const dialogVisible = ref(false)

const callbackFunction = ref(null)
// 打开选择图片弹框
const open = (callback = null) => {
  callbackFunction.value = callback
  dialogVisible.value = true
}
const close = () => dialogVisible.value = false


// 插入的图片给表单的组件部分

// 引入抽屉组件
// 新增图片分类
const ImageAsideRef = ref(null)
const handleOpenCreate = () => ImageAsideRef.value.handleCreate()
// 上传图片
const ImageMainRef = ref(null)
const handleOpenUpload = () => ImageMainRef.value.handleUpload()


const handleAsideChange = (image_class_id) => {
  // 根据 ImageMainRef 调用 imageMain 暴露出来的 loadData 方法 更新数据
  ImageMainRef.value.loadData(image_class_id)
}


// 上传图片 (通过这两方法给 form.avatar拿到图片 url)
const props = defineProps({
  modelValue: [String, Array],
  limit: {
    type: Number,
    default: 1
  },
  preview: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['update:modelValue'])


// 拿到复选框选中的图片的路径
let urls = []
const handleChoose = (e) => {
  urls = e.map(o => o.url)
}

// 通过 emit 触发 修改 v-model中的值
const submit = () => {
  let value = []
  if (props.limit == 1) {
    value = urls[0]
  } else {
    value = props.preview ? [...props.modelValue, ...urls] : [...urls]
    if (value.length > props.limit) {
      let limit = props.preview ? (props.limit - props.modelValue.length) : props.limit
      return toast("最多还能选中" + limit + "张")
    }
  }
  if (value && props.preview) {
    emit("update:modelValue", value)
  }
  if (!props.preview && typeof callbackFunction.value === "function") {
    callbackFunction.value(value)
  }
  close()
}

// 轮播图移除图片
const removeImage = (url) => emit("update:modelValue", props.modelValue.filter(u => u != url))


defineExpose({
  open, close
})
</script>


<style>
.choose-image-btn {
  @apply w-[100px] h-[100px] rounded border flex justify-center items-center cursor-pointer hover:bg-gray-100;
}

.image-header {
  border-bottom: 1px solid #eeeeee;
  @apply flex items-center;
}
</style>
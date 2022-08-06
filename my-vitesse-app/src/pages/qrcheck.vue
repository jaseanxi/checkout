<!--  打卡-->
<template>
  <br>
  <br>
  <h1 class="text-red-500 text-center text-30px">上班的道路,洒下汗水的浇注,下班的脚步,踏动拼搏的投入,工作别太累太苦,自己把自己爱、把自己关注,祝你工作快乐、人生幸福</h1>
  <el-divider />
  <br>
  <br>

  <h1 class="text-red-500 text-center text-30px">
    <i class="i-openmoji-1st-place-medal p-3"></i>
    <i class="i-openmoji-2nd-place-medal p-3"></i>
    <i class="i-openmoji-3rd-place-medal p-3"></i>
    欢迎上班打卡
  </h1>
  <h1 class="text-red-500 text-center text-30px">二维码一人一张，请扫码之前先点击刷新二维码按钮</h1>
  <!-- <el-button round size="large" type="success" @click="refresh" class="button" :loading="loading"> 刷新二维码</el-button> -->

  <br>
  <br>

  <div class="qr">
    <qr-code :value="url" :size="350" level="H" />
  </div>

</template>

<script setup lang="ts">
import { reqQrINFO } from '~/api'

const loading = ref<any>(null)

const refresh = async () => {
  loading.value = setInterval(async () => {
    const res = await reqQrINFO();
    console.log(res.data.token)
    tokenTime.value = res.data.token
    url.value = `https://github.com/davidshimjs/qrcodejs?${tokenTime.value}`
  }, 5000)
}


const tokenTime = ref('')

onMounted(async () => {
  const res = await reqQrINFO();
  console.log(res.data.token)
  tokenTime.value = res.data.token
  url.value = `https://github.com/davidshimjs/qrcodejs?${tokenTime.value}`
  refresh()
})

const url = ref(`https://github.com/davidshimjs/qrcodejs?${tokenTime.value}`)
// const path: string = url.value.split('?')[1]
onBeforeUnmount(
  () => {

    clearInterval(loading.value)
  }
)

</script>
<style scoped>
.qr {
  text-align: center;
  display: flex;
  justify-content: center
}

.button {
  text-align: center;
  display: flex;
  justify-content: center;
  margin-left: 900px;
}
</style>
<route lang="yaml">
meta:
  layout: home
</route>
<template>
  <div class="common-layout">
    <el-container>
      <el-header height="100px" style="text-align:center;background-color:#409EFF;line-height: 100px;font-size: 50px;">
        <span class="text-50px font-bold text-center text-white-700 ">员工管理系统</span>
        <el-button type="danger" size="large" class="back" @click="logOut">退出登录</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px" height="100vh" backgroundColor="#409EFF">
          <el-scrollbar>
            <el-menu :default-openeds="['1', '3']">
              <el-sub-menu index="1" @click="router.push(`/managePerson`)">
                <template #title>
                  <el-icon>
                    <i class="i-carbon-3d-cursor p-3"></i>&nbsp;&nbsp;
                  </el-icon>

                  员工管理
                </template>
                <!-- <el-menu-item-group>
                  <template #title>Group 1</template>
                  <el-menu-item index="1-1">Option 1</el-menu-item>
                  <el-menu-item index="1-2">Option 2</el-menu-item>
                </el-menu-item-group> -->
                <!-- <el-menu-item-group title="Group 2">
                  <el-menu-item index="1-3">Option 3</el-menu-item>
                </el-menu-item-group> -->
                <!-- <el-sub-menu index="1-4">
                  <template #title>Option4</template>
                  <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
                </el-sub-menu> -->
              </el-sub-menu>
              <el-sub-menu index="2" @click="router.push(`/qrcheck`)">
                <template #title>
                  <el-icon>
                    <i class="i-ri-alarm-line p-3"></i>&nbsp;&nbsp;
                  </el-icon>

                  员工打卡
                </template>
                <!-- <el-menu-item-group>
                  <template #title>Group 1</template>
                  <el-menu-item index="2-1">Option 1</el-menu-item>
                  <el-menu-item index="2-2">Option 2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group 2">
                  <el-menu-item index="2-3">Option 3</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="2-4">
                  <template #title>Option 4</template>
                  <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
                </el-sub-menu> -->
              </el-sub-menu>

            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main>

          <RouterView></RouterView>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const logOut = async () => {
  await localStorage.removeItem("token");
  router.push('/')
}
</script>
<style scoped>
.el-aside {
  height: 100vh;

}

;

.back {
  position: relative;
  left: 300px
}

;

.el-header {
  background-color: rgb(7, 187, 241);
  text-align: center;
}
</style>

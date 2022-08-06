<!--  -->
<template>
  <el-table :data="tableData" style="width: 100%" max-height="25000">
    <el-table-column fixed prop="date" label="Date" width="150" />
    <el-table-column prop="name" label="Name" width="120" />
    <el-table-column prop="number" label="Identity Number" width="200" />

    <el-table-column prop="address" label="Address" width="600" />

    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
          Remove
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button class="mt-4" style="width: 100%" @click="onAddItem">Add Item</el-button>
  <el-form :model="form" label-width="120px" v-show="isShowAdd">
    <el-form-item label="姓名">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="工号">
      <el-input v-model="form.number" />
    </el-form-item>
    <el-form-item label="地址">
      <el-input v-model="form.region" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button @click="isShowAdd = false">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import { useUserStore } from '~/store/user'
import { postPersonInformation, reqDeleteInfo } from '~/api/index.js'
const now = new Date()
const user = useUserStore()

onMounted(async () => {

  const res = await user.getPersonInformation()
  console.log(res)
  tableData.value = res.data

})

// const router = useRouter()



// console.log(data.value)


const tableData = ref([
  {
    date: '',
    name: '',
    number: '',
    address: ''
  }

])

const deleteRow = async (index: number) => {
  // console.log(tableData.value[index - 1].name)
  now.setDate(now.getDate() + 1)
  const res = await reqDeleteInfo({

    deleteTime: dayjs(now).format('YYYY-MM-DD HH:mm:ss'),
    username: tableData.value[index].name
  })


  nextTick(() => {
    console.log(res.code)
    if (res.code == 200)
      tableData.value.splice(index, 1)
  })
}

const onAddItem = () => {
  isShowAdd.value = true

}
const form = reactive({
  name: '',
  region: '',
  number: '',
})
let isShowAdd = ref(false);

const onSubmit = async () => {
  isShowAdd.value = false
  console.log(form.name, form.region, form.number)
  now.setDate(now.getDate() + 1)
  tableData.value.push({
    date: dayjs(now).format('YYYY-MM-DD'),
    name: form.name,
    number: form.number,
    address: form.region
  }

  )
  await postPersonInformation(
    {
      date: dayjs(now).format('YYYY-MM-DD'),
      name: form.name,
      number: form.number,
      address: form.region
    }
  )

}


</script>
<style scoped>
</style>
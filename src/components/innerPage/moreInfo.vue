<template>
  <div class="more-info">
    <el-row>
      <el-col>以下資料皆為選填</el-col>

      <el-col :span="8" class="left-col">您的稱謂</el-col>
      <el-col :span="16" class="right-col">
        <el-input v-model="userName" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "MoreInfo",
  data() {
    return {
      userName: ""
    };
  }
};
</script>
<style>
.more-info {
  text-align: center;
}
.el-col {
  height: 40px;
  line-height: 40px;
}
</style>
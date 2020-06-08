<template>
  <div class="reg-shop">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item name="1">
        <template slot="title">
          <div style="width:100vw;text-align:center;padding-left:22px">註冊新店家</div>
        </template>
        <el-row>
          <el-col :span="8" class="left-col">店家名稱</el-col>
          <el-col :span="16" class="right-col">
            <el-input v-model="newShopName" />
          </el-col>
          <el-col :span="8" class="left-col">店家電話</el-col>
          <el-col :span="16" class="right-col">
            <el-input type="tel" v-model="newShopPhone" />
          </el-col>
          <el-col :span="8" class="left-col">店家地址</el-col>
          <el-col :span="16" class="right-col">
            <el-select v-model="citySelected" placeholder="縣市" no-data-text="無">
              <el-option v-for="(item,value) in city" :key="value" :label="value" :value="value"></el-option>
            </el-select>
          </el-col>
          <el-col :span="16" :offset="8" class="right-col">
            <el-select v-model="townSelected" placeholder="鄉鎮" no-data-text="無">
              <el-option v-for="item in city[citySelected]" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-col>
          <el-col :span="16" :offset="8" class="right-col">
            <el-input placeholder="詳細地址" />
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <div style="width:100vw;text-align:center;padding-left:22px">已登記店家</div>
        </template>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import cityData from "../assets/city.json";
export default {
  name: "RegShop",
  data() {
    return {
      activeName: "1",
      newShopName: "",
      newShopPhone: "",
      citySelected: "",
      townSelected: "",
      city: cityData
    };
  }
};
</script>
<style>
.reg-shop {
  text-align: center;
}
.el-col {
  height: 40px;
  line-height: 40px;
  margin-top: 2vh;
}
.el-select {
  width: 100%;
}
.el-collapse-item__header {
  text-align: center;
}
</style>
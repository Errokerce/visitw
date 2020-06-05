<template>
  <div class="container">
    <el-row>
      <el-col
        :xs="{span:20,offset:2}"
        :sm="{span:20,offset:2}"
        :md="{span:12,offset:6}"
        :lg="{span:12,offset:6}"
        :xl="{span:8,offset:8}"
      >
        <el-input
          v-show="step==1"
          v-model="phone"
          placeholder="請輸入手機號碼"
          maxlength="10"
          minlength="10"
          clearable
          type="tel"
        ></el-input>
        <el-input
          v-show="step==2"
          v-model="smsCode"
          placeholder="請輸入簡訊中的驗證碼"
          maxlength="6"
          minlength="6"
          clearable
          type="tel"
        ></el-input>
      </el-col>
      <el-col :span="8" :offset="8">
        <el-button type="primary" @click="send" :disabled="!btnEnable">送出</el-button>
      </el-col>
      <el-col>{{warringText}}</el-col>
      <el-col>{{apiDomain}}</el-col>
    </el-row>
  </div>
</template>

<script>
import gVar from "./gVar";

export default {
  name: "LoginP",
  data() {
    return {
      step: 1,
      smsCode: null,
      phone: null,
      btnEnable: false,
      warringText: ""
    };
  },
  watch: {
    phone: function(v) {
      this.btnEnable = /^09\d{8}$/.test(v);
    },
    smsCode: function(v) {
      this.btnEnable = /\d{6}$/.test(v);
    }
  },
  methods: {
    send() {
      if (this.step == 1) {
        if (this.btnEnable) {
          this.step++;
          this.btnEnable = false;
        } else {
          this.warringText = "手機號碼不正確";
        }
      } else if (this.step == 2) {
      }
    }
  }
};
</script>
<style>
.el-col {
  margin-top: 1vh;
}
</style>
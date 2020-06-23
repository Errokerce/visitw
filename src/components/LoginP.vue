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
    </el-row>
  </div>
</template>

<script>
import vars from "./gVar.vue";

export default {
  name: "LoginP",
  data() {
    return {
      step: 1,
      smsCode: null,
      phone: null,
      btnEnable: false,
      warringText: "",
      countDownTime: 0
      
    };
  },
  watch: {
    phone: function(v) {
      this.btnEnable = /^09\d{8}$/.test(v);
    },
    smsCode: function(v) {
      this.btnEnable = /^\d{6}$/.test(v);
    }
  },
  methods: {
    countDown() {
      this.warringText =
        "請在 " +
        parseInt(this.countDownTime / 1000) +
        " 秒內輸入簡訊內的驗證碼";
      let clock = window.setInterval(() => {
        this.countDownTime -= 1000;
        this.warringText =
          "請在 " +
          parseInt(this.countDownTime / 1000) +
          " 秒內輸入簡訊內的驗證碼";
        if (this.countDownTime <= 0) {
          window.clearInterval(clock);
          this.step = 1;
          this.warringText = "請重新取得驗證碼";
        }
      }, 1000);
    },
    send() {
      if (this.step == 1) {
        if (this.btnEnable) {
          this.stepPhone();
        } else {
          this.warringText = "手機號碼格式不正確";
        }
      } else if (this.step == 2) {
        if (this.btnEnable) {
          this.stepCode();
        } else {
          this.warringText = "驗證碼格式不正確";
        }
      }
    },
    stepCode() {
      let data = {
        phone: this.phone,
        code: this.smsCode
      };
      let url = vars.apiDomain + "/login/code";
      fetch(url, {
        method: "POST", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .catch(error => console.error("Error:", error))
        .then(response => {
          console.log("resp", response);

          switch (response.state) {
            case "ok":
              //返回首頁
              location.reload();
              break;
            case "time_out":
              this.warringText = "驗證碼過期，請重新取得驗證碼";
              this.step--;
              break;
            case "wrong":
              this.warringText = "驗證碼錯誤，請重新輸入";
            case "error":
              this.warringText = "Server Side Parsing Error\n請重新整理後再試";
              break;
          }
        });
    },
    stepPhone() {
      let data = {
        phone: this.phone
      };
      let url = vars.apiDomain + "/login/phone";
      fetch(url, {
        method: "POST", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .catch(error => console.error("Error:", error))
        .then(response => {
          console.log("resp", response);

          switch (response.state) {
            case "ok":
              this.countDownTime = response.expr_time - Date.now();
              this.countDown();
              this.step++;
              this.btnEnable = false;
              break;
            case "wait":
              this.warringText = "您剛剛已經發送過了，請稍候";
              break;
            case "error":
              this.warringText = "Server Side Parsing Error\n請重新整理後再試";
              break;
          }
        });
    }
  }
};
</script>
<style>
.el-col {
  margin-top: 1vh;
}
</style>
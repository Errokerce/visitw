<template>
  <div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item name="1">
        <template slot="title">
          <div style="width:100vw;text-align:center;padding-left:22px">掃描QrCode</div>
        </template>
        <div style="text-align: center;">
          <qrcode-stream
            style="display: inline-block;max-height:90vw; max-width:90vw"
            @decode="onDecode"
            v-if="activeName==1"
            :camera="cameraState"
          ></qrcode-stream>
        </div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <div style="width:100vw;text-align:center;padding-left:22px">已造訪店家</div>
        </template>
      </el-collapse-item>
    </el-collapse>
    <el-dialog title="確認登入" :visible.sync="showConfirm" width="80vh" center>
      <el-row style="text-align: center;line-height:1.5">
        <el-col :span="6">店名</el-col>
        <el-col :span="18">{{confirmInfo.shop_name}}</el-col>
        <el-col :span="6">電話</el-col>
        <el-col :span="18">{{confirmInfo.shop_phone}}</el-col>
        <el-col :span="6">地址</el-col>
        <el-col
          :span="18"
        >{{confirmInfo.shop_address.ctiy}} {{confirmInfo.shop_address.town}} {{confirmInfo.shop_address.street}}</el-col>
      </el-row>
      <span slot="footer">
        <el-button @click="!showConfirm">取消</el-button>
        <el-button type="primary" @click="confirmVisit">確定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import vars from "../gVar.vue";
export default {
  name: "VisitShop",
  components: {},
  data() {
    return {
      activeName: "1",
      scanResult: "",
      showConfirm: false,
      cameraState: "auto",
      confirmInfo: {
        shop_info: null,
        shop_id: null,
        shop_phone: null,
        shop_address: {
          ctiy: null,
          street: null,
          town: null
        }
      }
    };
  },
  watch: {
    // (location.href = location.href)
    showConfirm: function(v) {
      console.log(v);
      if (!v) {
        location.href.indexOf("=") == -1
          ? null
          : (location.href = location.origin);
        this.cameraState = "auto";
        this.scanResult = "";
      }
    },
    scanResult: function(v) {
      console.log(v);
      if (this.scanResult == "") return;
      if (v.startsWith("https://" + location.host)) {
        v = v.substring(v.indexOf("=") + 1, v.length);
        this.sendVisit(v);
        console.log(v);

        this.cameraState = "off";
      } else {
        console.log("f");
      }
    }
  },
  mounted() {},
  methods: {
    onDecode(r) {
      this.scanResult = r;
    },
    sendVisit(sid) {
      let url = vars.apiDomain + "/shop/" + sid;
      fetch(url)
        .then(res => res.json())
        .catch(error => console.error("Error:", error))
        .then(response => {
          console.log(response);
          switch (response.state) {
            case "ok":
              this.confirmInfo = response.shop_info;
              this.showConfirm = true;
            // this.shopList = Object.values(response.shop_list);
          }
        });
    },
    confirmVisit() {
      let url = vars.apiDomain + "/visit/" + this.confirmInfo.shop_id;
      fetch(url)
        .then(res => res.json())
        .catch(error => console.error("Error:", error))
        .then(response => {
          console.log(response);
          switch (response.state) {
            case "ok":
              this.$message({
                message: "登入成功",
                type: "success"
              });
              this.showConfirm = false;
            // this.shopList = Object.values(response.shop_list);
          }
        });
    }
  }
};
</script>
<template>
  <div style="text-align: center;">
    <el-autocomplete
      width="80vw"
      v-model="queryState"
      :fetch-suggestions="querySearchAsync"
      placeholder="以店家電話搜尋"
      value-key="shop_phone"
      :debounce="parseInt(1000)"
      @select="handleSelect"
    ></el-autocomplete>
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
        <el-table :data="visitedList" stripe style="width:100%">
          <el-table-column prop="date" label="日期" />
          <el-table-column prop="shop_name" lable="電話" />
          <el-table-column></el-table-column>
        </el-table>
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
      },
      queryResult: [],
      queryState: "",
      visitedList: []
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
  mounted() {
    this.getVisited();
  },
  methods: {
    getVisited() {
      let url = vars.apiDomain + "/user/visited_list";
      fetch(url)
        .then(res => res.json())
        .catch(error => console.error("Error:", error))
        .then(response => {
          console.log(response);
          switch (response.state) {
            case "ok":
              this.visitedList = response.visited_list;
          }
        });
    },
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
      this.queryState = "";
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
              this.getVisited();
              this.showConfirm = false;
            // this.shopList = Object.values(response.shop_list);
          }
        });
    },
    querySearchAsync(queryString, cb) {
      if (queryString == "") return;
      if (!/^\d+$/.test(queryString)) return;
      let url = vars.apiDomain + "/shop/query";
      let data = {
        phone_snippet: queryString
      };
      fetch(url, {
        method: "POST", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: new Headers({
          "Content-Type": "application/json"
        })
      }).then(res => {
        // console.log(res);
        res
          .json()
          .catch(error => console.error("Error:", error))
          .then(response => {
            console.log(response);
            switch (response.state) {
              case "ok":
                this.queryResult = response.phone_list;
                cb(this.queryResult);
                break;
              case "not found":
                cb([{ shop_phone: "not found" }]);
            }
          });
      });

      // cb(results);
    },

    handleSelect(item) {
      if (item.shop_id == null) {
        this.queryState = "";
        return;
      }
      this.sendVisit(item.shop_id);
      console.log(item);
    }
  }
};
</script>

<style>
.el-autocomplete {
  margin: 0.5rem;
  width: 80vw;
}
.el-input__inner {
  text-align: center;
}
</style>
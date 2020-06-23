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
            <el-input placeholder="詳細地址" v-model="newAddrInfo" />
          </el-col>
          <el-col :span="16" :offset="4">
            <el-button type="primary" @click="postData">送出</el-button>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <div style="width:100vw;text-align:center;padding-left:22px">已登記店家</div>
        </template>
        <el-table :data="shopList" stripe style="width:100%">
          <el-table-column prop="shop_name" label="店名" />
          <el-table-column prop="shop_phone" lable="電話" />
          <el-table-column>
            <template slot-scope="scope">
              <el-button type="primary" @click="gQrcode(scope.row.shop_id)">產生QRcode</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import cityData from "../../assets/city.json";
import vars from "../gVar.vue";
export default {
  name: "RegShop",
  data() {
    return {
      activeName: "1",
      newShopName: "",
      newShopPhone: "",
      citySelected: "",
      townSelected: "",
      newAddrInfo: "",
      city: cityData,
      userData: JSON.parse(sessionStorage.getItem("user_data")),
      shopList: [],
      QrcodeImg: ""
    };
  },
  mounted() {
    this.getShopList();
  },
  methods: {
    gQrcode(id) {
      let qrcode = require("qrcode-generator");
      let typeNumber = 4;
      let errorCorrectionLevel = "L";
      let qr = qrcode(typeNumber, errorCorrectionLevel);
      let url = "https://visitw.nctu.me/?shop=" + id;
      qr.addData(url);
      qr.make();
      this.QrcodeImg = qr.createDataURL(4);
      console.log(url, this.QrcodeImg);

      this.customMsgbox();
      // this.$alert(
      //   `<img src="${this.QrcodeImg}" style="width:50%;height:50%"/>`,
      //   "店家Qrcode",
      //   {
      //     dangerouslyUseHTMLString: true
      //   }
      // );
    },
    customMsgbox() {
      const h = this.$createElement;
      this.$msgbox({
        lockScroll: false,
        closeOnClickModal: true,
        title: "店家Qrcode",
        message: h("div", { style: "text-align: center;" }, [
          h(
            "img",
            {
              attrs: { src: `${this.QrcodeImg}` },
              style: "width:50%;height:50%"
            },
            this.QrcodeImg
          )
        ]),
        confirmButtonText: "確定"
      });
    },

    getShopList() {
      let url = vars.apiDomain + "/user/shop_list";
      fetch(url)
        .then(res => res.json())
        .catch(error => console.error("Error:", error))
        .then(response => {
          switch (response.state) {
            case "ok":
              this.shopList = Object.values(response.shop_list);
          }
        });
    },
    postData() {
      let data = {
        r_shop_name: this.newShopName,
        r_shop_phone: this.newShopPhone,
        r_shop_address: {
          r_city: this.citySelected,
          r_town: this.townSelected,
          r_street: this.newAddrInfo
        }
      };
      let url = vars.apiDomain + "/shop/reg";
      fetch(url, {
        method: "POST", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: new Headers({
          "Content-Type": "application/json"
        })
      })
        .then(res => res.json())
        .catch(error => console.error("Error:", error))
        .then(response => {
          console.log(response);
          switch (response.state) {
            case "ok":
              this.shopList.push(response.new_shop);
              this.$message({
                message: "新增成功",
                type: "success"
              });
              break;
            case "can't validate":
              this.$message({
                message: "請完整輸入店家資料",
                type: "warning"
              });
              break;
            case "repeat":
              this.shopList.push(response.shop_info);
              this.$message({
                message: "店家資料已存在，綁定成功",
                type: "success"
              });
              break;
          }
        });
    }
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
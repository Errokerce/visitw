<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item name="1">
      <template slot="title">
        <div style="width:100vw;text-align:center;padding-left:22px">掃描QrCode</div>
      </template>
      <qrcode-stream
        style="max-height:90vw; max-width:90vw"
        @decode="onDecode"
        v-if="activeName==1"
      ></qrcode-stream>
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <div style="width:100vw;text-align:center;padding-left:22px">已造訪店家</div>
      </template>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
export default {
  name: "VisitShop",
  components: {
    // QrcodeStream
  },
  data() {
    return {
      activeName: "1",
      scanResult: "",
      QrcodeImg: null
    };
  },
  watch: {
    scanResult: function(v) {
      console.log(v);
      if (v.startsWith("https://line")) console.log("c");
      else console.log("f");
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init: function() {
      var qrcode = require("qrcode-generator");
      console.log("init Start");
      var typeNumber = 4;
      var errorCorrectionLevel = "L";
      var qr = qrcode(typeNumber, errorCorrectionLevel);
      qr.addData("Hi!");
      qr.make();
      this.QrcodeImg = qr.createImgTag();
    },
    onDecode(scanResult) {
      this.scanResult = scanResult;
    }
  }
};
</script>
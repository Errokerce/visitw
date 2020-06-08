<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item name="1">
      <template slot="title">
        <div style="width:100vw;text-align:center;padding-left:22px">掃描QrCode</div>
      </template>
      {{ScanResult}}
      <qrcode-stream @decode="onDecode" v-if="activeName==1"></qrcode-stream>
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
      scanResult: ""
    };
  },
  watch: {
    scanResult: function(v) {
      console.log(v);
      if (v.startsWith("https://line")) console.log("c");
      else console.log("f");
    }
  },
  methods: {
    onDecode(scanResult) {
      this.scanResult = scanResult;
    }
  }
};
</script>
<template>
  <div>
    <el-container>
      <el-button id="showNav" @click="navDrawer=true" type="primary" icon="el-icon-more" />
      <el-header height="40px">{{navItem[pageSelect]}}</el-header>

      <visit-shop v-if="pageSelect==0" ref="visitPanel" />
      <reg-shop v-if="pageSelect==1" />
      <more-info v-if="pageSelect==2" />
      <el-main v-if="pageSelect==3">通報病例</el-main>
    </el-container>
    <el-drawer
      custom-class="el-drawer-class"
      size="50%"
      :visible.sync="navDrawer"
      :direction="'ltr'"
      :with-header="false"
    >
      <el-menu
        background-color="transparent"
        text-color="#fff"
        default-active="0"
        @select="handleOpen"
      >
        <el-menu-item v-for="(name,key) in navItem" :key="key" :index="key.toString()">{{name}}</el-menu-item>
      </el-menu>
    </el-drawer>
  </div>
</template>
<script>
import MoreInfo from "./innerPage/moreInfo.vue";
import RegShop from "./innerPage/regShop.vue";
import VisitShop from "./innerPage/visitShop.vue";

export default {
  name: "mainPanel",
  components: {
    MoreInfo,
    RegShop,
    VisitShop
  },
  data() {
    return {
      navDrawer: false,
      pageSelect: 0,
      navItem: ["到店登記", "店家管理", "資料補登", "通報病例"]
    };
  },
  mounted() {
    let qs = location.href.substring(
      location.href.indexOf("=") + 1,
      location.href.indexOf("#")
    );
    if (/^\d{8}$/.test(qs)) {
      this.$refs.visitPanel.sendVisit(qs);
    }
    console.log(this.$refs.visitPanel.cameraState);
  },
  methods: {
    handleOpen(key, keyPath) {
      this.pageSelect = key;
      this.navDrawer = false;
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
.el-header {
  background-color: silver;
  text-align: center;
  line-height: 40px;
  border-radius: 4px;
}
#showNav {
  position: fixed;
}
.el-drawer-class {
  /* width: 170vw; */
  background-color: #334;
}
.el-menu {
  border: 0;
  text-align: center;
  letter-spacing: 3px;
}
</style>
<template>
  <div>
    <el-container>
      <el-button id="showNav" @click="navDrawer=true" type="primary" icon="el-icon-more" />
      <el-header height="40px">{{navItem[pageSelect]}}</el-header>
      <more-info v-if="pageSelect==2" />
      <reg-shop v-if="pageSelect==1" />
      <el-main v-if="pageSelect==0">到店登記</el-main>
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
        default-active="1"
        @select="handleOpen"
      >
        <el-menu-item v-for="(name,key) in navItem" :key="key" :index="key">{{name}}</el-menu-item>
      </el-menu>
    </el-drawer>
  </div>
</template>
<script>
import MoreInfo from "./moreInfo.vue";
import RegShop from "./regShop.vue";

export default {
  name: "mainPanel",
  components: {
    MoreInfo,
    RegShop
  },
  data() {
    return {
      navDrawer: false,
      pageSelect: 1,
      navItem: ["到店登記", "店家管理", "資料補登", "通報病例"]
    };
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
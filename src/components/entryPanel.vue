<template>
  <div id="ep">
    <el-row>
      <el-col
        :xs="{span:16,offset:4}"
        :sm="{span:16,offset:4}"
        :md="{span:10,offset:7}"
        :lg="{span:6,offset:9}"
        :xl="{span:2,offset:11}"
      >
        <img id="logo" src="../assets/logo-x256.png" />
      </el-col>
      <el-col id="title">實聯制自主登記</el-col>
      <el-col
        :xs="{span:16,offset:4}"
        :sm="{span:16,offset:4}"
        :md="{span:10,offset:7}"
        :lg="{span:6,offset:9}"
        :xl="{span:2,offset:11}"
      >
        <el-button id="glogin" @click.self="displayHover('g')" v-text="'使用Google 登入'" />
      </el-col>
      <el-col
        :xs="{span:16,offset:4}"
        :sm="{span:16,offset:4}"
        :md="{span:10,offset:7}"
        :lg="{span:6,offset:9}"
        :xl="{span:2,offset:11}"
      >
        <el-button id="plogin" @click.self="displayHover('p')" v-text="'使用手機號碼登入'" />
      </el-col>
      <el-col>*使用手機號碼登入需要簡訊驗證碼</el-col>
    </el-row>

    <el-dialog :visible.sync="DispLoginG" width="90vw">
      <login-g />
    </el-dialog>
    <el-dialog :visible.sync="DispLoginP" width="90vw">
      <login-p />
    </el-dialog>
  </div>
</template>

<script>
import LoginGVue from "./LoginG.vue";
import LoginPVue from "./LoginP.vue";
export default {
  name: "EntryPanel",
  components: {
    LoginG: LoginGVue,
    LoginP: LoginPVue
  },
  data() {
    return {
      hwdisp: false,
      DispLoginG: false,
      DispLoginP: false
    };
  },
  methods: {
    displayHover(c) {
      switch (c) {
        case "g":
          this.DispLoginG = true;

          break;
        case "p":
          this.DispLoginP = true;
          break;
        case "f":
          this.DispLoginG = false;
          this.DispLoginP = false;
          break;
      }
      this.hwdisp = !this.hwdisp;
    }
  }
};
</script>

<style>
#ep {
  width: 100%;
  text-align: center;
}
#ep #logo {
  width: 100%;
}

#ep #title {
  width: 100%;
  margin: 1.5vh 0 2.5vh 0;
  font-size: 1.5rem;
}
#ep button {
  /* width: 76vw; */
  width: 100%;
  margin-bottom: 2vh;
  border-radius: 1rem;
}
#ep #spanText {
  font-size: 0.8rem;
}

#ep #hoverWindow {
  background-color: rgba(6, 6, 6, 0.6);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0%;
  left: 0%;
  padding: auto;
}
#ep #hoverContainer {
  margin: 5vh 10vw;
  width: 80vw;
  height: 90vh;
  background-color: #fcfcfc;
  border-radius: 1.5rem;
  overflow: hidden !important;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.el-col {
  border-radius: 4px;
}
</style>
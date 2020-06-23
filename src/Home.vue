<template>
  <div>
    <enrty-panel v-if="!isLogin" />
    <main-panel v-else />
  </div>
</template>

<script>
import EnrtyPanel from "./components/entryPanel.vue";
import MainPanel from "./components/mainPanel.vue";
import vars from "./components/gVar.vue";
import Cookies from "js-cookie";

export default {
  name: "App",
  components: {
    EnrtyPanel,
    MainPanel
  },
  data() {
    return {
      isLogin: false,
      userData: {}
    };
  },
  mounted() {
    this.fmc();
    console.log(vars.apiDomain);
    this.getJwtAndTryLogin();
  },
  methods: {
    fmc: function() {
      console.log("trying fcm");
    },
    showToken: function(msg, err) {
      console.log(msg, err);
    },
    getJwtAndTryLogin() {
      let token = Cookies.get("jwtAccess");
      if (!token) {
        this.isLogin = false;
      } else {
        this.getUserInfo();
      }
    },
    getUserInfo() {
      let url = vars.apiDomain + "/user";
      fetch(url)
        .then(res => res.json())
        .catch(error => console.error("Error:", error))
        .then(response => {
          console.log("resp", response);
          switch (response.state) {
            case "ok":
              this.isLogin = true;
              console.log(response.user_data);
              sessionStorage.setItem(
                "user_data",
                JSON.stringify(response.user_data)
              );
              break;
            default:
              this.isLogin = false;
          }
        });
    }
  }
};
</script>

<style>
#app {
  width: 100%;
  text-align: center;
}
#app #logo {
  width: 100%;
}

#app #title {
  width: 100%;
  margin: 1.5vh 0 2.5vh 0;
  font-size: 1.5rem;
}
#app button {
  /* width: 76vw; */
  width: 100%;
  margin-bottom: 2vh;
  border-radius: 1rem;
}
#app #spanText {
  font-size: 0.8rem;
}

#app #hoverWindow {
  background-color: rgba(6, 6, 6, 0.6);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0%;
  left: 0%;
  padding: auto;
}
#app #hoverContainer {
  margin: 5vh 10vw;
  width: 80vw;
  height: 90vh;
  background-color: #fcfcfc;
  border-radius: 1.5rem;
  overflow: hidden !important;
}
.bg-purple {
  background: #d3dce6;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.el-col {
  border-radius: 4px;
}
</style>
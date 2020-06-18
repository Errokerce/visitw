<template>
  <div>
    <enrty-panel v-if="!isLogin" />
    <main-panel v-else />
  </div>
</template>

<script>
import EnrtyPanel from "./components/entryPanel.vue";
import MainPanel from "./components/mainPanel.vue";

import Firebase from "firebase";
export default {
  name: "App",
  components: {
    EnrtyPanel,
    MainPanel
  },
  data() {
    return {
      isLogin: true,
      firebaseConfig: {
        apiKey: "AIzaSyDl5MWcyRom3RmeYuvSiI5R5ycsxTOVoyQ",
        authDomain: "visit-bbe42.firebaseapp.com",
        databaseURL: "https://visit-bbe42.firebaseio.com",
        projectId: "visit-bbe42",
        storageBucket: "visit-bbe42.appspot.com",
        messagingSenderId: "228818918488",
        appId: "1:228818918488:web:b1dd7ba12921071fda3e2d"
      }
    };
  },
  mounted() {
    this.fmc();
  },
  methods: {
    fmc: function() {
      console.log("trying fcm");
      if (!Firebase.apps.length) {
        Firebase.initializeApp(this.firebaseConfig);
      }
      const messaging = Firebase.messaging();
      messaging.usePublicVapidKey(
        "BMP_sEaayFMf28KVsGwl-1mVg1i3n8_Q8Nh2RoDbyQNGhxP7XYB3uEF46J6D1gXznCTOsmLZwNnL1RZZXs_-nGo"
      );
      messaging
        .getToken()
        .then(currentToken => {
          if (currentToken) {
            console.log(currentToken);
            sendTokenToServer(currentToken);
            updateUIForPushEnabled(currentToken);
          } else {
            // Show permission request.
            console.log(
              "No Instance ID token available. Request permission to generate one."
            );
            // Show permission UI.
            updateUIForPushPermissionRequired();
            setTokenSentToServer(false);
          }
        })
        .catch(err => {
          console.log("An error occurred while retrieving token. ", err);
          this.showToken("Error retrieving Instance ID token. ", err);
          Firebase.setTokenSentToServer(false);
        });
    },
    showToken: function(msg, err) {
      console.log(msg, err);
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
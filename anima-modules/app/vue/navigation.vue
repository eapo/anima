<template>
    <v-app-bar app>
        <v-toolbar-items>
            <v-btn text to="/about">Home</v-btn>
            <v-btn text to="/form">Form</v-btn>

            <language_selector></language_selector>
            <v-btn v-if="$store.state.server.session.is_admin" text @click="open_admin()">Admin</v-btn>
            <v-btn v-if="debug" text @click="open_editor()">Editor</v-btn>
        </v-toolbar-items>
    </v-app-bar>
</template>

<script>
import language_selector from "@/components/LanguageSelector.vue";
import about from "@/about.vue";
import form from "@/form.vue";

/*
  
  <v-btn text to="/vue">Vue</v-btn>
            <v-btn text to="/vuetify">Vuetify</v-btn>
            <v-btn text to="/session">Session</v-btn>
            <v-btn text to="/socket-io">Socket.io</v-btn>
            <v-btn text to="/payment">Payment</v-btn>
            <v-btn text to="/hello_login">##&en Login ##&hu Bejelentkezés ##</v-btn>
            <v-btn v-on:click="$root.login_dialog.open();">##&en Login Dialog ##&hu login Dialogus ##</v-btn>
  
  */

export default {
    name: "navigation",
    data: function() {
        return {
            debug: ß.DEBUG
        };
    },
    components: {
        language_selector,
        form
    },
    methods: {
        open_editor: function() {
            window.open("https://" + ß.HOSTNAME + ":9001", "_blank");
        },
        open_admin: function() {
            window.open("https://" + ß.HOSTNAME + "/admin", "_blank");
        },
        // <v-btn @click="clear_session()">clear</v-btn>
        clear_session() {
            this.$store.dispatch("server/save_session_data", []);
        }
    }
};
</script>

<style></style>

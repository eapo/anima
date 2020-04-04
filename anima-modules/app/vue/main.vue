

<template>
    <v-content id="main">
        <transition name="component-fade" mode="out-in">
          
          <about v-if="at('') || at('about')"/>

          <form v-if="at('form')"/>
          
            <hello_boilerplate v-if="at('') || at('boilerplate')" msg="##&en Welcome to the ßoilerplate Vue.js stack ##&hu A ßoilerplate Vue stack ##" />

            <!--login_dialog ref="login_dialog_reference" v-if="at('login') || open_login_dialog" @finished="finish_login_dialog"/-->
        </transition>
    </v-content>
</template>

<script>
  
import hello_boilerplate from "@/components/HelloBoilerplate.vue";
  
import form from "@/form.vue";
import about from "@/about.vue";  


export default {
    name: "app",
    data: function() {
        return {
            //open_login_dialog: false
        };
    },
    components: {
        hello_boilerplate,

        form,
        about

    },
    methods: {
        at: function(arg) {
            let a = arg.toLowerCase();
            let p = this.$route.path.toLowerCase();
            if (p === "/" + a) return true;
            if (p === "/" + a + "/") return true;
            return false;
        } 
        /*,
        finish_login_dialog() {
        	this.open_login_dialog = false;
            //this.$router.go('/');
        }*/
    }
};
</script>
<style>
#main {
    margin-top: 70px;
}

.component-fade-enter-active,
.component-fade-leave-active {
    transition: opacity 0.1s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0.2;
}
</style>

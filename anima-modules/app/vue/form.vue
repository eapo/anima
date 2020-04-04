<template>
    <div class="hello">
        <h1>Karantén Megoldás!?</h1>
        <v-card class="mx-auto" max-width="344" outlined>
            <v-list-item three-line>
                <v-list-item-content>
                    <div class="overline mb-4">OVERLINE</div>
                    <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
                    <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
            </v-list-item>

            <v-card-actions>
                <v-btn text>Button</v-btn>
                <v-btn text>Button</v-btn>
            </v-card-actions>
        </v-card>
        <!--
        *Erőforrás
Olyan szellemi, anyagi, gazdasági, társadalmi tényező, amely lehetőséget ad vagy alkalmas eszköz lehet adott cél megvalósításához, bizonyos dolog fejlesztéséhez. -->
    </div>
</template>

<script>
// use a Jsoneditor to display boilerplate variables

// https://vuetifyjs.com/en/components/text-fields/

import json_editor from "vue2-jsoneditor";

export default {
    name: "HelloWorld",
    data: function() {
        return {
            ß: ß
        };
    },
    props: {
        msg: String
    },
    components: {
        json_editor
    },
    mounted() {
        var JSONEditor = this.$refs.editor.editor;
        JSONEditor.setMode("view");
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #22c;
}
</style>

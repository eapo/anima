<template>
    <div class="hello">
        <h1>Karantén Megoldás!?</h1>
        <v-text-field
                  v-model="placeholder"
                  label="Ki vagyok én?"
        ></v-text-field>
        <v-text-field
                  v-model="placeholder"
                  label="Mihez értek, miben vagyok jó?"
        ></v-text-field>      
        <v-text-field
                  v-model="placeholder"
                  label="Akármi bármi"
        ></v-text-field>      
        <v-text-field
                  v-model="placeholder"
                  label="Akármi bármi"
        ></v-text-field>      
        <v-text-field
                  v-model="placeholder"
                  label="Akármi bármi"
        ></v-text-field>     
		<v-textarea
          name="input-7-1"
          label="Ez egy textarea"
          value=""
          hint="Textarea"
        ></v-textarea>      
        <v-text-field
                  v-model="placeholder"
                  label="Akármi bármi"
        ></v-text-field>      
        <v-text-field
                  v-model="placeholder"
                  label="Akármi bármi"
        ></v-text-field>            
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
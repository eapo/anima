<template>
    <div class="hello">
        <h1>Karantén! Megoldás?</h1>
        <v-card class="mx-auto" max-width="800" outlined>
            <v-list-item three-line>
                <v-list-item-content>
                    <div class="overline mb-4"></div>
                    <v-list-item-title class="headline mb-1">{{ get_question(current_question).question }}</v-list-item-title>
                    <v-list-item-subtitle>{{ get_question(current_question).description }}</v-list-item-subtitle>

                    <v-text-field v-if="!is_textarea(current_question)" v-model="answer" label="Regular"></v-text-field>
                    <v-textarea v-if="is_textarea(current_question)" v-model="answer" solo name="input-7-4" label="Solo textarea"></v-textarea>
                </v-list-item-content>
            </v-list-item>

            <v-card-actions>
                <v-btn v-disabled="!has_back()" depressed large color="primary" @click="back()" text>&larr;Vissza</v-btn>
                <v-spacer></v-spacer>
                <v-btn v-disabled="!has_next()" depressed large color="primary" @click="next()" text>Tovább&rarr;</v-btn>
            </v-card-actions>
        </v-card>
        is {{ $store.state.server.session.data }}
    </div>
</template>

<script>
// use a Jsoneditor to display boilerplate variables

// https://vuetifyjs.com/en/components/text-fields/

export default {
    name: "HelloWorld",
    data: function() {
        return {
            anima_questions: ß.ANIMA_QUESTIONS,
            current_question: 0,
            question_text: "",
            answer: ""
        };
    },
    props: {
        msg: String
    },
    methods: {
        get_question(i) {
            return this.anima_questions[i];
        },
        is_textarea(i) {
            return this.anima_questions[i].type === "textarea";
        },
        next() {
            var answers = this.$store.state.server.session.data || [];
            answers.push({ question: this.anima_questions[i], answer: this.answer });

            this.$store.dispatch("server/save_session_data", answers);
            this.answer = "";

            if (this.current_question < ß.ANIMA_QUESTIONS.length) this.current_question++;
        },
        back() {
            if (this.current_question > 0) this.current_question--;
        },
        has_next() {
            return this.current_question < ß.ANIMA_QUESTIONS.length;
        },
        has_back() {
            return this.current_question > 0;
        }
    },
    components: {},
    mounted() {}
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

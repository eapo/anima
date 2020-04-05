<template>
    <div class="hello">
        <h1>Karantén! Megoldás?</h1>
        <v-card class="mx-auto" max-width="800" outlined>
            <v-list-item three-line>
                <v-list-item-content>
                    <div class="overline mb-4"></div>
                    <v-list-item-title class="headline mb-1">{{ get_question(current_question).question }}</v-list-item-title>

                    <v-text-field v-if="!is_textarea(current_question)" v-model="answer" label="Regular"></v-text-field>
                    <v-textarea v-if="is_textarea(current_question)" v-model="answer" solo name="input-7-4" label="Solo textarea"></v-textarea>
                    <v-list-item-subtitle>{{ get_question(current_question).description }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-card-actions>
                <v-btn :disabled="!has_back()" depressed large color="primary" @click="back()" text>&larr;Vissza</v-btn>
                <v-spacer></v-spacer>
                <v-btn :disabled="!has_next()" depressed large color="primary" @click="next()" text>Tovább&rarr;</v-btn>
            </v-card-actions>
        </v-card>
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
        validateEmail(email) {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        },
        get_question(i) {
            return this.anima_questions[i];
        },
        is_textarea(i) {
            return this.anima_questions[i].type === "textarea";
        },
        next() {
            var answers = this.$store.state.server.session.data || [];
            var i = this.current_question;
            // if (i==0) { this.validateEmail(this.answer) }

            answers[i] = { question: this.anima_questions[i].question, answer: this.answer };

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
    mounted() {},
    computed: {}
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
.v-input input {
    height: 2em;
    font-size: 120%;
    max-width: 96%;
}
.v-text-field input {
    flex: 1 1 auto;
    line-height: 1.25em;
    font-size: 120%;
    padding: 0.2em 0;
    max-width: 96%;
    min-width: 0;
    width: 100%;
}
</style>

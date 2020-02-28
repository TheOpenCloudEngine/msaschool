<template>
    <v-container>
        <v-breadcrumbs :items="breadCrumb" large>
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>
        <v-divider></v-divider>
        <vue-markdown
                class="markdown-body"
                :source="md"
        >
        </vue-markdown>
    </v-container>
</template>

<script>
    export default {
        name: "overview",
        data() {
            return {
                items: [
                    {
                        text: 'OverView',
                        disabled: false,
                        href: '/aa/overview',
                    },
                ],
                md: '',
                aaa: true
            }
        },
        props: {
            value: Object
        },
        methods: {},
        computed: {
            breadCrumb() {
                var me = this
                var menu1 = this.$route.params.menu1;
                var menu2 = this.$route.params.menu2;
                var menu2 = this.$route.params.menu3;

                var tmp = []
                Object.keys(this.$route.params).forEach(function (key, idx) {
                    var disabled = false;
                    var href = '';
                    var text = '';

                    if (idx != 0) {
                        text = me.$route.params[key].split('_')[1]

                        for (var i = 0; i < idx + 1; i++) {
                            // console.log(`/${me.$route.params[Object.keys(me.$route.params)[i]]}`);
                            if (i == 1 && idx == 1) {
                                href = href.concat(`/${me.$route.params[Object.keys(me.$route.params)[i]]}/index`);
                            } else {
                                href = href.concat(`/${me.$route.params[Object.keys(me.$route.params)[i]]}`);
                            }
                        }

                    } else {
                        text = me.$route.params[key]
                        href = href.concat(`/${me.$route.params[Object.keys(me.$route.params)[0]]}/overview`)
                    }

                    if (idx == me.$route.params.length - 1) {
                        disabled = true;
                    }
                    // console.log(href)
                    if (text.includes('---')) {
                        text = text.replace('---', '&')
                    } else if (text.includes('--')) {
                        text = text.replace('--', '/')
                    }
                    var breadTmp = {
                        text: text,
                        disabled: disabled,
                        href: href
                    }
                    tmp.push(breadTmp)
                    // this.$route.params[key]
                })


                return tmp
            }
        },
        mounted() {
            var me = this;
            let menu1 = this.$route.params.menu1;
            let menu2 = this.$route.params.menu2;
            let menu3 = this.$route.params.menu3;
            me.aaa = true
            menu1 = menu1.substring(0, 1).toUpperCase() + menu1.substring(1)
            menu2 = menu2.substring(0, 1).toUpperCase() + menu2.substring(1)


            if (menu3) {
                this.$http.get(`/contents/${this.value['menuNumber'][this.$route.params.menu1]}_${menu1.substring(0, 1).toUpperCase() + menu1.substring(1)}/${menu2}/${menu3}.md`).then(function (result) {
                    me.md = result.data
                })
            } else {
                this.$http.get(`/contents/${this.value['menuNumber'][this.$route.params.menu1]}_${menu1.substring(0, 1).toUpperCase() + menu1.substring(1)}/${menu2}.md`).then(function (result) {
                    me.md = result.data
                })
            }
        },
        watch: {},
    }
</script>

<style scoped>
    .v-application .headline {
        font-family: 'Nanum Gothic', sans-serif !important;
    }
</style>

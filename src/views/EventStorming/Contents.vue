<template>
    <v-container>
        <v-responsive>
            <v-col style="padding-top: 0px; padding-bottom: 0px;">
                <v-breadcrumbs style="padding-top: 20px!important; padding-bottom: 10px!important;" :items="breadCrumb"
                               large>
                    <template v-slot:divider>
                        <v-icon>mdi-chevron-right</v-icon>
                    </template>
                </v-breadcrumbs>
            </v-col>
            <v-divider></v-divider>
            <v-col cols="6">
                <vue-markdown
                        class="markdown-body"
                        :source="md"
                >
                </vue-markdown>
            </v-col>
            <v-col cols="6">
                <div id="disqus_thread"></div>
            </v-col>
        </v-responsive>
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
                        console.log(Object.keys(me.$route.params).length)
                        for (var i = 0; i < idx + 1; i++) {
                            // console.log(`/${me.$route.params[Object.keys(me.$route.params)[i]]}`);
                            if (Object.keys(me.$route.params).length > 2 && i == 1 && idx == 1) {
                                href = href.concat(`/${me.$route.params[Object.keys(me.$route.params)[i]]}/index`);
                            } else {
                                href = href.concat(`/#/${me.$route.params[Object.keys(me.$route.params)[i]]}`);
                            }
                        }

                    } else {
                        text = me.$route.params[key]
                        if(text=='소개')  {
                            href = '/#/소개/01_MSA%20School%20소개'
                        } else if (text == '계획단계') {
                            href = '/#/계획단계/01_최종목표%20수립'
                        } else if (text=='설계--구현--운영단계') {
                            href = '/#/설계--구현--운영단계/02_분석/index'
                        } else if (text == '참고자료') {
                            href = '/#/참고자료/02_MSA%20방법론/index'
                        } else if (text=='커뮤니티') {
                            href = '/#/커뮤니티/01_이벤트%20및%20공지'
                        }

                    }

                    if (idx == me.$route.params.length - 1) {
                        disabled = true;
                    }
                    // console.log(href)
                    if (text.includes('---')) {
                        text = text.replace(/---/g, '&')
                    } else if (text.includes('--')) {
                        text = text.replace(/--/g, '/')
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
        beforeMount() {
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
        mounted() {
            (function () { // DON'T EDIT BELOW THIS LINE
                var d = document, s = d.createElement('script');
                s.src = 'https://msaschool-io.disqus.com/embed.js';
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
            })();
        },
        watch: {
            md: {
                handler() {
                    hljs.initHighlightingOnLoad();
                }
            }
        },
    }
</script>

<style scoped>


    .v-application .headline {
        font-family: 'Nanum Gothic', sans-serif !important;
    }
</style>

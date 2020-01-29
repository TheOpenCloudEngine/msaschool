<template>
    <v-container class="grey lighten-5">
        <v-row no-gutters>
            <template>
                <v-col>
                    <v-breadcrumbs :items="breadCrumb" large>
                        <template v-slot:divider>
                            <v-icon>mdi-chevron-right</v-icon>
                        </template>
                    </v-breadcrumbs>
                </v-col>

                <v-responsive
                        width="100%"
                >
                    <vue-markdown
                            :source="md"
                    >
                    </vue-markdown>

                    <v-divider></v-divider>
                    <a>Explore More</a>
                </v-responsive>
            </template>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "overview",
        props: {
            value: Object
        },
        data() {
            return {
                md: ''
            }
        },
        computed: {
            breadCrumb() {
                var me = this
                var menu1 = this.$route.params.menu1;
                var menu2 = this.$route.params.menu2;
                var tmp = []
                Object.keys(this.$route.params).forEach(function (key, idx) {
                    var disabled = false;
                    var href = '';
                    var text = '';

                    if (idx != 0) {
                        text = me.$route.params[key].split('_')[1]

                        for (var i = 0; i < idx + 1; i++) {
                            console.log(`/${me.$route.params[Object.keys(me.$route.params)[i]]}`);
                            if (i == 1) {
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
                    console.log(href)
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

            this.$http.get(`/contents/${this.value['menuNumber'][this.$route.params.menu1]}_${menu1}/Overview.md`).then(function (result) {
                me.md = result.data
            })
        }
    }
</script>

<style scoped>

</style>

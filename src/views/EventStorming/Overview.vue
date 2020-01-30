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
                    <v-divider style="margin-bottom: 10px;"></v-divider>

                    <vue-markdown
                            class="markdown-body"
                            :source="md"
                    >
                        <!--<article-->
                                <!--class="markdown-body"-->
                        <!--&gt; {{md}}</article>-->
                    </vue-markdown>
                </v-responsive>
                <v-responsive
                        width="100%"
                >
                    <v-divider style="margin-bottom: 10px;"></v-divider>
                    Explore More
                    <v-row align="center" justify="center">
                        <v-col v-for="(item,idx) in items"
                               style="margin: 10px;"
                               cols="12"
                               sm="3"
                               v-if="idx < 3"
                        >
                            <v-card outlined class="margin-test" :to="item.to">
                                <v-list-item three-line>
                                    <v-list-item-avatar
                                            tile
                                            size="90"
                                            color="grey"
                                    ></v-list-item-avatar>

                                    <v-list-item-content>
                                        <div class="overline mb-4">Content {{idx + 1}}</div>
                                        <v-list-item-title class="headline mb-1">{{item.text}}</v-list-item-title>
                                        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-card>
                        </v-col>
                    </v-row>
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
                md: '',
                items: []
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

            this.value.items.forEach(function (item) {
                if (item.to.includes(menu1) && !item.to.includes('overview')) {
                    console.log(console.log(item))
                    me.items.push(item)
                }
            })

            this.$http.get(`/contents/${this.value['menuNumber'][this.$route.params.menu1]}_${menu1}/Overview.md`).then(function (result) {
                me.$nextTick(function () {
                    me.md = result.data
                })
            })
        }
    }
</script>

<style scoped>

</style>

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
                    <v-divider></v-divider>
                    <vue-markdown
                            :source="md"
                    >
                    </vue-markdown>
                    <v-row>
                        <v-col cols="12">
                            <v-card outlined class="margin-test" v-for="(item,idx) in items" :to="item.to">
                                <v-list-item three-line style="padding-left: 0">
                                    <v-img
                                            :src="imgSrc(item)"
                                            height="110px"
                                            max-width="110px"
                                            style="margin-right: 20px;"
                                    ></v-img>
                                    <v-list-item-content>
                                        <div class="overline mb-4">Content {{idx +1}}</div>
                                        <v-list-item-title class="headline mb-1">{{item.text}}</v-list-item-title>
                                        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully
                                        </v-list-item-subtitle>
                                    </v-list-item-content>

                                </v-list-item>
                            </v-card>
                        </v-col>
                    </v-row>
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

                                    >
                                        <img :src="imgSrc(item)">
                                    </v-list-item-avatar>

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
        name: "treemain",
        data() {
            return {
                items: [],
                md: ''
            }
        },
        props: {
            value: Object
        },
        methods: {
            // route
            imgSrc(item) {
                console.log(item.to)
                var me = this
                var menu1 = this.$route.params.menu1;
                var menu2 = this.$route.params.menu2;
                var tmp = item.to.split('/')
                var src = '/contents';

                console.log(tmp)

                for(var i = 1; i < tmp.length; i++) {
                    if(i==1) {
                        src = src.concat('/' + this.value['menuNumber'][this.$route.params.menu1]+ '_' + menu1 )
                     } else {
                        src = src.concat('/' + tmp[i])
                    }
                }

                src = src.concat('.png')
                console.log(src)
                return src
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
            console.log(this.value)
            var menu1 = this.$route.params.menu1;
            var menu2 = this.$route.params.menu2;

            this.value.items.forEach(function (item) {
                if (item.route == menu2) {
                    item.children.forEach(function (listItem) {
                        me.items.push(listItem)
                    })
                }
            })

            this.$http.get(`/contents/${this.value['menuNumber'][this.$route.params.menu1]}_${menu1}/${menu2}/index.md`).then(function (result) {
                me.md = result.data
            })
        }
    }
</script>

<style scoped>
    .margin-test {
        margin-bottom: 10px;
    }
</style>

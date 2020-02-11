<template>
    <v-container>
        <v-row no-gutters>
            <template>
                <v-responsive
                        width="100%"
                >
                    <v-divider></v-divider>

                    <!--                    <v-row class="hero-section">-->
                    <v-row dense>
                        <v-col cols="12">
                            <vue-markdown
                                    class="markdown-body"
                                    :source="md"
                            >
                            </vue-markdown>
                        </v-col>
                    </v-row>

                </v-responsive>
                <v-responsive
                        width="100%"
                >
                    <!--<v-divider></v-divider>-->
                    <div class="em-title col">Explore More</div>
                    <v-row align="center" justify="center" style="max-width:1050px;margin:0 auto;">
                        <v-col v-for="(item,idx) in items"
                               style="margin:0px;overflow-x:hidden;"
                               cols="12"
                               sm="3"
                               v-if="idx < 3"
                        >
                            <router-link style="text-decoration:none" v-if="item.children" :to="item.route +'/index'">
                                <v-list-item-avatar
                                        tile
                                        width="100%"
                                        height="auto"
                                >
                                    <img :src="imgSrc(item)" class="img">

                                    <!-- BizDevOps Explore More 이미지 -->
                                    <!--
                                        <img src="/contents/03_method-1.png" class="img" alt="Analysis">
                                        <img src="/contents/03_method-2.png" class="img" alt="Design">
                                        <img src="/contents/03_method-3.png" class="img" alt="Implementation">
                                     -->

                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <div class="overline mb-1">Content {{idx + 1}}</div>
                                    <v-list-item-title class="headline mb-1">{{item.text}}</v-list-item-title>
                                    <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </router-link>
                            <router-link style="text-decoration:none" v-else :to="item.to">

                                <v-list-item-avatar
                                        tile
                                        width="100%"
                                        height="auto"
                                >
                                    <img :src="imgSrc(item)" class="img">

                                    <!-- BizDevOps Explore More 이미지 -->
                                    <!--
                                        <img src="/contents/03_method-1.png" class="img" alt="Analysis">
                                        <img src="/contents/03_method-2.png" class="img" alt="Design">
                                        <img src="/contents/03_method-3.png" class="img" alt="Implementation">
                                     -->

                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <div class="overline mb-1">Content {{idx + 1}}</div>
                                    <v-list-item-title class="headline mb-1">{{item.text}}</v-list-item-title>
                                    <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </router-link>
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
        methods: {
            imgSrc(item) {
                console.log(item.to)
                var me = this
                var menu1 = this.$route.params.menu1;
                var menu2 = this.$route.params.menu2;
                var tmp = item.to.split('/')
                var src = '/contents';

                console.log(tmp)

                for (var i = 1; i < tmp.length; i++) {
                    if (i == 1) {
                        src = src.concat('/' + this.value['menuNumber'][this.$route.params.menu1] + '_' + menu1.substring(0, 1).toUpperCase() + menu1.substring(1))
                    } else {
                        var tmpSrc = ''
                        if (i == tmp.length - 1) {
                            var tmpSplit = tmp[i].split('_')
                            for (var y = 0; y < tmpSplit.length; y++) {
                                if (y == 0) {
                                    tmpSrc = tmpSrc.concat(tmpSplit[y])
                                } else {
                                    tmpSrc = tmpSrc.concat('_' + tmpSplit[y].substring(0, 1).toUpperCase() + tmpSplit[y].substring(1))

                                    if (y == tmpSplit.length - 1) {
                                        src = src.concat('/' + tmpSrc)
                                    }
                                }
                            }
                        }
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
            let menu1 = this.$route.params.menu1;
            let menu2 = this.$route.params.pathMatch;
            console.log(menu2)
            menu2 = '01_' + menu2


            this.value.items.forEach(function (item) {
                if (item.to.includes(menu1) && !item.to.includes('overview')) {
                    console.log(item)
                    me.items.push(item)
                }
            })

            this.$http.get(`/contents/${this.value['menuNumber'][this.$route.params.menu1]}_${menu1.substring(0, 1).toUpperCase() + menu1.substring(1)}/${menu2}.md`).then(function (result) {
                me.$nextTick(function () {
                    me.md = result.data
                })
            })
        }
    }
</script>

<style scoped>
    li a {
        text-decoration: none;
    }

</style>

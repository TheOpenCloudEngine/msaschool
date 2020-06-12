<template>
    <v-container>
        <v-row no-gutters>
            <template>
                <v-col>
                    <v-row>
                        <v-col v-if="window.width > 1100" cols="3">
                            <v-spacer></v-spacer>
                        </v-col>
                        <v-col v-if="window.width > 1100" cols="5">
                            <v-breadcrumbs style="padding-top: 20px!important; padding-bottom: 10px!important;"
                                           :items="breadCrumb" large>
                                <template v-slot:divider>
                                    <v-icon>mdi-chevron-right</v-icon>
                                </template>
                            </v-breadcrumbs>
                        </v-col>
                        <v-col v-else cols="7">
                            <v-breadcrumbs style="padding-top: 20px!important; padding-bottom: 10px!important;"
                                           :items="breadCrumb" large>
                                <template v-slot:divider>
                                    <v-icon>mdi-chevron-right</v-icon>
                                </template>
                            </v-breadcrumbs>
                        </v-col>
                        <v-col v-if="window.width < 1100" align-self="center" cols="4">
                            <v-img style="margin-top: 5px" min-width="150px;" max-width="150px" max-height="50px" v-if="breadCrumbImg" :src="getBreadCrumbImg()"></v-img>
                        </v-col>
                        <v-col v-else align-self="center" cols="2">
                            <v-img style="margin-top: 5px" min-width="150px;" max-width="150px" max-height="50px" v-if="breadCrumbImg" :src="getBreadCrumbImg()"></v-img>
                        </v-col>
                    </v-row>
                </v-col>
                <v-responsive
                        width="100%"
                >
                    <v-divider></v-divider>
                    <v-col cols="6">
                        <vue-markdown
                                class="markdown-body"
                                :source="md"
                        >
                        </vue-markdown>
                    </v-col>
                    <v-row>
                        <v-col cols="12">
                            <v-card outlined class="margin-test" v-for="(item,idx) in items" :to="item.to">
                                <v-list-item three-line style="padding-left: 0">
                                    <v-img
                                            :src="imgSrc(item)"
                                            height="120px"
                                            max-width="120px"
                                            style="margin-right: 20px;"
                                    ></v-img>
                                    <v-list-item-content>
                                        <div class="overline mb-1">Content {{idx +1}}</div>
                                        <v-list-item-title class="headline mb-1">{{item.text}}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-responsive>
                <v-responsive
                        width="100%"
                >
                    <!--<v-divider></v-divider>-->
                    <div class="em-title col">Explore More</div>
                    <v-row align="center" justify="center" style="max-width:1050px;margin:0 auto;">
                        <v-col v-for="(item,idx) in exploreItems"
                               style="margin:10px;overflow-x:hidden;"
                               cols="12"
                               sm="3"
                               v-if="idx < 3"
                        >
                            <router-link v-if="item.children" style="text-decoration:none"
                                         :to="item.to+'/'+item.route + '/index'">
                                <v-list-item-avatar
                                        tile
                                        width="100%"
                                        height="auto"
                                >
                                    <img :src="imgSrcTree(item)" class="img">
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <div class="overline mb-1">{{item.status}}</div>
                                    <v-list-item-title class="headline mb-1">{{item.text}}</v-list-item-title>
                                </v-list-item-content>
                            </router-link>
                            <router-link v-else style="text-decoration:none" :to="item.to">
                                <v-list-item-avatar
                                        tile
                                        width="100%"
                                        height="auto"
                                >
                                    <img :src="imgSrc(item)" class="img">
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <div class="overline mb-1">{{item.status}}</div>
                                    <v-list-item-title class="headline mb-1">{{item.text}}</v-list-item-title>
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
        name: "treemain",
        data() {
            return {
                items: [],
                md: '',
                breadCrumbImg: false
            }
        },
        props: {
            value: Object,
            window: Object
        },
        methods: {
            getBreadCrumbImg() {
                var menu1 = this.$route.params.menu1;
                var menu2 = this.$route.params.menu2;

                console.log(menu1, menu2)
                var src = '/contents';

                src = src.concat('/' + this.value['menuNumber'][this.$route.params.menu1] + '_' + menu1 + '/' + menu2)

                src = src.concat('.png')
                return src

            },
            // route
            imgSrc(item) {
                var me = this
                var menu1 = this.$route.params.menu1;
                var menu1 = this.$route.params.menu1;
                var menu2 = this.$route.params.menu2;

                menu1 = menu1.substring(0, 1).toUpperCase() + menu1.substring(1)
                menu2 = menu2.substring(0, 1).toUpperCase() + menu2.substring(1)
                var tmp = item.to.split('/')
                var src = '/contents';


                for (var i = 1; i < tmp.length; i++) {
                    if (i == 1) {
                        src = src.concat('/' + this.value['menuNumber'][this.$route.params.menu1] + '_' + menu1.substring(0, 1).toUpperCase() + menu1.substring(1))
                    } else {
                        var tmpSrc = ''
                        if (tmp[i].includes('_')) {
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
                return src
            },
            imgSrcTree(item) {
                var me = this
                var menu1 = this.$route.params.menu1;
                var menu2 = this.$route.params.menu2;

                menu1 = menu1.substring(0, 1).toUpperCase() + menu1.substring(1)
                menu2 = menu2.substring(0, 1).toUpperCase() + menu2.substring(1)
                var tmp = item.to.split('/')
                var src = '/contents';

                src = src.concat('/' + this.value['menuNumber'][this.$route.params.menu1] + '_' + menu1 + '/' + item.route)

                src = src.concat('.png')
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
                            if (i == 1) {
                                href = href.concat(`/${me.$route.params[Object.keys(me.$route.params)[i]]}/index`);
                            } else {
                                href = href.concat(`/#/${me.$route.params[Object.keys(me.$route.params)[i]]}`);
                            }
                        }

                    } else {
                        text = me.$route.params[key]
                        if (text == '소개') {
                            href = '/'
                        } else if (text == '계획단계') {
                            href = '/#/계획단계/01_최종목표%20수립'
                        } else if (text == '설계--구현--운영단계') {
                            href = '/#/설계--구현--운영단계/02_분석/index'
                        } else if (text == '참고자료') {
                            href = '/#/참고자료/02_MSA%20방법론/index'
                        } else if (text == '커뮤니티') {
                            href = '/#/커뮤니티/01_이벤트%20및%20공지'
                        }
                    }
                    if (idx == me.$route.params.length - 1) {
                        disabled = true;
                    }
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
            },
            exploreItems() {
                var me = this
                // console.log(me.items)
                let menu1 = this.$route.params.menu1;
                let menu2 = this.$route.params.menu2;
                let menu3 = this.$route.params.menu3;
                var result = [];
                var count = 0;
                var nextEnd = false;

                this.value.items.forEach(function (item, idx) {
                    // console.log(me.$route.path, item)
                    if (me.$route.path.includes(item.route)) {
                        // console.log(idx)
                        count = idx;
                    }
                })

                this.value.items.some(function (item, idx) {
                    if (nextEnd == true) {
                        return;
                    } else if (idx == count - 1) {
                        console.log(item)
                        item.status = 'prev'
                        result.push(item)
                    } else if (idx == count + 1) {
                        console.log(item)
                        result.push(item)
                        item.status = 'next'
                        nextEnd = true
                    }
                })

                return result

            }
        },
        mounted() {

            var me = this;
            var menu1 = this.$route.params.menu1;
            var menu2 = this.$route.params.menu2;
            if (menu1 == '설계--구현--운영단계') {
                me.breadCrumbImg = true
            }
            menu1 = menu1.substring(0, 1).toUpperCase() + menu1.substring(1)
            menu2 = menu2.substring(0, 1).toUpperCase() + menu2.substring(1)

            this.value.items.forEach(function (item) {
                if (item.route == menu2) {
                    item.children.forEach(function (listItem) {
                        me.items.push(listItem)
                    })
                }
            })

            this.$http.get(`/contents/${this.value['menuNumber'][this.$route.params.menu1]}_${menu1.substring(0, 1).toUpperCase() + menu1.substring(1)}/${menu2}/index.md`).then(function (result) {
                me.md = result.data
            })
        }
    }
</script>

<style scoped>
    .margin-test {
        margin-bottom: 10px;
    }

    li a {
        text-decoration: none;
    }
</style>

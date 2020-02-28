<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                hide-overlay
                app
                clipped
                color="#f5f5f5"
        >
            <v-list shaped>
                <template v-for="item in items">
                    <v-list-group mandatory
                                  :eager="true"
                                  v-if="item.children"
                                  :key="item.text"
                                  :to="item.to"
                                  :href="item.href"
                                  :value="item.model"
                                  @click="route(item)"
                                  no-action
                    >
                        <template v-slot:activator>
                            <v-list-item-content :to="item.to"
                            >
                                <v-list-item-title :to="item.to"
                                >
                                    {{ item.text }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </template>
                        <v-list-item
                                v-for="(child, i) in item.children"
                                :key="i"
                                :to="child.to"
                        >
                            <v-list-item-content>
                                <v-list-item-title class="subtitle-2">
                                    {{ child.text }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>

                    <v-list-item
                            v-else
                            link
                            :value="item.model"
                            :key="item.text"
                            :to="item.to"
                            :href="item.href"
                            color="#4527A0"
                            @click="deselectAll"
                    >
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
                :clipped-left="$vuetify.breakpoint.lgAndUp"
                app
                color="#f3f3f3"
                height="84"
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
            <v-toolbar-title
                    style="width: 300px"
                    class="ml-0 pl-4"
            >
                <span class="logo">
                <v-img max-width="173px" max-height="40px" min-width="170px" min-height="32px"
                       src="/img/icons/msa_school.png"
                       onclick="window.location.href='/'"></v-img>
                </span>
            </v-toolbar-title>
            <v-tabs
                    class="tab-display"
                    v-model="tab"
                    color="#673ab7"
            >
                <v-tab
                        v-for="item in tabItems"
                        :key="item.name"
                        :to="item.to"
                >
                    {{ item.name }}
                </v-tab>
            </v-tabs>
            <v-spacer/>
            <v-img style="margin-top: 5px;" max-width="100px" width="100px" src="/img/icons/logo_uengine.png"></v-img>
        </v-app-bar>
        <v-content>
            <v-container
                    fluid
                    v-if="reload"
            >
                <router-view :key="$route.fullPath" v-model="lists"></router-view>
            </v-container>
        </v-content>

        <v-footer inset>
            Copyright © <span>uEngine.</span> All rights reserved.
        </v-footer>
    </v-app>
</template>

<script>
    export default {

        props: {
            source: String,
        },
        beforeUpdate() {
            var me = this
            var id = this.$route.params.menu1

        },
        created() {
            var me = this
            const templateFiles = require.context('../public/contents', true)

            var tempRootPathList = []
            templateFiles.keys().forEach(function (tempFiles) {
                if (tempFiles.includes('.md')) {
                    var tempFileStructure = tempFiles.replace('./', '').split('/')
                    // 최상위 메뉴 초기화
                    if (!tempRootPathList[tempFileStructure[0].split('_')[1]]) {
                        // var numberTmp = []
                        // numberTmp[tempFileStructure[0].split('_')[1]] =
                        me.menuNumber[tempFileStructure[0].split('_')[1]] = tempFileStructure[0].split('_')[0]
                        tempRootPathList[tempFileStructure[0].split('_')[1]] = []
                    }

                    // 최상위 메뉴에 넣어줌
                    if (tempFileStructure[1].includes('.md')) {
                        tempRootPathList[tempFileStructure[0].split('_')[1]].push(tempFileStructure[1])
                    } else {
                        // 2단계 메뉴 초기화
                        if (!tempRootPathList[tempFileStructure[0].split('_')[1]][tempFileStructure[1]]) {
                            tempRootPathList[tempFileStructure[0].split('_')[1]][tempFileStructure[1]] = []
                        }

                        // 2단계 메뉴 넣어줌
                        tempRootPathList[tempFileStructure[0].split('_')[1]][tempFileStructure[1]].push(tempFileStructure[2])

                    }
                }
            })

            this.tempRootPathList = tempRootPathList

        },
        computed: {
            lists: function () {
                var me = this
                return {menuNumber: me.menuNumber, items: me.items}
            },
            items: function () {
                var id = this.$route.params.menu1
                if (this.$route.params.menu1) {
                    var fileList = this.tempRootPathList[id];
                    var result = [];

                    if (fileList) {
                        var keys = Object.keys(fileList);

                        keys.forEach(function (key, idx) {
                            if (fileList[key] instanceof Array) {

                                fileList[key].forEach(function (data) {
                                    if (!data.includes('index')) {
                                        var valid = false
                                        result.some(function (validSubMenu) {
                                            if (validSubMenu.text == key) {
                                                valid = true
                                                return;
                                            }
                                        })
                                        var text = data.split('_')[1].replace('.md', '');
                                        if (text.includes('---')) {
                                            text = text.replace('---', '&')
                                        } else if (text.includes('--')) {
                                            text = text.replace('--', '/')
                                        }

                                        if (!valid) {
                                            if(idx == 0) {
                                                var ttt = {
                                                    text: key,
                                                    route: key,
                                                    model: true,
                                                    folder: true,
                                                    to: `/${id}`,
                                                    children: [
                                                        {
                                                            text: text,
                                                            to: `/${id}/${key}/${data.replace('.md', '')}`
                                                        }
                                                    ],
                                                }
                                            } else {
                                                var ttt = {
                                                    text: key,
                                                    route: key,
                                                    model: false,
                                                    folder: true,
                                                    to: `/${id}`,
                                                    children: [
                                                        {
                                                            text: text,
                                                            to: `/${id}/${key}/${data.replace('.md', '')}`
                                                        }
                                                    ],
                                                }
                                            }

                                            result.push(ttt)
                                        } else {
                                            var ttt = {
                                                text: text,
                                                to: `/${id}/${key}/${data.replace('.md', '')}`
                                            }

                                            result.forEach(function (subData, idx) {
                                                if (subData.route == key) {
                                                    result[idx].children.push(ttt)
                                                }

                                            })
                                        }
                                    }
                                })
                            } else {
                                // 서브메뉴 없을 때
                                var tmp = {
                                    text: fileList[key].replace('.md', ''),
                                    to: '/' + id + '/' + fileList[key].replace('.md', '').trim()
                                }
                                result.push(tmp)

                            }
                        })

                        result.sort(function (a, b) {
                            return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                        })

                        result.forEach(function (item) {
                            item.text = item.text.split('_')[1]
                        })
                    }


                    return result
                }

            },
            tabItems: function () {
                // var id = this.$route.params.menu1
                var result = [];
                Object.keys(this.tempRootPathList).forEach(function (item) {
                    console.log(item)
                    if (item == '소개') {
                        let tmp = {name: item, to: `/${item}/01_MSA School 소개`, model: true};
                        result.push(tmp)
                    } else if (item == '계획단계') {
                        let tmp = {name: item, to: `/${item}/01_최종목표`, model: true};
                        result.push(tmp)
                    } else if (item == '설계--구현--운영단계') {
                        console.log("item")
                        let tmp = {name: item.replace(/--/g,"/"), to: `/${item}/02_분석/01_관심사 분리`, model: true};
                        result.push(tmp)
                    } else if (item == '관련자료') {
                        let tmp = {name: item, to: `/${item}/01_MSA 방법론/index`, model: true};
                        result.push(tmp)
                    } else if (item == '커뮤니티') {
                        let tmp = {name: item, to: `/${item}/01_이벤트 및 공지`, model: true};
                        result.push(tmp)
                    }

                })
                return result
            }
        },
        data: () => ({
            dialog: false,
            drawer: null,
            tab: {},
            test: '',
            tempRootPathList: [],
            reload: true,
            menuNumber: [],
            refresh: true
        }),
        methods: {
            route(to) {
                var me = this

                to.model = true
                this.$router.push({path: to.to + '/' + to.route + '/index'})

                this.$nextTick(function () {
                    to.model = true
                })
            },
            deselectAll() {
                var me = this;

                me.items.forEach(function (item) {
                    if (item.model)
                        item.model = false;
                })
            }
        },
        watch: {
            '$route'(to, from) {
                var me = this
                console.log(to, from)
                console.log((to.params.menu1 != from.params.menu1))
                console.log(
                    (to.params.menu1 == '소개')
                )
                console.log(to.params.pathMatch)
                console.log((to.params.pathMatch == 'MSA School 소개'))
                if ((to.params.menu1 != from.params.menu1) && (to.params.menu1 == '소개') && (to.params.pathMatch == 'MSA School 소개')) {
                    // location.reload();
                }
            }
        }

    }
</script>
<style>
</style>

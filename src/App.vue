<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                hide-overlay
                app
                clipped
                color="#f5f5f5"
        >
<!--            <v-btn @click="domainList()">list</v-btn>-->
            <v-list shaped v-if="window.width >= 1100">
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
                            v-else-if="item.to=='/소개/01_MSA School 소개'"
                            @click="refreshPage()"
                            v-model="item.model"
                            :key="item.text"
                            color="#4527A0"
                    >
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                            v-else
                            link
                            v-model="item.model"
                            :to="item.to"
                            :key="item.text"
                            color="#4527A0"
                            @click="deselectAll()"
                    >
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
            <v-list expand
                    shaped v-else-if="window.width < 1101">

                <template v-for="item in tabItems">
                    <v-list-group mandatory
                                  :eager="true"
                                  v-if="item"
                                  :key="item.name"
                                  v-model="item.model"
                                  no-action
                                  @click.native="getTabItemList(item.name)"
                    >
                        <template v-slot:activator>
                            <v-list-item-content :to="item.to"
                            >
                                <v-list-item-title :to="item.to"
                                >
                                    {{ item.name }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </template>
                        <template v-for="moitem in mobileItem">
                            <v-list-group mandatory
                                          :eager="true"
                                          v-if="moitem.children"
                                          :key="moitem.text"
                                          :to="moitem.to"
                                          v-model="moitem.model"
                                          @click="route(moitem)"
                                          no-action
                                          style="margin-bottom: 0px;"
                            >
                                <template v-slot:activator>
                                    <v-list-item-content :to="moitem.to"
                                                         style="margin-left: -30px;"
                                    >
                                        <v-list-item-title :to="moitem.to"
                                        >
                                            {{ moitem.text }}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item
                                        v-for="(mochild, i) in moitem.children"
                                        :key="i"
                                        :to="mochild.to"

                                >
                                    <v-list-item-content>
                                        <v-list-item-title class="subtitle-2">
                                            {{ mochild.text }}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-group>

                            <v-list-item
                                    v-else
                                    link
                                    v-model="moitem.model"
                                    :key="moitem.text"
                                    :to="moitem.to"
                                    :href="moitem.href"
                                    color="#4527A0"
                                    @click="deselectAll"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{ moitem.text }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-list-group>
                    <v-list-item
                            v-else
                            link
                            :value.sync="item.model"
                            :key="item.name"
                            :to="item.to"
                            :href="item.href"
                            color="#4527A0"
                            style="padding-left: 20px;"
                            @click="deselectAll"
                    >
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item.name }}
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
                        v-for="(item, key) in tabItems"
                        :key="item.id"
                        @click="locatePage(item)"
                >
                    {{ item.name }}
                </v-tab>
            </v-tabs>
            <v-spacer/>
            <v-img max-width="73px" max-height="100px" src="/img/icons/logo_uengine_color.png"
                   onclick="window.open('http://uengine.org','_blank')"></v-img>
        </v-app-bar>
        <v-content>
            <v-container
                    fluid
                    v-if="reload"
            >
                <router-view :key="$route.fullPath" v-model="lists" :window="window"></router-view>
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
        mounted() {
            var me = this

        },
        created() {
            var me = this
            window.addEventListener('resize', this.handleResize);
            this.handleResize();

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

            this.tempRootPathList = tempRootPathList;
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize);
        },
        computed: {
            lists: function () {
                var me = this
                return {menuNumber: me.menuNumber, items: me.items}
            },
            items: function () {
                var id = this.$route.params.menu1;
                var me = this
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
                                            text = text.replace(/---/g, '&')
                                        } else if (text.includes('--')) {
                                            text = text.replace(/--/g, '/')
                                        }

                                        if (!valid) {
                                            if (me.$route.params.menu2 == key) {
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
                                                to: `/${id}/${key}/${data.replace('.md', '')}`,
                                                model: false
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
                                    to: '/' + id + '/' + fileList[key].replace('.md', '').trim(),
                                    model: false
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
                var me = this
                var modelStatus = false;
                Object.keys(this.tempRootPathList).forEach(function (item) {
                    let tmp;
                    var modelStatus;

                    if (item == '소개') {
                        tmp = {id: 1, name: item, to: `/`, model: false};
                        result.push(tmp)
                    } else if (item == '계획단계') {
                        tmp = {id: 2, name: item, to: `/${item}/01_최종목표 수립`, model: false};
                        result.push(tmp)
                    } else if (item == '설계--구현--운영단계') {
                        tmp = {id: 3, name: item.replace(/--/g, "/"), to: `/${item}/02_분석/index`, model: false};
                        result.push(tmp)
                    } else if (item == '참고자료') {
                        tmp = {id: 4, name: item, to: `/${item}/02_MSA 방법론/index`, model: false};
                        result.push(tmp)
                    } else if (item == '커뮤니티 및 교육') {
                        tmp = {id: 5, name: item, to: `/${item}/01_이벤트 및 공지`, model: false};
                        result.push(tmp)
                    }
                    if (me.$route.params.menu1.replace('/') == item) {
                        console.log(tmp.id)
                        me.tab = tmp.id - 1
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
            linkList: [],
            tempRootPathList: [],
            reload: true,
            menuNumber: [],
            refresh: true,
            window: {
                width: 0,
                height: 0
            },
            mobileItem: []
        }),
        methods: {
            refreshPage() {
                window.location.href = '/'
            },
            locatePage(item) {
                if (item.id == 1) {
                    window.location.href = '/'
                } else {
                    this.$router.push(item.to)
                }
            },
            handleResize() {
                this.window.width = window.innerWidth;
                this.window.height = window.innerHeight;
            },
            route(to) {
                var me = this
                to.model = true
                console.log(to)
                if (to.route != undefined) {
                    this.$router.push({path: to.to + '/' + to.route + '/index'})
                } else if (to.to == '/소개/01_MSA School 소개') {
                    window.location.href = '/'
                } else {
                    this.$router.push(to.to)
                }


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
            },
            domainList() {
                const templateFiles = require.context('../public/contents', true)
                var fileList = []
                var me = this
                templateFiles.keys().forEach(function (item) {
                    if (item.includes('.md')) {
                        if (item.includes('index.md')) {
                            fileList.push('/' + item.replace('index.md', '').replace('./', '').replaceAll(" ", "%20"));
                        } else {
                            fileList.push('/' + item.replace('.md', '').replace('./', '').replaceAll(" ", "%20"));
                        }
                    }
                })

                console.log(JSON.stringify(fileList))
            },
            getTabItemList(link) {
                var me = this
                var id = link
                if (link.includes('/')) {
                    id = id.replace(/\//g, "--");
                }
                var fileList = this.tempRootPathList[id];
                var result = [];
                me.tabItems.forEach(function (item) {
                    if (item.name == link) {
                        item.model = true
                    } else {
                        item.model = false
                    }
                })

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
                                        text = text.replace(/---/g, '&')
                                    } else if (text.includes('--')) {
                                        text = text.replace(/--/g, '/')
                                    }

                                    if (!valid) {
                                        if (idx == 0) {
                                            if (key.includes(me.$route.params.menu2)) {
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
                                        } else {
                                            if (key.includes(me.$route.params.menu2)) {
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

                                        }
                                        me.linkList.push(`/${id}/${key}/${data.replace('.md', '')}`);
                                        result.push(ttt)
                                    } else {
                                        var ttt = {
                                            text: text,
                                            to: `/${id}/${key}/${data.replace('.md', '')}`
                                        }
                                        me.linkList.push(ttt.to);
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
                            me.linkList.push(tmp.to);
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
                me.mobileItem = result
            }

        },
        watch: {
            '$route'(to, from) {
                var me = this
            },
            drawer: function (newVal, oldVal) {
                var me = this
                var text = me.$route.params.menu1;
                if (text.includes('--')) {
                    text = text.replace(/--/g, '/')
                }
                me.tabItems.forEach(function (item) {
                    if (text == item.name) {
                        item.model = true
                    }
                    me.getTabItemList(text)
                })
            },

        }

    }
</script>
<style>
    /*.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled)*/
    .v-application code {
        color: #000000 !important;
    }
    .v-application--is-ltr .v-list-group--no-action>.v-list-group__items>.v-list-item {
        padding-left: 15px !important
    }
</style>

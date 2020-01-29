<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                :clipped="$vuetify.breakpoint.lgAndUp"
                app
                color="#f5f5f5"
        >
            <v-list shaped>
                <template v-for="item in items">
                    <v-list-group
                            :eager="true"
                            v-if="item.children"
                            :key="item.text"
                            :to="item.to"
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
                            v-model="item.model"
                            :key="item.text"
                            :to="item.to"
                            color="primary"
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
                color="#f5f5f5"
                height="80"
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
            <v-toolbar-title
                    style="width: 300px"
                    class="ml-0 pl-4"
            >
                <v-img width="80%" src="/img/icons/msa_school.png"></v-img>
            </v-toolbar-title>
            <v-tabs
                    v-model="tab"
                    background-color="transparent"
                    color="basil"
                    style="width: 300px"
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
            this.$nextTick(function () {
                if (id == 'bizdevops') {
                    me.tab = '/bizdevops/overview'
                } else if (id == 'eventstorming') {
                    me.tab = '/resources/overview'
                } else if (id == 'cloudplatform') {
                    me.tab = '/cloudplatform/overview'
                }
            })
        },
        created() {
            var me = this
            const templateFiles = require.context('../public/contents', true)

            var tempRootPathList = []
            console.log(templateFiles.keys())
            templateFiles.keys().forEach(function (tempFiles) {
                var tempFileStructure = tempFiles.replace('./', '').split('/')
                // 최상위 메뉴 초기화
                if (!tempRootPathList[tempFileStructure[0].split('_')[1].toLowerCase()]) {
                    // var numberTmp = []
                    // numberTmp[tempFileStructure[0].split('_')[1]] =
                    me.menuNumber[tempFileStructure[0].split('_')[1].toLowerCase()] = tempFileStructure[0].split('_')[0]
                    tempRootPathList[tempFileStructure[0].split('_')[1].toLowerCase()] = []
                }

                // 최상위 메뉴에 넣어줌
                if (tempFileStructure[1].includes('.md')) {
                    tempRootPathList[tempFileStructure[0].split('_')[1].toLowerCase()].push(tempFileStructure[1])
                } else {
                    // 2단계 메뉴 초기화
                    if (!tempRootPathList[tempFileStructure[0].split('_')[1].toLowerCase()][tempFileStructure[1]]) {
                        tempRootPathList[tempFileStructure[0].split('_')[1].toLowerCase()][tempFileStructure[1]] = []
                    }

                    // 2단계 메뉴 넣어줌
                        tempRootPathList[tempFileStructure[0].split('_')[1].toLowerCase()][tempFileStructure[1]].push(tempFileStructure[2])

                }

            })

            this.tempRootPathList = tempRootPathList

        },
        computed: {
            lists: function () {
                var me = this
                return { menuNumber: me.menuNumber, items: me.items }
            },
            items: function () {
                var id = this.$route.params.menu1
                if (this.$route.params.menu1) {
                    var fileList = this.tempRootPathList[id.toLowerCase()];
                    var result = [];

                    result.push(
                        {text: '00_Overview', to: '/' + id + '/overview'}
                    )
                    if (fileList) {
                        var keys = Object.keys(fileList);

                        keys.forEach(function (key) {
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
                                        if(text.includes('-')) {
                                            text= text.replace('-', '/')
                                        }
                                        if (!valid) {
                                            var ttt = {
                                                text: key,
                                                route: key.toLowerCase(),
                                                model: false,
                                                folder: true,
                                                to: `/${id}`,
                                                children: [
                                                    {
                                                        text: text,
                                                        to: `/${id}/${key.toLowerCase()}/${data.replace('.md', '')}`
                                                    }
                                                ],
                                            }
                                            result.push(ttt)
                                        } else {
                                            var ttt = {
                                                text: text,
                                                to: `/${id}/${key.toLowerCase()}/${data.replace('.md', '')}`
                                            }

                                            result.forEach(function (subData, idx) {
                                                if (subData.route == key.toLowerCase()) {
                                                    result[idx].children.push(ttt)
                                                }

                                            })
                                        }
                                    }
                                })
                            } else {
                                // 서브메뉴 없을 때
                                if(!fileList[key].includes('Overview')) {
                                    var tmp = {
                                        text: fileList[key].replace('.md', ''),
                                        to: '/' + id + '/' + fileList[key].replace('.md', '').trim()
                                    }
                                    result.push(tmp)
                                }
                            }
                        })
                    }
                    result.sort(function (a, b) {
                        return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                    })

                    result.forEach(function (item) {
                        item.text = item.text.split('_')[1]
                    })

                    return result
                }

            },
            tabItems: function () {
                // var id = this.$route.params.menu1
                var result = [];
                Object.keys(this.tempRootPathList).forEach(function (item) {
                    let tmp = {name: item, to: `/${item}/overview`, model: true}
                    result.push(tmp)
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
            menuNumber: []
        }),
        methods: {
            route(to) {
                var me = this

                to.model = true
                this.$router.push({path: to.to + '/' + to.route.toLowerCase() + '/index'})

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
        }

    }
</script>

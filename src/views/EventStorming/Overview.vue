<template>
    <v-container>
        <v-row no-gutters>
            <template>
                <div v-if="aaa" style="width: 100%" class="introduction-page">
                    <div class="hero-section">
                        <div class="container">
                            <div class="hero-section__left">
                                <h2 class="hero-section-title">험난한 MSA 구축 여정의 길라잡이</h2>
                                <!--accordion-->
                                <div class="mat-accordion accordion" id="accordion">
                                    <div class="card">
                                        <div class="card-header card-header" id="headingOne">
                                            <button type="button" class="card-header-title" data-toggle="collapse"
                                                    data-target="#collapseOne">
                                                <img src="/img/icons/img/ic-carousel-3.png"
                                                     srcset="/img/icons/img/ic-carousel-3.png 1x, /img/icons/img/ic-carousel-3@2x.png 2x, /img/icons/img/ic-carousel-3@3x.png 3x"
                                                     alt="carousel-item">
                                                <!--<i class="fa fa-plus"></i>--> 단계별 학습
                                            </button>
                                        </div>
                                        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne"
                                             data-parent="#accordion">
                                            <div class="card-body">
                                                <p>계획수립에서 운영에 이르는 각 단계별 고려 요소 및 분석/접근/실천법에 대한 체계적 학습</p>
                                                <img class="carousel-item_img"
                                                     src="/img/icons/img/introduction-1.png"
                                                     srcset="/img/icons/img/introduction-1.png 1x, /img/icons/img/introduction-1@2x.png 2x, /img/icons/img/introduction-1@3x.png 3x"
                                                     alt="carousel-item">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header card-header" id="headingTwo">
                                            <button type="button" class="card-header-title collapsed"
                                                    data-toggle="collapse"
                                                    data-target="#collapseTwo">
                                                <img src="/img/icons/img/ic-carousel-2.png"
                                                     srcset="/img/icons/img/ic-carousel-2.png 1x, /img/icons/img/ic-carousel-2@2x.png 2x, /img/icons/img/ic-carousel-2@3x.png 3x"
                                                     alt="carousel-item">
                                                <!--<i class="fa fa-plus"></i>--> MSA 지식창고
                                            </button>
                                        </div>
                                        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo"
                                             data-parent="#accordion">
                                            <div class="card-body">
                                                <p>E-커머스 예제 실전 코딩, 참고 도서, 교육 영상, MSA 개발 도구, 수행 방법론 소개</p>
                                                <img class="carousel-item_img"
                                                     src="/img/icons/img/introduction-2.png"
                                                     srcset="/img/icons/img/introduction-2.png 1x, /img/icons/img/introduction-2@2x.png 2x, /img/icons/img/introduction-2@3x.png 3x"
                                                     alt="carousel-item">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header card-header" id="headingThree">
                                            <button type="button" class="card-header-title collapsed"
                                                    data-toggle="collapse"
                                                    data-target="#collapseThree">
                                                <img src="/img/icons/img/ic-carousel-1.png"
                                                     srcset="/img/icons/img/ic-carousel-1.png 1x, /img/icons/img/ic-carousel-1@2x.png 2x, /img/icons/img/ic-carousel-1@3x.png 3x"
                                                     alt="carousel-item">
                                                <!--<i class="fa fa-plus"></i>--> 다양한 교육과정
                                            </button>
                                        </div>
                                        <div id="collapseThree" class="collapse" aria-labelledby="headingThree"
                                             data-parent="#accordion">
                                            <div class="card-body">
                                                <p>주제 영역별 4개 과정, 역할별 3개 과정, 기업별 희망 주제에 따른 맞춤 교육</p>
                                                <img class="carousel-item_img"
                                                     src="/img/icons/img/introduction-3.png"
                                                     srcset="/img/icons/img/introduction-3.png 1x, /img/icons/img/introduction-3@2x.png 2x, /img/icons/img/introduction-3@3x.png 3x"
                                                     alt="carousel-item">
                                            </div>
                                        </div>
                                    </div>
                                </div><!--//accordion-->
                            </div><!--//left-->
                            <div class="hero-section__right">
                                <div class="variable slider">
                                    <div class="carousel-item item">
                                        <div class="carousel-item_inner">
                                            <img class="carousel-item_img"
                                                 src="/img/icons/img/introduction-1.png"
                                                 srcset="/img/icons/img/introduction-1.png 1x, /img/icons/img/introduction-1@2x.png 2x, /img/icons/img/introduction-1@3x.png 3x"
                                                 alt="carousel-item">
                                            <div style="margin-top: 244px;">
                                                <p class="carousel-item_line1">계획에서 운영까지 End-to-End 학습을 위한 단계별 효율적인 실천법 제시</p>
                                                <!--p class="carousel-item_line2">체계적 학습</p-->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="carousel-item item">
                                        <div class="carousel-item_inner">
                                            <img class="carousel-item_img"
                                                 src="/img/icons/img/introduction-2.png"
                                                 srcset="/img/icons/img/introduction-2.png 1x, /img/icons/img/introduction-2@2x.png 2x, /img/icons/img/introduction-2@3x.png 3x"
                                                 alt="carousel-item">
                                            <div style="margin-top: 304px;">
                                                <p class="carousel-item_line1">실행 가능한 E-Commerce 실전 코드 중심의 디자인 패턴, 구현 전략, 적용 사례 소개</p>
                                                <!--p class="carousel-item_line2">and release Design Fixation</p-->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="carousel-item item">
                                        <div class="carousel-item_inner">
                                            <img class="carousel-item_img"
                                                 src="/img/icons/img/introduction-3.png"
                                                 srcset="/img/icons/img/introduction-3.png 1x, /img/icons/img/introduction-3@2x.png 2x, /img/icons/img/introduction-3@3x.png 3x"
                                                 alt="carousel-item">
                                            <div style="margin-top: 350px;">
                                                <p class="carousel-item_line1" style="max-width: 424px;">주제 영역별 4개 과정, 담당 역할별 3개 과정, 교육신청을 통한 맞춤 교육 실시</p>
                                                <!--p class="carousel-item_line2" style="max-width: 147px;">and test it
                                                    fast</p-->
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div><!--//right-->
                        </div>
                    </div>
                </div>
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
                    <v-row v-if="tree">
                        <v-col cols="12">
                            <v-card outlined class="margin-test" v-for="(item,idx) in items" :to="item.to">
                                <v-list-item three-line style="padding-left: 0">
                                    <v-img
                                            :src="imgSrcTree(item)"
                                            height="120px"
                                            max-width="120px"
                                            style="margin-right: 20px;"
                                    ></v-img>
                                    <v-list-item-content>
                                        <div class="overline mb-1">Content {{idx +1}}</div>
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
                    <!--<v-divider></v-divider>-->
                    <div class="em-title col">Explore More</div>
                    <v-row v-if="tree==true" align="center" justify="center" style="max-width:1050px;margin:0 auto;">
                        <v-col v-for="(item,idx) in items"
                               style="margin:0px;overflow-x:hidden;"
                               cols="12"
                               sm="3"
                        >
                            <router-link style="text-decoration:none" v-if="item.children" :to="item.route +'/index'">
                                <v-list-item-avatar
                                        tile
                                        width="100%"
                                        height="auto"
                                >
                                    <img :src="imgSrcTree(item)" class="img">
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
                                    <img :src="imgSrcTree(item)" class="img">

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
                    <v-row v-else align="center" justify="center" style="max-width:1050px;margin:0 auto;">
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
                                <v-divider></v-divider>

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
<!--                                    <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully-->
<!--                                    </v-list-item-subtitle>-->
                                </v-list-item-content>
                            </router-link>
                        </v-col>

                    </v-row>
                    <v-col cols="6">
                        <div id="disqus_thread"></div>
                    </v-col>
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
                items: [],
                aaa: false,
                tree : false
            }
        },
        methods: {
            imgSrc(item) {
                var me = this
                var menu1 = this.$route.params.menu1;
                var menu2 = this.$route.params.menu2;
                if (item.route) {
                    var tmp = item.to.concat("/" + item.route).split('/')
                } else {
                    var tmp = item.to.split('/')
                }

                var src = '/contents';

                for (var i = 1; i < tmp.length; i++) {
                    if (i == 1) {
                        src = src.concat('/' + this.value['menuNumber'][this.$route.params.menu1] + '_' + menu1.substring(0, 1).toUpperCase() + menu1.substring(1))
                    } else {
                        var tmpSrc = ''
                        if (i == tmp.length - 1) {
                            var tmpSplit = tmp[i].split('_')
                            for (var y = 0; y < tmpSplit.length; y++) {
                                // console.log(tmpSplit)
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
                // console.log(src)
                src = src.concat('.png')
                return src
            },
            imgSrcTree(item) {
                var me = this
                var menu1 = this.$route.params.menu1;
                var menu2 = this.$route.params.pathMatch;

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
        created() {
            var me = this
            let menu1 = this.$route.params.menu1;
            let menu2 = this.$route.params.pathMatch;

            if (menu1 == "소개") {
                me.aaa = true
                // console.log("ini")
            }

        },
        mounted() {
            (function () { // DON'T EDIT BELOW THIS LINE
                var d = document, s = d.createElement('script');
                s.src = 'https://msaschool-io.disqus.com/embed.js';
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
            })();

            var me = this;
            let menu1 = this.$route.params.menu1;
            let menu2 = this.$route.params.pathMatch;
            menu2 = '01_' + menu2

            if(menu2.includes("/index")) {
                var tmpMenu2 = menu2.replace("/index", "")
                this.value.items.forEach(function (item) {
                    if (item.route == tmpMenu2) {
                        item.children.forEach(function (listItem) {
                            me.items.push(listItem)
                        })
                    }
                })
            } else {
                this.value.items.forEach(function (item) {
                    if (item.to.includes(menu1) && !item.to.includes('overview')) {
                        me.items.push(item)
                    }
                })
            }


            this.$http.get(`/contents/${this.value['menuNumber'][this.$route.params.menu1]}_${menu1.substring(0, 1).toUpperCase() + menu1.substring(1)}/${menu2}.md`).then(function (result) {
                me.$nextTick(function () {
                    me.md = result.data
                })
            })

            me.$nextTick(function () {
                $(document).on('ready', function () {
                    $(".variable").slick({
                        dots: true,
                        infinite: true,
                        variableWidth: true
                    });
                });

                $(document).ready(function () {
                    // Add minus icon for collapse element which is open by default
                    $(".collapse.show").each(function () {
                        $(this).prev(".card-header").find(".fa").addClass("fa-minus").removeClass("fa-plus");
                    });

                    // Toggle plus minus icon on show hide of collapse element
                    $(".collapse").on('show.bs.collapse', function () {
                        $(this).prev(".card-header").find(".fa").removeClass("fa-plus").addClass("fa-minus");
                    }).on('hide.bs.collapse', function () {
                        $(this).prev(".card-header").find(".fa").removeClass("fa-minus").addClass("fa-plus");
                    });
                });
            })
        }
    }
</script>

<style scoped>
    li a {
        text-decoration: none;
    }
    .margin-test {
        margin-bottom: 10px;
    }
</style>

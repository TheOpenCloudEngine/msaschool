const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    pluginOptions: {
        prerenderSpa: {
            staticDir: path.join(__dirname, 'public'),
            renderRoutes: [
                "/01_소개/01_MSA%20School%20소개",
                "/01_소개/02_예제%20도메인",
                "/01_소개/03_사용%20플랫폼",
                "/01_소개/04_예제%20애플리케이션%20둘러보기",
                "/01_소개/05_관련%20리소스",
                "/01_소개/06_유틸리티%20및%20도구",
                "/02_계획단계/01_최종목표%20수립",
                "/02_계획단계/02_프로젝트%20구현전략/01_단계별%20수행목표",
                "/02_계획단계/02_프로젝트%20구현전략/02_세분화%20수준",
                "/02_계획단계/02_프로젝트%20구현전략/03_구현%20패턴",
                "/02_계획단계/02_프로젝트%20구현전략/",
                "/02_계획단계/03_품질관리%20계획/01_시스템%20보안",
                "/02_계획단계/03_품질관리%20계획/02_성능%20확보%20방안",
                "/02_계획단계/03_품질관리%20계획/03_테스트%20방안",
                "/02_계획단계/03_품질관리%20계획/",
                "/03_설계--구현--운영단계/02_분석/01_관심사%20분리%20필요성%20분석",
                "/03_설계--구현--운영단계/02_분석/02_애자일%20필요성%20분석",
                "/03_설계--구현--운영단계/02_분석/03_레가시%20모노리식의%20한계점",
                "/03_설계--구현--운영단계/02_분석/",
                "/03_설계--구현--운영단계/03_설계/01_접근법과%20분석패턴",
                "/03_설계--구현--운영단계/03_설계/02_도메인%20주도%20설계",
                "/03_설계--구현--운영단계/03_설계/03_이벤트스토밍",
                "/03_설계--구현--운영단계/03_설계/04_서비스%20서열과%20역학관계",
                "/03_설계--구현--운영단계/03_설계/05_아키텍처%20설계",
                "/03_설계--구현--운영단계/03_설계/06_서비스%20디스커버리%20패턴",
                "/03_설계--구현--운영단계/03_설계/07_마이크로서비스%20보안설계",
                "/03_설계--구현--운영단계/03_설계/08_프론트-엔드%20설계",
                "/03_설계--구현--운영단계/03_설계/",
                "/03_설계--구현--운영단계/04_구현/01_사전학습",
                "/03_설계--구현--운영단계/04_구현/02_CNA%20구현%20프레임워크",
                "/03_설계--구현--운영단계/04_구현/03_일반적인%20CNA%20구현",
                "/03_설계--구현--운영단계/04_구현/04_도구(MSAEz)기반%20CNA구현",
                "/03_설계--구현--운영단계/04_구현/05_모노리스%20to%20MSA전환",
                "/03_설계--구현--운영단계/04_구현/06_게이트웨이(Gateway)",
                "/03_설계--구현--운영단계/04_구현/10_이벤트기반%20메세지%20채널",
                "/03_설계--구현--운영단계/04_구현/",
                "/03_설계--구현--운영단계/05_통합/01_Front-End에서의%20통합",
                "/03_설계--구현--운영단계/05_통합/02_동기호출에%20의한%20통합",
                "/03_설계--구현--운영단계/05_통합/03_Event-driven%20기반%20통합",
                "/03_설계--구현--운영단계/05_통합/05_이벤추얼%20트랜잭션---Saga",
                "/03_설계--구현--운영단계/05_통합/06_데이터%20프로젝션",
                "/03_설계--구현--운영단계/05_통합/07_CQRS",
                "/03_설계--구현--운영단계/05_통합/",
                "/03_설계--구현--운영단계/06_배포/01_지속적인%20통합--배포",
                "/03_설계--구현--운영단계/06_배포/02_파이프라인(Pipeline)",
                "/03_설계--구현--운영단계/06_배포/03_배포%20전략",
                "/03_설계--구현--운영단계/06_배포/06_실습%20스크립트",
                "/03_설계--구현--운영단계/06_배포/",
                "/03_설계--구현--운영단계/07_운영/01_마이크로서비스%20모니터링",
                "/03_설계--구현--운영단계/07_운영/04_컨테이너%20오케스트레이션",
                "/03_설계--구현--운영단계/07_운영/",
                "/03_설계--구현--운영단계/08_참고자료/01_실습중%20오류%20대처",
                "/04_참고자료/02_MSA%20방법론/01_IBM%20Garage%20for%20Cloud",
                "/04_참고자료/02_MSA%20방법론/02_Pivotal%20AppTx",
                "/04_참고자료/02_MSA%20방법론/",
                "/04_참고자료/03_MSA도구%20-%20MSAEasy/01_MSAEasy%20사용법",
                "/04_참고자료/03_MSA도구%20-%20MSAEasy/02_커스텀%20템플릿%20설계",
                "/04_참고자료/04_MSA%20전환전략/01_전환대상%20식별",
                "/04_참고자료/04_MSA%20전환전략/02_세부%20평가지표",
                "/04_참고자료/04_MSA%20전환전략/03_전환방식%20선정",
                "/04_참고자료/04_MSA%20전환전략/04_전환이슈%20및%20솔루션",
                "/04_참고자료/04_MSA%20전환전략/",
                "/04_참고자료/05_MSA%20Outer%20아키텍처/02_API%20Gateway",
                "/04_참고자료/05_MSA%20Outer%20아키텍처/03_Service%20Mesh",
                "/04_참고자료/05_MSA%20Outer%20아키텍처/04_Container%20Management",
                "/04_참고자료/05_MSA%20Outer%20아키텍처/05_Backing%20Service",
                "/04_참고자료/05_MSA%20Outer%20아키텍처/06_Telemetry",
                "/04_참고자료/05_MSA%20Outer%20아키텍처/",
                "/04_참고자료/06_부가자료/01_참고%20도서",
                "/04_참고자료/06_부가자료/02_교육%20영상",
                "/04_참고자료/06_부가자료/03_MSA%20블로그",
                "/04_참고자료/06_부가자료/04_샘플%20코드",
                "/04_참고자료/06_부가자료/",
                "/05_커뮤니티%20및%20교육/01_이벤트%20및%20공지",
                "/05_커뮤니티%20및%20교육/02_MSA%20교육과정",
                "/05_커뮤니티%20및%20교육/03_커리큘럼%20소개/01_액터별%20교육",
                "/05_커뮤니티%20및%20교육/03_커리큘럼%20소개/02_주제별%20교육",
                "/05_커뮤니티%20및%20교육/04_교육상담%20및%20신청",
                "/05_커뮤니티%20및%20교육/05_교육%20수강기관"
            ],
            minify: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                decodeEntities: true,
                keepClosingSlash: true,
                sortAttributes: true
            },
            renderer: new PrerenderSPAPlugin.PuppeteerRenderer({
                headless: false,
                renderAfterElementExists: '#app'
            })
        }
    }
}


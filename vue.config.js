const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var webpack = require('webpack')

module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],

    pluginOptions: {
        prerenderSpa: {
            registry: undefined,
            renderRoutes: [
                '/',
                '/introduction/01_MSA%20School%20%EC%9D%B4%EB%9E%80',
                '/introduction/02_FAQs',
                '/planning/01_MSA%20%EC%B5%9C%EC%A2%85%EB%AA%A9%ED%91%9C',
                '/planning/02_msa%20%EC%A0%81%EC%9A%A9%EA%B3%84%ED%9A%8D/index',
                '/planning/02_msa%20%EC%A0%81%EC%9A%A9%EA%B3%84%ED%9A%8D/01_MSA%20%EC%84%B1%EC%88%99%EB%8F%84%EB%A0%88%EB%B2%A8',
                '/planning/02_msa%20%EC%A0%81%EC%9A%A9%EA%B3%84%ED%9A%8D/02_MSA%20%EC%84%B8%EB%B6%84%ED%99%94%EC%88%98%EC%A4%80',
                '/planning/03_msa%20%EC%A0%84%ED%99%98%EA%B3%84%ED%9A%8D/index',
                '/planning/03_msa%20%EC%A0%84%ED%99%98%EA%B3%84%ED%9A%8D/01_%EC%A0%84%ED%99%98%EB%8C%80%EC%83%81%20%EC%8B%9D%EB%B3%84',
                '/planning/03_msa%20%EC%A0%84%ED%99%98%EA%B3%84%ED%9A%8D/02_%EC%84%B8%EB%B6%80%20%ED%8F%89%EA%B0%80%EC%A7%80%ED%91%9C',
                '/planning/03_msa%20%EC%A0%84%ED%99%98%EA%B3%84%ED%9A%8D/03_%EC%A0%84%ED%99%98%EB%B0%A9%EC%8B%9D%20%EC%84%A0%EC%A0%95',
                '/planning/03_msa%20%EC%A0%84%ED%99%98%EA%B3%84%ED%9A%8D/04_%EC%A0%81%EC%9A%A9%EC%A0%84%EC%88%A0%20%EC%88%98%EB%A6%BD',
                '/planning/04_%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EA%B3%84%ED%9A%8D',
                '/bizdevops/01_BizDevOps%20%EA%B0%9C%EC%9A%94',
                '/bizdevops/02_analysis/index',
                '/bizdevops/02_analysis/01_%EA%B4%80%EC%8B%AC%EC%82%AC%20%EB%B6%84%EB%A6%AC',
                '/bizdevops/02_analysis/02_%EC%97%90%EC%9E%90%EC%9D%BC%20%ED%99%98%EA%B2%BD%EB%B6%84%EC%84%9D',
                '/bizdevops/02_analysis/03_%EB%AA%A8%EB%85%B8%EB%A6%AC%EC%8B%9D%EC%9D%98%20%ED%95%9C%EA%B3%84',
                '/bizdevops/02_analysis/04_%EC%A0%91%EA%B7%BC%EB%B2%95%EA%B3%BC%20%EB%B6%84%EC%84%9D%ED%8C%A8%ED%84%B4',
                '/bizdevops/02_analysis/05_DDD--%EB%8F%84%EB%A9%94%EC%9D%B8%EB%AA%A8%EB%8D%B8',
                '/bizdevops/03_design/index',
                '/bizdevops/03_design/01_EventStorming',
                '/bizdevops/03_design/02_EventStorming%20%EC%84%A4%EA%B3%84%EB%8F%84%EA%B5%AC',
                '/bizdevops/03_design/03_%EB%8F%84%EA%B5%AC%EB%A5%BC%20%ED%86%B5%ED%95%9C%20MSA%20%EC%84%A4%EA%B3%84',
                '/bizdevops/03_design/04_CI-CD%20%EC%84%A4%EA%B3%84',
                '/bizdevops/03_design/05_%EC%BB%A4%EC%8A%A4%ED%85%80%20%ED%85%9C%ED%94%8C%EB%A6%BF%20%EC%84%A4%EA%B3%84',
                '/bizdevops/04_implementation/index',
                '/bizdevops/04_implementation/01_Hexagonal%20Architecture',
                '/bizdevops/04_implementation/02_MSA%20Chassis',
                '/bizdevops/04_implementation/03_%EC%8A%A4%ED%8B%B0%ED%82%A4%20%EB%85%B8%ED%8A%B8%EB%B3%84%20%EA%B5%AC%ED%98%84%EB%B0%A9%EC%95%88',
                '/bizdevops/04_implementation/04_%EB%AA%A8%EB%85%B8%EB%A6%AC%EC%8A%A4%20%EC%A0%84%ED%99%98%EC%9D%B4%EC%8A%88',
                '/bizdevops/04_implementation/05_%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%20%EC%84%9C%EB%B9%84%EC%8A%A4',
                '/bizdevops/04_implementation/06_%EB%B0%B1%EC%97%94%EB%93%9C%20%EC%84%9C%EB%B9%84%EC%8A%A4',
                '/bizdevops/05_integration/index',
                '/bizdevops/05_integration/01_%ED%86%B5%ED%95%A9%20%ED%8C%A8%ED%84%B4',
                '/bizdevops/05_integration/02_%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98--Saga',
                '/bizdevops/05_integration/03_Data%20Projection',
                '/bizdevops/05_integration/04_CQRS',
                '/bizdevops/06_deployment/index',
                '/bizdevops/06_deployment/01_CI-CD',
                '/bizdevops/06_deployment/02_%ED%8C%8C%EC%9D%B4%ED%94%84%EB%9D%BC%EC%9D%B8',
                '/bizdevops/06_deployment/03_%EB%B0%B0%ED%8F%AC%EC%A0%84%EB%9E%B5',
                '/bizdevops/07_operation/index',
                '/bizdevops/07_operation/01_Operation%20%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90',
                '/bizdevops/07_operation/02_API%20Gateway',
                '/bizdevops/07_operation/03_Service%20Mesh',
                '/bizdevops/07_operation/04_Container%20Management',
                '/bizdevops/07_operation/05_Backing%20Service',
                '/bizdevops/07_operation/06_Telemetry',
                '/bizdevops/08_cloud%20platform/index',
                '/bizdevops/08_cloud%20platform/01_Google%20Cloud%20Platform',
                '/bizdevops/08_cloud%20platform/02_MS%20Azure',
                '/library/02_msa%20%EB%B0%A9%EB%B2%95%EB%A1%A0/index',
                '/library/02_msa%20%EB%B0%A9%EB%B2%95%EB%A1%A0/01_IBM%20Garage%20for%20Cloud',
                '/library/02_msa%20%EB%B0%A9%EB%B2%95%EB%A1%A0/02_Pivotal%20AppTx',
                '/library/03_msa%20%EB%A8%B8%ED%84%B0%EB%A6%AC%EC%96%BC/index',
                '/library/03_msa%20%EB%A8%B8%ED%84%B0%EB%A6%AC%EC%96%BC/01_%EC%83%98%ED%94%8C%20%EC%BD%94%EB%93%9C',
                '/library/03_msa%20%EB%A8%B8%ED%84%B0%EB%A6%AC%EC%96%BC/02_%EA%B5%90%EC%9C%A1%20%EC%98%81%EC%83%81',
                '/library/03_msa%20%EB%A8%B8%ED%84%B0%EB%A6%AC%EC%96%BC/03_MSA%20%EB%B8%94%EB%A1%9C%EA%B7%B8',
                '/library/03_msa%20%EB%A8%B8%ED%84%B0%EB%A6%AC%EC%96%BC/04_%EC%B0%B8%EA%B3%A0%20%EB%8F%84%EC%84%9C',
                '/community/01_%EC%9D%B4%EB%B2%A4%ED%8A%B8%20%EB%B0%8F%20%EA%B3%B5%EC%A7%80',
                '/community/02_MSA%20%EA%B5%90%EC%9C%A1',
                '/community/03_%EC%95%A1%ED%84%B0%EB%B3%84%20%EA%B5%90%EC%9C%A1/index',
                '/community/03_%EC%95%A1%ED%84%B0%EB%B3%84%20%EA%B5%90%EC%9C%A1/01_%EC%95%A1%ED%84%B0%EB%B3%84%20%EA%B5%90%EC%9C%A1',
                '/community/03_%EC%95%A1%ED%84%B0%EB%B3%84%20%EA%B5%90%EC%9C%A1/02_MSA%20%EC%A3%BC%EC%A0%9C%EB%B3%84%20%EA%B5%90%EC%9C%A1',
                '/community/04_%EA%B5%90%EC%9C%A1%EC%83%81%EB%8B%B4%20%EB%B0%8F%20%EC%8B%A0%EC%B2%AD',
                '/community/05_%EA%B5%90%EC%9C%A1%20%EC%88%98%EA%B0%95%EA%B8%B0%EA%B4%80'
            ],
            useRenderEvent: true,
            headless: true,
            onlyProduction: true,
            postProcess: route => {
                // Defer scripts and tell Vue it's been server rendered to trigger hydration
                route.html = route.html
                    .replace(/<script (.*?)>/g, '<script $1 defer>')
                    .replace('id="app"', 'id="app" data-server-rendered="true"');
                return route;
            }
        }
    }
}


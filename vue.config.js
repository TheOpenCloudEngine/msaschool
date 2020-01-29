const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var webpack = require('webpack')

module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],

}
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new HtmlWebpackPlugin({
            title: 'PRODUCTION prerender-spa-plugin',
            template: 'index.html',
            filename: path.resolve(__dirname, 'dist/index.html'),
            favicon: 'favicon.ico'
        }),
        new PrerenderSPAPlugin({
            staticDir: path.join(__dirname, 'dist'),
            routes: [ '/', '/about', '/contact' ],

            renderer: new Renderer({
                inject: {
                    foo: 'bar'
                },
                headless: true,
                renderAfterDocumentEvent: 'render-event'
            })
        })
    ])
}

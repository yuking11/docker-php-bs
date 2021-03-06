const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  stats: {
    colors: true,
  },
  mode: process.env.NODE_ENV,
  // developmentモードのときにソースマップを出力する
  devtool: process.env.NODE_ENV === 'development' ? 'source-map' : 'none',
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: {
    app: path.resolve(__dirname, './src/scss/app.scss'),
    app: path.resolve(__dirname, './src/js/app.js')
  },
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: path.resolve(__dirname, './app/assets/'),
    // 出力ファイル名
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      /**
       * JSの設定
       */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            // Babel を利用する
            loader: 'babel-loader',
            // Babel のオプションを指定する
            options: {
              presets: [
                [
                  // env を指定することで、ES2018 を ES5 に変換
                  '@babel/preset-env',
                  {
                    // サポートするブラウザ、この設定に応じて、必要な polyfill のみが import される
                    // targets: {
                    //   edge: '13'
                    // },
                    // 必要な polyfill のみを import させたい場合、'usage'を指定する（必須）
                    useBuiltIns: 'usage',
                    // polyfill を利用する core-js のバージョンを指定する（指定しないとバージョン2が利用され警告が出力される）
                    corejs: 3,
                    // trueにすると利用しているポリフィルなどの情報が出力される
                    // polyfill が import されているかどうかを確認するためのものなので必須ではない
                    debug: process.env.NODE_ENV === 'development'
                  }
                ]
              ]
            }
          }
        ]
      },
      /**
       * eslintの設定
       */
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      /**
       * scssの設定
       */
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        // Sassファイルの読み込みとコンパイル
        use: [
          // javascriptとしてバンドルせず css として出力する
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          // CSSをバンドルするための機能
          {
            loader: 'css-loader',
            options: {
              // CSS内のurl()メソッドの取り込みを禁止する
              url: false,
              // ソースマップの利用有無
              sourceMap: process.env.NODE_ENV === 'development',
              // 0 => no loaders (default)
              // 1 => postcss-loader
              // 2 => postcss-loader, sass-loader
              importLoaders: 2
            },
          },
          // PostCSSのための設定
          {
            loader: 'postcss-loader',
            options: {
              // PostCSS側でもソースマップを有効にする
              sourceMap: process.env.NODE_ENV === 'development',
              plugins: [
                // Autoprefixerを有効化
                // ベンダープレフィックスを自動付与する
                require('autoprefixer')({
                  overrideBrowserslist: ['Android >= 5.0'],
                  grid: true
                }),
                // postcss-assets
                require('postcss-assets')({
                  // プロジェクトで公開するパス
                  basePath : path.resolve(__dirname, './app/assets/'),
                  // basePathから見た画像フォルダの位置
                  loadPaths: ['img/'],
                  // img/とcss/の相対的な位置
                  relative : 'css/',
                  cachebuster: true
                })
              ]
            },
          },
          // Sassをバンドルするための機能
          {
            loader: 'sass-loader',
            options: {
              // ソースマップの利用有無
              sourceMap: process.env.NODE_ENV === 'development',
            }
          },
        ]
      },
      /**
       * files
       */
      {
        test: /\.(eot|otf|ttf|woff2?|svg)(\?.+)?$/,
        include: [
          path.resolve(__dirname, 'node_modules')
        ],
        use: {
          loader: 'file-loader',
          options: {
            path: path.resolve(__dirname, './app/assets/'),
            publicPath: './app/assets/',
            name: 'fonts/[name].[ext]'
          }
        }
      }
    ]
  },
  // パッケージに含めないライブラリ
  // externals: {
  //   jquery: 'jQuery',
  //   jquery: '$'
  // },
  resolve: {
    // importするときに省略できる拡張子の設定
    extensions: ['.js', '.scss']
  },
  plugins: [
    // bootstrap のコードから jQuery が直接見えるように
    // http://getbootstrap.com/docs/4.0/getting-started/webpack/#importing-javascript
    // new webpack.ProvidePlugin({
    //    $: "jquery",
    //    jQuery: "jquery",
    //    "window.jQuery": "jquery",
    //    Popper: ["popper.js", "default"],
    // }),
    // デバッグ
    new webpack.EnvironmentPlugin({
      // NODE_ENV: process.env.NODE_ENV,
      DEBUG: process.env.NODE_ENV === 'development'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ],
  optimization: {
    // developmentモードでビルドした場合
    // minimizer: [] となるため、consoleは残されたファイルが出力される
    // puroductionモードでビルドした場合
    // minimizer: [ new UglifyJSPlugin({... となるため、consoleは削除したファイルが出力される
    minimizer: process.env.NODE_ENV === 'development' ? [
      // development
      // 頻繁に使用されるコードを整理
      new webpack.optimize.OccurrenceOrderPlugin(false),
      new OptimizeCSSAssetsPlugin({})
    ] : [
      // production
      // 重複処理を削除
      // new webpack.DedupePlugin(),
      // 頻繁に使用されるコードを整理
      new webpack.optimize.OccurrenceOrderPlugin(true),
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          compress: {
            drop_console: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};

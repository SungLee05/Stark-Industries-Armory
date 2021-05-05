const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', 'scss', 'css', 'sass']
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      /**
       *
       * TypeScript + JavaScript
       */
      {
        test: /\.m?(js|ts)$/gi,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },

          'ts-loader'
        ]
      },

      /**
       *
       * SCSS + SASS + CSS
       */

      {
        test: /\.s?(css|ass)$/gi,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',

          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer']
              }
            }
          },
          'sass-loader'
        ]
      },

      /**
       *
       * HTML + TEMPLATE
       */
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          attributes: {
            list: [
              {
                tag: 'img',
                attribute: 'data-src',
                type: 'src'
              },
              {
                tag: 'img',
                attribute: 'data-srcset',
                type: 'srcset'
              }
            ],
            root: './'
          }
        }
      },

      /**
       *
       * Image file resolving
       */
      {
        test: /\.(png|jpeg|jpg|gif|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/img/[name].[ext]',
            publicPath: '../../',
            esModule: true
          }
        }
        //type: 'asset/resource',
      },

      /**
       *
       * Fonts Resolving
       */
      {
        test: /\.(ttf|woff)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/fonts/[name].[ext]',
            publicPath: '../../'
          }
        }
        //type: 'asset/resource',
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/styles/[name].css',
      chunkFilename: '[id].css'
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    })
  ]
}

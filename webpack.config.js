const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports={

  mode:"development",
  entry: {
    bundle: path.resolve(__dirname, "src/index.js")
  },
  output: {

    path: path.resolve(__dirname, "dist"),
    // filename: "[name].js",  //this [name] will auto change to whatever entry name. example is bundle in entry to bundle.js
    
    //hashing the js file name
    filename: "[name][contenthash].js", 
    // make sure dist clears everytime builds
    clean: true,
  },
  devtool:"source-map",
  devServer:{ //what is the server seving
    static:{
      directory: path.resolve(__dirname, "dist")
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module:{
    rules:[   //for each module we installed
      {
        test:/\.scss$/,   //test if file ends with .scss
        use: [            //if so, use these loaders with the file
          "style-loader", //
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test:/\.css$/,   //test if file ends with .scss
        use: [            //if so, use these loaders with the file
          "style-loader", //
          "css-loader",
        ]
      },
      {
        test:/\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options:{
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      title: "project",
      filename: "index.html",
      template:"src/index.html"
    })
  ]

}
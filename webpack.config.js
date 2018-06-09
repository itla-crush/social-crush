module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [
          path.resolve('.'),
          path.resolve('../registry'),            // Linked module.
        ],
        use: [{
          loader: 'echo-loader',
        }, {
          loader: 'babel-loader',
          options: {
            cacheDirectory: './dist/babel-cache/'
          }
        }]
      }
    ]
  }
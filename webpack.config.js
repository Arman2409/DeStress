module.exports = {
    // ... other Webpack config
    module: {
      rules: [
        {
          test: /\.module\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                modules: true,
              },
            },
          ],
        },
      ],
    },
  };
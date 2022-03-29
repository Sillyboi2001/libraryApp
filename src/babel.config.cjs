module.exports = {
  presets: [
    [
      '@babel/preset-env',
      '@babel/preset-flow',
      '@babel/preset-react',
      {
        targets: {
          node: 'current',
          chrome: '58',
          ie: '11',
        },
      },
    ],
  ],
};

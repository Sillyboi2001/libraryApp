module.exports = {
  presets: [
    [
      '@babel/preset-env',
      '@babel/preset-flow',
      '@babel/preset-react',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};

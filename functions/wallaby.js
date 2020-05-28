module.exports = function (wallaby) {
  return {
    files: ['src/*.ts*', '!src/__tests__/*.test.ts'],

    tests: ['src/__tests__/*.test.ts'],

    env: {
      type: 'node',
    },

    testFramework: 'jest',

    debug: true,

    compilers: {
      '**/*.ts': wallaby.compilers.typeScript({
        module: 'commonjs',
      }),
    },
  }
}

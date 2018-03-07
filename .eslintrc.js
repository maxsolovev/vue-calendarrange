// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'example/build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'import/no-named-as-default': 0,
    'no-mixed-operators': 0,
    'no-restricted-syntax': 0,
    'no-use-before-define': 0,
    'default-case': 0,
    'no-param-reassign': 0,
    'no-restricted-properties': 0,
    'no-multi-assign': 0,
    'func-names': 0,
    'prefer-arrow-callback': 0,
    'wrap-iife': ['error', 'inside'],
    'consistent-return': 0,
    'prefer-spread': 0,
    'array-callback-return': 0,
    'arrow-body-style': 0,
    'no-shadow': 0,
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnvalue
      ]
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}

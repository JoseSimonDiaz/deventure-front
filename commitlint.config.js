export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'ui',
        'home',
        'auth',
        'intro',
        'zones',
        'level',
        'progress',
        'gallery',
        'ending',
        'account',
        'admin',
        'settings',
        'api',
        'repo',
        'ci',
        'docs',
      ],
    ],
    'subject-case': [0],
  },
};

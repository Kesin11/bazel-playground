module.exports = {
    "plugins": ["jest"],
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "jest/globals": true
    },
    "extends": ["eslint:recommended", "plugin:jest/recommended"],
    "parserOptions": {
        "ecmaVersion": 12
    },
    "rules": {
        // "semi": ["error", "always"]
    }
};

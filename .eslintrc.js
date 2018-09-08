module.exports = {
  "extends": "airbnb",
  'rules': {
    // Recognizes JSX components vars used.
    "react/jsx-uses-vars": "error",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "to" ]
    }],
    "no-underscore-dangle": [2, { "allow": [ '_id' ] }],
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/label-has-for": [ 2, {
      "components": [ "Label" ],
      "required": {
        "every": [ "id" ]
      },
      "allowChildren": false
    }]
  }
};
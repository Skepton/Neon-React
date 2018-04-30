module.exports = {
  "@reference": {
    "name": "headerLinks",
    "@actions": [
      {
        "@addChildBlock": {
          "name": "loginLink",
          "component": "user/skin/react/components/loginLink",
          "reactTemplate": "user/skin/react/templates/loginLink",
          "children": []
        }
      },
      {
        "@addChildBlock": {
          "name": "registerLink",
          "component": "user/skin/react/components/loginLink",
          "reactTemplate": "user/skin/react/templates/registerLink",
          "children": []
        }
      }
    ]
  }
}

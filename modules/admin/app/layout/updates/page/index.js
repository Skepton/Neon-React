module.exports = {
  "@reference": {
    "name": "headerLinks",
    "@actions": [
      {
        "@addChildBlock": {
          "name": "adminLink",
          "component": "user/skin/react/components/loginLink",
          "reactTemplate": "user/skin/react/templates/adminLink",
          "children": []
        }
      }
    ]
  }
}

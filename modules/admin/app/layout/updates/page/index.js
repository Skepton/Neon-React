module.exports = {
  "@reference": {
    "name": "headerLinks",
    "@actions": [
      {
        "@addChildBlock": {
          "name": "adminLink",
          "component": "user/skin/react/components/loginLink",
          "reactTemplate": "admin/skin/react/templates/adminLink",
          "children": []
        }
      }
    ]
  }
}

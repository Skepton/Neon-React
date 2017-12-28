module.exports = {
  "@reference": {
    "name": "content",
    "@actions": [
      {
        "@addChildBlock": {
          "name": "login",
          "model": "user",
          "type": "html",
          "template": "user/main/content/user.html",
          "children": []
        }
      }
    ]
  }
}

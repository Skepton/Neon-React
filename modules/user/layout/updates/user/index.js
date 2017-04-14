module.exports = {
  "@reference": {
    "name": "content",
    "@actions": [
      {
        "@addChildBlock": {
          "name": "login",
          "model": "user",
          "type": "html",
          "template": "default/content/user.html",
          "blocks": []
        }
      }
    ]
  }
}

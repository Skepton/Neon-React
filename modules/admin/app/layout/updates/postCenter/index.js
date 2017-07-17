module.exports = {
  "@reference": {
    "name": "content",
    "@actions": [
      {
        "@addChildBlock": {
          "name": "postCenter",
          "type": "html",
          "model": "admin/postCenter/list",
          "template": "admin/main/content/postCenter.html",
          "blocks": []
        }
      }
    ]
  }
}

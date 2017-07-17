module.exports = {
  "@reference": {
    "name": "content",
    "@actions": [
      {
        "@addChildBlock": {
          "name": "categorizer",
          "type": "html",
          "model": "admin/settings/categorizer",
          "template": "admin/main/content/settings/categorizer.html",
          "blocks": []
        }
      }
    ]
  }
}

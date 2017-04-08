module.exports = {
  "@reference": {
    "name": "content",
    "@actions": [
      {
        "@addChildBlock": {
          "name": "categorizer",
          "type": "html",
          "template": "admin/content/settings/categorizer.html",
          "model": "admin/settings/categorizer",
          "blocks": []
        }
      }
    ]
  }
}

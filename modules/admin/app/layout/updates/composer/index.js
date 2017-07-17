module.exports = {
  "@reference": {
    "name": "content",
    "@actions": [
      {
        "@addChildBlock": {
          "name": "composer",
          "type": "html",
          "model": "admin/composer",
          "template": "admin/main/content/composer.html",
          "blocks": []
        }
      }
    ]
  }
}

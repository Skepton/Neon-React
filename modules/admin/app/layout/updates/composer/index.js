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
          "children": [
            {
              "name": "composerPreviewTemplate",
              "type": "html",
              "template": "admin/main/content/composer/preview.html",
              "children": []
            }
          ]
        }
      }
    ]
  }
}

module.exports = {
  "@reference": {
    "name": "content",
    "@actions": [
      {
        "@addChildBlock": {
          "name": "composer",
          "component": "admin/skin/react/components/composer",
          "reactTemplate": "admin/skin/react/templates/composer",
          "children": [
            {
              "name": "composerAdditional",
              "component": "page/skin/react/components/list",
              "reactTemplate": "page/skin/react/templates/list",
              "children": []
            }
          ]
        }
      }
    ]
  }
}

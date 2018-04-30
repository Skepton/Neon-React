module.exports = {
  "@reference": {
    "name": "content",
    "@actions": [
      {
        "@addChildBlock": {
          "name": "postCenter",
          "component": "admin/skin/react/components/postCenter",
          "reactTemplate": "admin/skin/react/templates/postCenter",
          "children": [
            {
              "name": "posts",
              "component": "admin/skin/react/components/postCenter/posts",
              "reactTemplate": "admin/skin/react/templates/postCenter/posts",
              "children": []
            }
          ]
        }
      }
    ]
  }
}

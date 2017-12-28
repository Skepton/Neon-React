module.exports = {
  "name": "root",
  "component": "page/skin/react/components/template",
  "rootTemplate": "page/main.html",
  "reactTemplate": "page/skin/react/templates/root",
  "outputSelector": "Neon",
  "children": [
    {
      "name": "header",
      "component": "page/skin/react/components/header",
      "reactTemplate": "page/skin/react/templates/header",
      "children": [
        {
          "name": "headerLinks",
          "component": "page/skin/react/components/list",
          "reactTemplate": "page/skin/react/templates/list",
          "children": []
        }
      ]
    },
    {
      "name": "content",
      "component": "page/skin/react/components/template",
      "reactTemplate": "page/skin/react/templates/list",
      "children": []
    }
  ]
}

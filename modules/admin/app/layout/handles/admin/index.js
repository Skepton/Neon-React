module.exports = {
  "name": "root",
  "component": "page/skin/react/components/template",
  "rootTemplate": "admin/main.html",
  "reactTemplate": "admin/skin/react/templates/root",
  "children": [
    {
      "name": "header",
      "component": "page/skin/react/components/header",
      "reactTemplate": "admin/skin/react/templates/header",
      "children": [
        {
          "name": "adminLinks",
          "component": "admin/skin/react/components/linkList",
          "reactTemplate": "admin/skin/react/templates/linkList",
          "children": [
            {
              "name": "adminHomeLink",
              "component": "admin/skin/react/components/linkList",
              "reactTemplate": "admin/skin/react/templates/linkListItem",
              "children": [],
              "data": {
                "link": "/admin",
                "label": "Dashboard"
              }
            },
            {
              "name": "postsLink",
              "component": "admin/skin/react/components/linkList",
              "reactTemplate": "admin/skin/react/templates/linkListItem",
              "children": [],
              "data": {
                "link": "/admin/posts",
                "label": "Posts"
              }
            },
            {
              "name": "settingsLink",
              "component": "admin/skin/react/components/linkList",
              "reactTemplate": "admin/skin/react/templates/linkListItem",
              "children": [],
              "data": {
                "link": "/admin/settings",
                "label": "Settings"
              }
            }
          ]
        }
      ]
    },
    {
      "name": "content",
      "component": "page/skin/react/components/list",
      "reactTemplate": "page/skin/react/templates/list",
      "children": []
    }
  ]
}

module.exports = {
  "name": "root",
  "type": "html",
  "template": "admin/main.html",
  "output": true,
  "children": [
    {
        "name":"head",
        "template": "admin/main/head.html",
        "children": [
          {
            "name":"headContent",
            "children": []
          }
        ]
    },
    {
        "name":"message",
        "model": "messages",
        "template": "page/main/message.html",
        "children": []
    },
    {
      "name": "header",
      "template": "admin/main/header.html",
      "children": [
        {
          "name": "headerLinks",
          "children": [
            {
              "name": "adminHeaderLinks",
              "template": "admin/main/header/headerLinks.html",
              "links": [
                {
                  "link": "/admin",
                  "class": "dashboard",
                  "title": "Dashboard"
                },
                {
                  "link": "/admin/settings",
                  "class": "settings",
                  "title": "Settings",
                  "links": [
                    {
                      "link": "/admin/settings/categorizer",
                      "class": "categorizer",
                      "title": "Categories"
                    }
                  ]
                }
              ],
              "children": []
            }
          ]
        }
      ]
    },
    {
      "name":"content",
      "children": []
    }
  ]
}

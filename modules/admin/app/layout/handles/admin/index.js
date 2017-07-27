module.exports = {
  "name": "root",
  "type": "html",
  "template": "admin/main.html",
  "output": true,
  "blocks": [
    {
        "name":"head",
        "type":"html",
        "template": "admin/main/head.html",
        "blocks": [
          {
            "name":"headContent",
            "type": "list",
            "blocks": []
          }
        ]
    },
    {
        "name":"message",
        "type":"flash",
        "template": "page/main/message.html",
        "blocks": []
    },
    {
      "name": "header",
      "type": "html",
      "template": "admin/main/header.html",
      "blocks": [
        {
          "name": "headerLinks",
          "type": "list",
          "blocks": [
            {
              "name": "adminHeaderLinks",
              "type": "adminLinks",
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
                  "title": "Settings"
                }
              ],
              "blocks": []
            }
          ]
        }
      ]
    },
    {
      "name":"content",
      "type": "list",
      "blocks": []
    }
  ]
}

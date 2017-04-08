module.exports = {
  "name": "root",
  "type": "html",
  "template": "admin.html",
  "output": true,
  "blocks": [
    {
        "name":"head",
        "type":"html",
        "template": "admin/head.html",
        "blocks": []
    },
    {
        "name":"message",
        "type":"flash",
        "template": "admin/message.html",
        "blocks": []
    },
    {
      "name": "header",
      "type": "html",
      "template": "admin/header.html",
      "blocks": [
        {
          "name": "login",
          "type": "userHtml",
          "template": "admin/header/loginHeader.html",
          "blocks": []
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

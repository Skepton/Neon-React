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
        "blocks": []
    },
    {
        "name":"message",
        "type":"flash",
        "template": "admin/main/message.html",
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

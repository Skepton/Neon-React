module.exports = {
  "name": "root",
  "type": "html",
  "template": "page/main.html",
  "output": true,
  "blocks": [
    {
        "name":"head",
        "type":"html",
        "nowrap": true,
        "template": "page/main/head.html",
        "blocks": [
          {
            "name":"headContent",
            "nowrap": true,
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
      "template": "page/main/header.html",
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

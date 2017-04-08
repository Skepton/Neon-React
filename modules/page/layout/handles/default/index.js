module.exports = {
  "name": "root",
  "type": "html",
  "template": "1column.html",
  "output": true,
  "blocks": [
    {
        "name":"head",
        "type":"html",
        "template": "default/head.html",
        "blocks": []
    },
    {
        "name":"message",
        "type":"flash",
        "template": "default/message.html",
        "blocks": []
    },
    {
      "name": "header",
      "type": "html",
      "template": "default/header.html",
      "blocks": [
        {
          "name": "login",
          "type": "userHtml",
          "template": "default/header/loginHeader.html",
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

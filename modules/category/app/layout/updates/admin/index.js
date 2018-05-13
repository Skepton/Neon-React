module.exports = {
  "@reference": {
    "name": "adminLinks",
    "@actions": [
      {
        "@addChildBlock": {
          "name": "adminCategoriesLink",
          "component": "admin/skin/react/components/linkList",
          "reactTemplate": "admin/skin/react/templates/linkListItem",
          "children": [],
          "data": {
            "link": "/admin/categories",
            "label": "Categories"
          }
        }
      }
    ]
  }
}

module.exports = [
  {
    "path": "/admin/categories",
    "area": "admin",
    "conditional": "isAdmin",
    "handle": "admin",
    "handleUpdates": ['categorizer']
  }
]

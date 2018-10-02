module.exports = [
  {
    "path": "/admin/categories",
    "area": "admin",
    "conditional": "isAdmin",
    "handle": "admin",
    "handleUpdates": ['categorizer']
  },
  {
    "path": "/category/:categoryUrl*",
    "area": "frontend",
    "handle": "page",
    "handleUpdates": ['category']
  }
]

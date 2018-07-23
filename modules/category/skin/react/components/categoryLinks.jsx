import templateComponent from 'page/skin/react/components/template';

class NeonCategoryLinks extends templateComponent {

  constructor(props){
    super(props);
    this.state = {
      categories: []
    }

    this.getCategories();
  }

  getCategories(){
    var self = this;

    $.ajax({
      url: '/api/category/limit/1000',
      type: 'GET',
      dataType: 'json',
      success: function(categories){
        self.orderCategories(categories);
      },
      error: function(err){
        console.log(err);
      }
    });
  }

  // Reorder categories
  orderCategories(categories){
    var self = this;
    var sortedCategories = [];
    var remainingCategories = categories.filter(function(category){
      if(category.isRoot && category.parentId == null){
        // Move category to sorted array
        category.level = 0;
        category.children = [];
        sortedCategories.push(category);
      } else {
        // Keep category in unsorted array
        return category
      }
    });

    var iterator = 0;
    while (remainingCategories.length > 0 && iterator <= 100) {
      iterator += 1;
      remainingCategories = remainingCategories.filter(function(category){
        var parentId = category.parentId;
        var parentCategory = self.getParentCategoryFromArray(parentId, sortedCategories);

        if(parentCategory){
          category.level = parentCategory.level + 1;
          category.children = [];
          parentCategory.children.push(category);
        } else {
          return category;
        }
      });
    }

    this.setState({categories: sortedCategories});
  }

  getCategoryFromArray(categoryId, categoryArray){
    var self = this;
    var foundCategory = false;
    categoryArray.forEach(function(category){
      if(category.id === categoryId){
        foundCategory = category;
      } else {
        if(category.children.length > 0){
          var potentialCategory = self.getCategoryFromArray(categoryId, category.children);
          if(potentialCategory){
            foundCategory = potentialCategory;
          }
        }
      }
    });

    return foundCategory;
  }

  getParentCategoryFromArray(parentId, categoryArray){
    var self = this;
    var parentCategory = false;
    categoryArray.forEach(function(category){
      if(category.id === parentId){
        parentCategory = category;
      } else {
        if(category.children.length > 0){
          var potentialCategory = self.getParentCategoryFromArray(parentId, category.children);
          if(potentialCategory){
            parentCategory = potentialCategory;
          }
        }
      }
    });

    return parentCategory;
  }

  openSubcategoryList(categoryId){
    var categories = this.state.categories;
    var category = this.getCategoryFromArray(categoryId, categories);

    if(category){
      category.open = true;
    }

    this.setState({categories: categories});
  }

  closeSubcategoryList(categoryId){
    var categories = this.state.categories;
    var category = this.getCategoryFromArray(categoryId, categories);

    if(category){
      category.open = false;
    }

    this.setState({categories: categories});
  }

}

module.exports = NeonCategoryLinks;

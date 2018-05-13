import templateComponent from 'page/skin/react/components/template';
import slugify from 'category/app/helper/slugify.js';

class NeonCategorizer extends templateComponent {

  constructor(props){
    super(props);
    this.state = {
      categories: [],
      showRootForm: false,
      showChildForm: false,
      parent: {},
      formData: {}
    };
    this.props = props;
    this.getCategories();
  }

  // Form Functions
  hideRootCategoryForm(){
    this.setState({showRootForm: false, formData: {}});
  }

  hideChildCategoryForm(){
    this.setState({showChildForm: false, formData: {}});
  }

  showRootCategoryForm(){
    this.hideChildCategoryForm();
    this.setState({showRootForm: true, formData: {}});
  }

  showChildCategoryForm(id){
    var parentCategory = this.state.categories.filter((category) => {
      if(category.id == id){
        return category;
      }
    });

    this.hideRootCategoryForm();
    this.setState({showChildForm: true, parent: parentCategory[0]});
  }

  handleFormInputUpdate(event){
    var targetElement = event.target;
    var targetName = targetElement.getAttribute('name');
    var inputValue = targetElement.value;
    var formData = JSON.parse(JSON.stringify(this.state.formData));

    formData[targetName] = inputValue;

    this.setState({formData: formData});
  }

  newRootCategory(event) {
    event.preventDefault();
    var self = this;
    var category = this.state.formData;
    category.isRoot = true;

    self.createCategory(category);
  }

  newChildCategory(parentId, event) {
    event.preventDefault();
    var self = this;
    var category = this.state.formData;
    category.isRoot = false;
    category.associations = { parentId: parentId};

    self.createCategory(category);
  }

  // Reorder categories
  orderCategories(categories){
    var sortedCategories = [];
    var remainingCategories = categories.filter(function(category){
      if(category.isRoot && category.parentId == null){
        // Move category to sorted array
        category.level = 0;
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
        var parentCategoryIndex = false;
        var parentLevel = 0;

        sortedCategories.forEach(function(sortedCategory, index){
          if(sortedCategory.id == parentId){
            parentLevel = sortedCategory.level;
            parentCategoryIndex = index;
          }
        });

        if(parentCategoryIndex !== false){
          category.level = parentLevel + 1;
          sortedCategories.splice(parentCategoryIndex + 1, 0, category);
        } else {
          return category;
        }
      });
    }

    this.setState({categories: sortedCategories});
  }

  // Ajax calls
  createCategory(category){
    var self = this;

    $.ajax({
      url: '/api/category/',
      type: 'POST',
      data: JSON.stringify(category),
      contentType: 'application/json',
      success: function(response){
        console.log('Save Successful!');
        self.hideChildCategoryForm();
        self.hideRootCategoryForm();
        self.getCategories();
      },
      error: function(err){
        console.log(err);
      }
    });
  }

  getCategories(){
    var self = this;

    $.ajax({
      url: '/api/category/limit/1000',
      type: 'GET',
      dataType: 'json',
      success: function(categories){
        self.setState({categories: categories});
        self.orderCategories(categories);
      },
      error: function(err){
        console.log(err);
      }
    });
  }
}

module.exports = NeonCategorizer;

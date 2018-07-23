import templateComponent from 'page/skin/react/components/template';
import {getComposerDispatch, setComposerDispatch} from 'admin/skin/react/helpers/composerDispatcher';

class NeonCategorySelector extends templateComponent {

  constructor(props){
    super(props);
    this.state = {
      categories: [],
      modalOpen: false,
      expandedCategories: [],
      selectedCategory: null
    }
    this.getCategories();
  }

  toggleSelected(category, event){
    event.stopPropagation();
    var selectedCategory = this.state.selectedCategory;

    if(selectedCategory && selectedCategory.id === category.id){
      selectedCategory = null;
    } else {
      selectedCategory = category;
    }

    this.setState({selectedCategory: selectedCategory});
    setComposerDispatch.dispatch({category: selectedCategory});
  }

  toggleExpanded(category, event){
    event.stopPropagation();
    var expandedCategories = this.state.expandedCategories;

    if(expandedCategories.indexOf(category.id) >= 0){
      expandedCategories.splice(expandedCategories.indexOf(category.id),1);
    } else {
      expandedCategories.push(category.id);
    }

    this.setState({expandedCategories: expandedCategories});
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

    // reverse order of categories
    remainingCategories.reverse();

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
            sortedCategory.isParent = true;
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

  openCategorySelect(e){
    e.preventDefault();

    this.setState({modalOpen: true});
  }

  closeCategorySelect(e){
    e.preventDefault();

    this.setState({modalOpen: false});
  }

  componentWillMount(){
    var self = this;
    this.getComposerDispatchToken = getComposerDispatch.register(function(data){
      self.setState({selectedCategory: data.post.category});
    });
  }

  componentWillUnmount(){
    getComposerDispatch.unregister(this.getComposerDispatchToken);
  }
}

module.exports = NeonCategorySelector;

module.exports = (component) =>

<div className="category-selector">
  <button onClick={component.openCategorySelect.bind(component)}>Select Categories</button>
  <div className={'modal' + (component.state.modalOpen ? ' modal__isOpen' : '')}>
    <button className="modal__close" onClick={component.closeCategorySelect.bind(component)}>Close</button>
    <div className="category-selector__content modal__inner">
      <div className="category-tree">
        {component.state.categories.map((category) =>
          <div className={'category-tree__item' + (category.isRoot ? ' category-tree__item--root' : '') + (component.state.expandedCategories.indexOf(category.parentId) >= 0 ? ' category-tree__item--expanded': '')}
               key={category.id} style={{marginLeft: category.level * 1.5 + 'rem'}}
               onClick={component.toggleExpanded.bind(component, category)}>

            {(category.isParent) ? (
              <span className="expander">{component.state.expandedCategories.indexOf(category.id) >= 0 ? <i className="material-icons">indeterminate_check_box</i> : <i className="material-icons">add_box</i>}</span>
            ) : ''}
            <div className="info-wrapper">
              <span className="title">{category.title}</span>
              <span className="slug">{category.slug}</span>
            </div>
            <span className={'selector' + (component.state.selectedCategory && component.state.selectedCategory.id  === category.id ? ' selector--selected' : '')}
                  onClick={component.toggleSelected.bind(component, category)}>

              {component.state.selectedCategory && component.state.selectedCategory.id === category.id ? <i className="material-icons">check</i> : ''}
            </span>
          </div>
        )}
        { component.state.categories.length <= 0 ? <p className="no-category notice">No categories exist!</p> : ''}
      </div>
    </div>
  </div>
</div>

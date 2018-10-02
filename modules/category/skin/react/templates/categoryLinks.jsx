import {Link} from 'react-router-dom'

function renderCategory(category, component){
    return (
      <div className={"category-links__item" + (category.children.length > 0 ? ' category-links__item--parent' : '') + (category.open ? ' category-links__item--open' : '')}
           key={category.id}
           onMouseEnter={component.openSubcategoryList.bind(component, category.id)}
           onMouseLeave={component.closeSubcategoryList.bind(component, category.id)}>
        <Link to={'/category/' + category.slug}>{category.title}</Link>
        {category.children.length > 0 ?
          <div className={"category-links__list" + (category.open ? ' category-links__list--open' : '')}>{category.children.map((childCategory) => renderCategory(childCategory, component))}</div>
        : ''}
      </div>
    )
}

module.exports = (component) =>
<div className="category-links__wrapper">
  {component.state.categories.map((category) =>
    renderCategory(category, component)
  )}
</div>

class neonComponentHandler {
  constructor(elementAttribute){
    this.componentSelector = elementAttribute;
    this.component = document.querySelector(`[${elementAttribute}]`);
  }

  findOne(selector){
    return this.component.querySelector(selector);
  }

  findAll(selector){
    return this.component.querySelectorAll(selector);
  }

  when(eventString, elementSelector = this.componentSelector, eventCallback){
    var targetArray = this.component.querySelectorAll(elementSelector);
    Array.from(targetArray).forEach(element => {
      element.addEventListener(eventString, event => { eventCallback(event, element) });
    });
  }
}

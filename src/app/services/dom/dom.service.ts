import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
  ComponentRef,
  Type,
  ElementRef
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DOMService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector,
  ) {}

  appendComponent<T>(component: Type<T>, params?: any, container?: ElementRef): ComponentRef<T> {
    //create a component reference
    const componentRef = this.componentFactoryResolver.resolveComponentFactory(component)
      .create(this.injector);

    // set up component
    if (params) {
      Object.keys(params).map((key) => {
        componentRef.instance[key] = params[key];
      });
    }

    // attach component to the appRef so that so that it will be dirty checked.
    this.applicationRef.attachView(componentRef.hostView);

    // get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any> )
      .rootNodes[0] as HTMLElement;

    if (container) {
      container.nativeElement.appendChild(domElem)
    } else {
      document.body.appendChild(domElem);
    }

    return componentRef;
  }

  removeComponent<T>(componentRef: ComponentRef<T> ) {
    this.applicationRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}
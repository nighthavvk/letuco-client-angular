import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
  ComponentRef,
  Type
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

  appendComponentToBody<T>(component: Type<T>, params?: any): ComponentRef<T> {
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

    document.body.appendChild(domElem);

    return componentRef;
  }

  removeComponentFromBody(componentRef: ComponentRef<any> ) {
    this.applicationRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}
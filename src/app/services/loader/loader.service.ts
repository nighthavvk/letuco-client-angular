import { Injectable, ElementRef, ComponentRef } from '@angular/core';
import { DOMService } from '../dom/dom.service';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(
    private dom: DOMService
  ) { }

  showLoader(container?: ElementRef, params?: any) {
    this.dom.appendComponent(LoaderComponent, params, container);
  }

  hideLoader(loader: ComponentRef<LoaderComponent>) {
    this.dom.removeComponent(loader);
  }
}

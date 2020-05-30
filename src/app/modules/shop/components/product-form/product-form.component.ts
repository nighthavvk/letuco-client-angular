import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @Input() product;

  @Output() submit: EventEmitter<any> = new EventEmitter();

  public productForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required]
    });

    if (this.product){
      this.productForm.patchValue(this.product)
    }
  }

  get nameCtrl() {
    return this.productForm.get('name')
  }

  onSubmit() {
    if (!this.productForm.valid) { return; }

    this.submit.emit({
      name: this.nameCtrl.value
    });
  }
}

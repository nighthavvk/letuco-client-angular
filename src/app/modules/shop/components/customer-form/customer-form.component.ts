import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  @Input() customer;

  @Output() save: EventEmitter<any> = new EventEmitter();

  public customerForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: ['', Validators.required]
    });

    if (this.customer){
      this.customerForm.patchValue(this.customer);
    }
  }

  get nameCtrl() {
    return this.customerForm.get('name');
  }

  onSubmit() {
    if (!this.customerForm.valid) { return; }

    this.save.emit({
      name: this.nameCtrl.value
    });
  }
}

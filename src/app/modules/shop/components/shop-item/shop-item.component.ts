import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ShopsService } from '../../services/shops/shops.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss']
})
export class ShopItemComponent implements OnInit {
  @Input() shop;
  @Input() isEditing: boolean = false;

  @Output() save: EventEmitter<any> = new EventEmitter();

  @ViewChild('submitButton') submitButton: ElementRef

  public shopForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private shopsService: ShopsService
  ) { }

  ngOnInit(): void {
    this.shopForm = this.fb.group({
      name: ['', Validators.required]
    })

    if (this.shop){
      this.shopForm.patchValue(this.shop)
    }
  }

  get nameCtrl() {
    return this.shopForm.get('name');
  }

  onSubmit() {
    if (!this.shopForm.valid) { return; }

    if (!this.shop) {
      this.submitButton.nativeElement.setAttribute('disabled', true);

      this.shopsService.createShop({ name: this.nameCtrl.value })
      .subscribe(
        (res: any) => {
          debugger;
          this.save.emit([res]);
          this.submitButton.nativeElement.removeAttribute('disabled');
        },
        err => {
          console.log(err)
          this.submitButton.nativeElement.removeAttribute('disabled');
        }
      );
    }
  }
}

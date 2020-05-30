import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
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

  @Output() save = new EventEmitter();

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

    this.shopsService.createShop({ name: this.nameCtrl.value })
      .subscribe(
        res => {
          console.log(res)
          this.save.emit(res);
        },
        err => console.log(err)
      );
  }
}

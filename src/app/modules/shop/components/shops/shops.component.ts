import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShopsService } from '../../services/shops/shops.service';
import { LocalStorageService } from '../../../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {

  public isEditing: boolean = false;
  public shops$: Observable<any> = this.shopsService.getShops();

  constructor(
    private shopsService: ShopsService
  ) { }

  ngOnInit(): void {
  }

  onAddNewShopClick() {

  }
}

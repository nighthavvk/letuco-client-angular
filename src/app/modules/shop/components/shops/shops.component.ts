import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ShopsService } from '../../services/shops/shops.service';
import { LocalStorageService } from '../../../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {

  public isEditing: boolean = false;
  public shops$: Subject<any> = new Subject();
  public shops: [] = [];

  constructor(
    private shopsService: ShopsService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.shopsService.getShops()
      .subscribe((res: any) => {
        this.shops.concat(res);
        this.shops$.next(res);
      });
  }

  onAddNewShopClick() {

  }

  onShopSave(shop: any) {
    this.shops.concat(shop);
    this.shops$.next(this.shops);
    this.changeDetectorRef.detectChanges();
  }
}

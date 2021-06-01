import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  BookProfile,
  DifferentTownConfig,
  SameTownConfig,
} from '../../../../interfaces';
import { UserData } from '../../../auth/auth.model';
import { MatRadioChange } from '@angular/material/radio';

export interface DialogData {
  message: string;
  actionButton: string;
  isHomepage: boolean | null;
  book: BookProfile | null;
  user: UserData;
}

@Component({
  templateUrl: './trade-dialog.component.html',
  styleUrls: ['./trade-dialog.component.scss'],
})
export class TradeDialogComponent {
  book: BookProfile;
  sameTownConfig: SameTownConfig;
  differentTownConfig: DifferentTownConfig;
  showSameTown = true;
  showDifferentTown = true;

  get preferences(): boolean {
    return (
      !!this.book.tradingPreferenceAuthor ||
      !!this.book.tradingPreferenceGenre ||
      !!this.book.tradingPreferenceBook ||
      !!this.book.tradingPreferenceDescription
    );
  }

  constructor(
    public dialogRef: MatDialogRef<TradeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.book = data.book;
    this.sameTownConfig = data.user.sameTownConfig;
    this.differentTownConfig = data.user.differentTownConfig;
    this.showDifferentTown = Object.keys(this.differentTownConfig).some(
      (t: string) => this.differentTownConfig[t]
    );
    this.showSameTown = Object.keys(this.sameTownConfig).some(
      (t: string) => this.sameTownConfig[t]
    );
  }

  updateDeliveryMethod(
    town: string,
    type: string,
    event: MatRadioChange
  ): void {
    console.log('before', this[town]);
    this[town] = {
      ...this[town],
      [type]: event.value,
    };
    console.log('after', this[town]);
  }

  deliveryMethodSelected(town: string): void {
    console.log(town, this[town]);
  }
}

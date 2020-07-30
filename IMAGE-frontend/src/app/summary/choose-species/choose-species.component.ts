import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  species: any;
  active_specie: string;
}

@Component({
  selector: 'app-choose-species',
  templateUrl: './choose-species.component.html',
  styleUrls: ['./choose-species.component.css']
})
export class ChooseSpeciesComponent {

  constructor(
    public dialogRef: MatDialogRef<ChooseSpeciesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSpecieClick(data: DialogData, specie: string) {
    data.active_specie = specie;
  }

  chooseClass(data: DialogData, specie: string) {
    if (data.active_specie === specie) {
      return 'active-specie';
    }
  }

}

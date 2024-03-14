import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { DialogGroupServiceComponent } from './dialog-group-service/dialog-group-service.component';
import { MatDialog } from '@angular/material/dialog';

import { StatistiquesService } from '../../../services/statistiques.service';

import { DialogEditLabelComponent } from './dialog-edit-label/dialog-edit-label.component';

@Component({
  selector: 'create-group',
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.scss',
})
export class CreateGroupComponent implements OnInit {
  private statService = inject(StatistiquesService);

  // switch navigation in groupe service from create-group :
  @Output() serviceNavigation: EventEmitter<number> =
    new EventEmitter<number>();

  // list of groups services :
  public groupServices: Array<any> = [];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.get_groupe_service();
  }

  get_groupe_service() {
    this.statService.get_groupe().subscribe((res) => {
      if (res.data && res.data.length > 0) {
        this.groupServices = res.data.slice();
      }
    });
  }

  openDialogCreateGroup(): void {
    const dialogRef = this.dialog.open(DialogGroupServiceComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.get_groupe_service();
    });
  }

  // edit dialog :
  openDialogLabelGroup(event: any, body: object): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(DialogEditLabelComponent, {
      data: body,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.get_groupe_service();
    });
  }

  // delete dialog :
  delete_label_groupe(event: any, id: number) {
    event.stopPropagation();
    this.statService.set_delete_label_group(id).subscribe(() => {
      const indexToDelete = this.groupServices.findIndex(
        (row: any) => row.id === id
      );
      if (indexToDelete !== 1) {
        this.groupServices.splice(indexToDelete, 1);
      }
    });
  }

  onChangeGroupAssociate(id: number) {
    this.serviceNavigation.emit(id);
  }
}

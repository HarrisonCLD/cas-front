import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { DialogGroupServiceComponent } from './dialog-group-service/dialog-group-service.component';
import { MatDialog } from '@angular/material/dialog';
import { StatistiquesService } from '../../../services/statistiques.service';
import { Subject } from 'rxjs';
import { DialogEditLabelComponent } from './dialog-edit-label/dialog-edit-label.component';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'create-group',
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.scss',
})
export class CreateGroupComponent implements OnInit {
  private statService = inject(StatistiquesService);

  @Output() serviceNavigation: EventEmitter<number> =
    new EventEmitter<number>();
  @Input() associateTo!: number;

  public groupeServices!: any;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.statService.get_groupe().subscribe((res) => {
      this.groupeServices = res.data.slice();
    });
  }

  openDialogCreateGroup(): void {
    const dialogRef = this.dialog.open(DialogGroupServiceComponent);
  }

  openDialogLabelGroup(body: object): void {
    const dialogRef = this.dialog.open(DialogEditLabelComponent, {
      data: body,
    });
  }

  onChangeGroupAssociate(id: number) {
    this.associateTo = id;
    this.serviceNavigation.emit(id);
  }

  delete_label_groupe(id: number) {
    this.statService.set_delete_label_group(id).subscribe((res) => {
      console.log(res);
    });
  }
  edit_label_group(body: any) {
    this.openDialogLabelGroup(body);
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormCreateComponent } from './form-create/form-create.component';
import { UserAPIService } from 'src/app/services/user/user.service';
import { user } from 'src/app/models/user.model';
import { NgToastService } from 'ng-angular-popup';
import { FormUpdateComponent } from './form-update/form-update.component';
import { FormDeleteComponent } from './form-delete/form-delete.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { role } from 'src/app/models/role.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'role', 'date'];
  user: user[] = [];
  userID: number = 0;
  pageEvent: PageEvent = new PageEvent();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  lowValue: number = 0;
  highValue: number = 10;
  totalUser: any = 0;
  isOn: boolean = false;
  role: role[] = [
    { value: 1, viewValue: 'admin' },
    { value: 2, viewValue: 'user' },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private UserAPIService: UserAPIService,
    public dialog: MatDialog,
    private toast: NgToastService
  ) {}

  formCreateUser = this.formBuilder.group({
    username: '',
    password: '',
    type: 1,
  });

  formSearch = this.formBuilder.group({
    username: '',
    roleId: 1,
  });

  onSubmit() {
    this.isOn = true
    this.UserAPIService.search(
      this.formSearch.value.username as string,
      this.formSearch.value.roleId as number,
      this.lowValue,
      this.highValue
    ).subscribe((response) => {
      this.user = response
    });
  }

  reload() {
    this.UserAPIService.getAll(
      this.lowValue as number,
      this.highValue as number
    ).subscribe((response) => {
      this.user = response;
    });
  }

  ngOnInit(): void {
    this.UserAPIService.getAll(this.lowValue, this.highValue).subscribe(
      (response) => {
        this.user = response;
      }
    );
    this.UserAPIService.getInfo().subscribe((response) => {
      this.totalUser = response;
    });
  }

  show(data: any) {
    this.userID = data.id;
  }

  openFormCreate(): void {
    const dialog = this.dialog.open(FormCreateComponent);
    dialog.afterClosed().subscribe((response: any) => {
      if (response) {
        this.reload();
      }
    });
  }
  openFormUpdate(): void {
    if (this.userID) {
      const dialog = this.dialog.open(FormUpdateComponent, {
        data: { id: this.userID },
      });
      dialog.afterClosed().subscribe((response: any) => {
        if (response) {
          this.reload();
        }
        this.userID = 0;
      });
    } else {
      this.toast.error({
        detail: 'ERROR',
        summary: 'Hãy lựa chọn bản ghi',
      });
    }
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    this.UserAPIService.getAll(this.lowValue, this.highValue).subscribe(
      (response) => {
        this.user = response;
      }
    );
    return event;
  }
  openFormDelete(): void {
    if (this.userID) {
      const dialog = this.dialog.open(FormDeleteComponent, {
        data: { id: this.userID },
      });
      dialog.afterClosed().subscribe((response: any) => {
        if (response) {
          this.reload();
        }
        this.userID = 0;
      });
    } else {
      this.toast.error({
        detail: 'ERROR',
        summary: 'Hãy lựa chọn bản ghi',
      });
    }
  }
}

import { UserAPIService } from 'src/app/services/user/user.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { role } from 'src/app/models/role.model';
import { user } from 'src/app/models/user.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

export interface ids {
  id: number;
}
export interface u {
  username: string;
  roleId: number;
  date: string
}

@Component({
  selector: 'app-form-update',
  templateUrl: './form-update.component.html',
  styleUrls: ['./form-update.component.scss'],
})
export class FormUpdateComponent implements OnInit {
  role: role[] = [
    { value: 1, viewValue: 'admin' },
    { value: 2, viewValue: 'user' },
  ];
  user: u = {
    username: '',
    roleId: 1,
    date: new Date().toISOString().slice(0, 10)
  };
  formUpdateUser = this.formBuilder.group(this.user);
  constructor(
    private formBuilder: FormBuilder,
    private UserAPIService: UserAPIService,
    private toast: NgToastService,
    public dialogRef: MatDialogRef<FormUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ids
  ) {}

  ngOnInit(): void {
    this.UserAPIService.getOne(this.data.id).subscribe((data) => {
      this.user = { username: data.username, roleId: data.roleId, date: new Date(data.date).toISOString().slice(0, 10) };
    });
  }

  onSubmit() {
    this.UserAPIService.update(
      this.data.id,
      this.formUpdateUser.value.username as string,
      this.formUpdateUser.value.roleId as number,
      this.formUpdateUser.value.date as string
    ).subscribe((response: any) =>{
      if(response.isSuccess){
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Thay đổi thành công',
        });
        this.dialogRef.close(true)
      }else{
        this.toast.error({
          detail: 'ERROR',
          summary: 'Thay đổi thất bại',
        });
      }
    });
  }
}

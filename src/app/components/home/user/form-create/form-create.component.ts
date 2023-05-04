import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { role } from 'src/app/models/role.model';
import {MatDialogRef} from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { UserAPIService } from 'src/app/services/user/user.service';

interface charge{
  reload: any
}

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.scss'],
})
export class FormCreateComponent implements OnInit {
  role: role[] = [
    { value: 1, viewValue: 'admin' },
    { value: 2, viewValue: 'user' },
  ];
  formCreateUser = this.formBuilder.group({
    username: '',
    password: '',
    type: 1,
    date: ""
  });
  constructor(
    private formBuilder: FormBuilder,
    private UserAPIService: UserAPIService,
    public dialogRef: MatDialogRef<FormCreateComponent>,
    private toast: NgToastService
  ) {}

  onSubmit() {
    this.UserAPIService.create(
      this.formCreateUser.value.username as string,
      this.formCreateUser.value.password as string,
      this.formCreateUser.value.type as number,
      this.formCreateUser.value.date as string
    ).subscribe((response) => {
      if(response.isSuccess) {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Tạo mới thành công',
        });
        this.dialogRef.close(true)
      }else{
        this.toast.error({
          detail: 'ERROR',
          summary: 'Tạo mới thất bại',
        });
      }
    });
  }

  ngOnInit(): void {}
}

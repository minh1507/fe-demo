import { UserAPIService } from 'src/app/services/user/user.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

export interface ids {
  id: number;
}

@Component({
  selector: 'app-form-delete',
  templateUrl: './form-delete.component.html',
  styleUrls: ['./form-delete.component.scss'],
})
export class FormDeleteComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ids,
    public dialogRef: MatDialogRef<FormDeleteComponent>,
    private UserAPIService: UserAPIService,
    private toast: NgToastService,
  ) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close(true);
  }

  save(){
    this.UserAPIService.deleteOne(this.data.id).subscribe((response:any) => {
      if(response.isSuccess) {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Xóa thành công',
        });
        this.dialogRef.close(true)
      }
      else{
        this.toast.error({
          detail: 'ERROR',
          summary: 'Xóa thất bại',
        });
      }
    })
  }
}

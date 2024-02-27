import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Despesa } from 'src/app/interfaces/Despesa';
import { DespesaService } from 'src/app/services/despesa.service';

@Component({
  selector: 'app-add-edit-despesa',
  templateUrl: './add-edit-despesa.component.html',
  styleUrls: ['./add-edit-despesa.component.scss'],
})
export class AddEditDespesaComponent implements OnInit {
  formDesp!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _despesaService: DespesaService,
    private _dialogRef: MatDialogRef<AddEditDespesaComponent>,
    @Inject(MAT_DIALOG_DATA) private despesaEdit: Despesa
  ) {
    this.formDesp = this._formBuilder.group({
      id: new FormControl(null),
      data: new FormControl('', [Validators.required]),
      local: new FormControl('', [Validators.required]),
      tipoPagamento: new FormControl('', [Validators.required]),
      valor: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    if (this.despesaEdit != null) {
      this.formDesp.patchValue(this.despesaEdit);
    }
  }

  SubmitForm() {
    if (this.formDesp.invalid) {
      return;
    }

    if (this.despesaEdit !== null) {
      this._despesaService.update(this.formDesp.value).subscribe({
        next: () => {
          this._dialogRef.close(true);
        },
      });
    } else {
      this._despesaService.create(this.formDesp.value).subscribe({
        next: () => {
          this._dialogRef.close(true);
        },
      });
    }
  }
}

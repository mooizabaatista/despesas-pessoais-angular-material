import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddEditDespesaComponent } from './components/add-edit-despesa/add-edit-despesa.component';
import { DespesaService } from './services/despesa.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Despesa } from './interfaces/Despesa';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  valorSaldo: number = 0;
  displayedColumns: string[] = [
    'data',
    'local',
    'tipoPagamento',
    'valor',
    'acoes',
  ];

  dataSource!: MatTableDataSource<Despesa>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _despesaService: DespesaService
  ) {}

  ngOnInit(): void {
    this.getDespesas();
  }

  openAddEditDespForm() {
    const dialog = this._dialog.open(AddEditDespesaComponent, {
      width: '30%',
    });

    dialog.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getDespesas();
        }
      },
    });
  }

  openEditForm(row: Despesa) {
    const dialog = this._dialog.open(AddEditDespesaComponent, { data: row });

    dialog.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getDespesas();
        }
      },
    });
  }

  getDespesas() {
    this._despesaService.getAll().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.valorSaldo = 0;

        res.forEach((despesa) => {
          this.valorSaldo += Number(despesa.valor);
        });
      },
    });
  }

  onDelete(despesa: Despesa) {
    this._despesaService.delete(despesa.id).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(
          (item) => item.id !== despesa.id
        );
        this.valorSaldo -= despesa.valor;
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    const previousFilterValue = this.dataSource.filter;

    const userClearedFilter = previousFilterValue && !filterValue;

    this.dataSource.filter = filterValue;

    if (userClearedFilter || previousFilterValue !== filterValue) {
      this.valorSaldo = 0;
      this.dataSource.filteredData.forEach((despesa: Despesa) => {
        this.valorSaldo += Number(despesa.valor);
      });
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

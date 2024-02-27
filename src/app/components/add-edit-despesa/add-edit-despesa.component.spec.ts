import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDespesaComponent } from './add-edit-despesa.component';

describe('AddEditDespesaComponent', () => {
  let component: AddEditDespesaComponent;
  let fixture: ComponentFixture<AddEditDespesaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditDespesaComponent]
    });
    fixture = TestBed.createComponent(AddEditDespesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

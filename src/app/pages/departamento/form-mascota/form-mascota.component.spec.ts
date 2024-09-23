import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMascotaComponent } from './form-mascota.component';

describe('FormMascotaComponent', () => {
  let component: FormMascotaComponent;
  let fixture: ComponentFixture<FormMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMascotaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

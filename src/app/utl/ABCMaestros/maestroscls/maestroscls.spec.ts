import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Maestroscls } from './maestroscls';

describe('Maestroscls', () => {
  let component: Maestroscls;
  let fixture: ComponentFixture<Maestroscls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Maestroscls],
    }).compileComponents();

    fixture = TestBed.createComponent(Maestroscls);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoauthPage } from './noauth.page';

describe('NoauthPage', () => {
  let component: NoauthPage;
  let fixture: ComponentFixture<NoauthPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoauthPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoauthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

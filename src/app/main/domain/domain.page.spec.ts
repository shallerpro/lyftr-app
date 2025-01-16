import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DomainPage} from './domain.page';

describe('DomainePage', () => {
    let component: DomainPage;
    let fixture: ComponentFixture<DomainPage>;

    beforeEach(() => {
        fixture = TestBed.createComponent(DomainPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

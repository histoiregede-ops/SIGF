import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LotListComponent } from '../lot-list.component';
import { LotService } from '../../services/lot.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('LotListComponent', () => {
  let component: LotListComponent;
  let fixture: ComponentFixture<LotListComponent>;
  let lotService: jasmine.SpyObj<LotService>;

  beforeEach(async () => {
    const lotServiceSpy = jasmine.createSpyObj('LotService', [
      'getLots',
      'getLotById',
      'deleteLot',
    ]);

    await TestBed.configureTestingModule({
      declarations: [LotListComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: LotService, useValue: lotServiceSpy }],
    }).compileComponents();

    lotService = TestBed.inject(LotService) as jasmine.SpyObj<LotService>;
    fixture = TestBed.createComponent(LotListComponent);
    component = fixture.componentInstance;
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait charger les lots au démarrage', () => {
    const mockLots = {
      data: [
        {
          id: '1',
          typeDocument: 'titre-foncier',
          nombreDocuments: 5,
          statut: 'cree',
          priorite: 'haute',
          dateCreation: new Date(),
        },
      ],
      pagination: { total: 1, page: 0, limit: 10 },
    };

    lotService.getLots.and.returnValue(of(mockLots));

    component.ngOnInit();

    expect(lotService.getLots).toHaveBeenCalled();
    expect(component.lots.length).toBe(1);
    expect(component.total).toBe(1);
  });

  it('devrait supprimer un lot avec confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    lotService.deleteLot.and.returnValue(of({}));
    lotService.getLots.and.returnValue(
      of({ data: [], pagination: { total: 0 } })
    );

    component.deleteLot('lot-1');

    expect(window.confirm).toHaveBeenCalled();
    expect(lotService.deleteLot).toHaveBeenCalledWith('lot-1');
  });

  it('devrait filtrer les lots par statut', () => {
    const mockLots = {
      data: [],
      pagination: { total: 0 },
    };

    lotService.getLots.and.returnValue(of(mockLots));

    component.statusFilter = 'en-cours';
    component.onFilterChange();

    expect(component.currentPage).toBe(0);
    expect(lotService.getLots).toHaveBeenCalled();
  });

  it('devrait naviguer vers la page suivante', () => {
    component.total = 30;
    component.pageSize = 10;
    component.currentPage = 0;

    lotService.getLots.and.returnValue(
      of({ data: [], pagination: { total: 30 } })
    );

    component.nextPage();

    expect(component.currentPage).toBe(1);
  });
});

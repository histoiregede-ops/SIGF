import { TestBed, ComponentFixture } from '@angular/core/testing';
import { UploadComponent } from '../upload.component';
import { UploadService } from '../../services/lot.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;
  let uploadService: jasmine.SpyObj<UploadService>;

  beforeEach(async () => {
    const uploadServiceSpy = jasmine.createSpyObj('UploadService', ['uploadPDF']);

    await TestBed.configureTestingModule({
      declarations: [UploadComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: UploadService, useValue: uploadServiceSpy }],
    }).compileComponents();

    uploadService = TestBed.inject(UploadService) as jasmine.SpyObj<UploadService>;
    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait ajouter des fichiers sélectionnés', () => {
    const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
    const fileList = {
      0: file,
      length: 1,
      item: (i: number) => (i === 0 ? file : null),
    } as any as FileList;

    component.addFiles(fileList);

    expect(component.selectedFiles.length).toBe(1);
    expect(component.selectedFiles[0].name).toBe('test.pdf');
  });

  it('devrait ignorer les fichiers non-PDF', () => {
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    const fileList = {
      0: file,
      length: 1,
      item: (i: number) => (i === 0 ? file : null),
    } as any as FileList;

    component.addFiles(fileList);

    expect(component.selectedFiles.length).toBe(0);
  });

  it('devrait supprimer un fichier', () => {
    const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
    component.selectedFiles = [file];

    component.removeFile(0);

    expect(component.selectedFiles.length).toBe(0);
  });

  it('devrait uploader les fichiers', () => {
    const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
    component.selectedFiles = [file];

    uploadService.uploadPDF.and.returnValue(
      of({
        data: {
          id: 'upload-1',
          fileName: 'test.pdf',
          statut: 'valide',
          pageCount: 5,
        },
      })
    );

    component.uploadFiles();

    expect(uploadService.uploadPDF).toHaveBeenCalled();
  });
});

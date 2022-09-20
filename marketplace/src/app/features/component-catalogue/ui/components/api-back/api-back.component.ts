import { Component, Input, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { UploadImageUseCase } from '../../../domain/usecases/upload-image/upload-image.usecase';
// import { BcAlertComponent } from '@bancolombia/design-system-web/bc-alert';
// import { BcDialogRef, BcDialogService } from '@bancolombia/design-system-web/bc-services';
import { GetVersionsComponentsUsecase } from '../../../domain/usecases/get-versions-components/get-versions-components.usecase';
import { GetComponentImplementationByVersionUsecase } from '../../../domain/usecases/get-component-implementation-by-version/get-component-implementation-by-version.usecase';
import { TechnologiesBulletComponent } from 'src/app/core/ui/general-components/technologies-bullet/technologies-bullet.component';
import { BehaviorSubject } from 'rxjs';
// import { BcInputSelectComponent } from '@bancolombia/design-system-web/bc-input-select';


const timeout = 3000;


@Component({
  selector: 'app-api-back',
  templateUrl: './api-back.component.html',
})
export class ApiBackComponent implements OnInit, AfterViewInit {
  currentTech: any;
  currentImplementation: any;
  technologies: string[];
  implementationsTable: any;

  constructor(
    private uploadImage: UploadImageUseCase,
    // private dialogService: BcDialogService,
    private getVersionsComponentsCatalogueUsecase: GetVersionsComponentsUsecase,
    private getComponentImplementationByVersionUsecase: GetComponentImplementationByVersionUsecase,
    public changeDetector: ChangeDetectorRef
  ) {
    this.implementationsTable = {};
    this.behaviorSubject = new BehaviorSubject(false);
  }

  @Input()
  canEdit = true;
  @Input()
  data;
  typeSelected = 'success';
  block = false;
  before = false;
  alertInlineStatus = '';
  // dialogRef: BcDialogRef;
  showUploader = false;
  currentUrl;
  currentVersion: any;

  behaviorSubject: BehaviorSubject<boolean>;

  @ViewChild(TechnologiesBulletComponent, { static: false }) techs: TechnologiesBulletComponent;
  // @ViewChild(BcInputSelectComponent, { static: false }) inputSelect: BcInputSelectComponent;

  availableVersionsByTech: any[];

  ngOnInit(): void {
    this.getVersionsComponentsCatalogueUsecase.invoke(this.data.id).subscribe((res) => {
      this.technologies = Object.keys(this.data.implementations).sort();
      for (const tech in res) {
        if (Object.prototype.hasOwnProperty.call(res, tech)) {
          const versions: Array<string> = res[tech];
          this.implementationsTable[tech] = {};
          versions.forEach((version) => {
            if (!this.implementationsTable[tech][version]) {
              this.implementationsTable[tech][version] = undefined;
            }
          });

        }
      }
      this.changeDetector.detectChanges();
      const defaultTech = [...this.technologies].shift();
      this.techs.selectBullet(defaultTech);
      this.currentVersion = res[this.currentTech].shift();
      this.availableVersionsByTech = this.implementationsTable[this.currentTech]
        ? Object.keys(this.implementationsTable[this.currentTech])
        : [];

      this.behaviorSubject.next(true);
      this.behaviorSubject.complete();
    });
  }

  ngAfterViewInit(): void {
    this.behaviorSubject.subscribe((isReady) => {
      if (isReady) {
        // this.inputSelect.writeValue(this.currentVersion);
        this.onSelectVersion(this.currentVersion)
      }
    });
  }

  onSelectVersion(version) {
    this.getImplementationByVersionAndTech(version, this.currentTech);
  }

  closed() {
    this.alertInlineStatus = 'Alerta inline cerrada';
  }

  open(): void {
    // this.dialogRef = this.dialogService.open(BcAlertComponent, {
    //   id: 'info-upload-component',
    //   type: 'info',
    //   title: 'Recordatorio',
    //   text: 'Recuerde subir tanto el archivo como su versión',
    //   timeout: timeout,
    //   elementRef: this.block ? 'IdElementRef' : '',
    //   insertBefore: this.before,
    // });

    // this.dialogRef.onResult().subscribe(
    //   (closed) => this.closed(),
    //   (dismissed) => {},
    //   () => {}
    // );
  }
  onSelectTech(tech) {
    this.currentTech = tech;
    this.availableVersionsByTech = this.implementationsTable[tech] ? Object.keys(this.implementationsTable[tech]) : [];
    this.getImplementationByVersionAndTech([...this.availableVersionsByTech].shift(), tech);
  }

  async getImplementationByVersionAndTech(version, tech) {
    this.currentImplementation = null;
    if (tech && version) {
      if (this.implementationsTable[tech] && this.implementationsTable[tech][version] === undefined) {
        const data = await this.getComponentImplementationByVersionUsecase
          .invoke({
            technology: tech,
            version,
            id: this.data.id,
          })
          .toPromise();
        if (data) {
          this.implementationsTable[tech][version] = data;
        }
      }
      this.currentImplementation = this.implementationsTable[tech][version];
      this.currentUrl = this.currentImplementation.apiSwagger;
    }
  }

  async getFilesAdded(file) {
    const extension = file[0].name.split('.').pop();
    const name = `components/${this.data.nameComponent}/implementations/api-service.${extension}`;
    await this.uploadImage
      .invoke({
        name,
        file: file[0],
      })
      .toPromise();
  }
  toggleValues(event) {
    if (this.showUploader === false) {
      this.open();
    }
    this.showUploader = !this.showUploader;
  }
}

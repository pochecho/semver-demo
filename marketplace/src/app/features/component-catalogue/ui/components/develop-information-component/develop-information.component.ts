import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
// import { BcInputSelectComponent } from '@bancolombia/design-system-web/bc-input-select';
import { BehaviorSubject } from 'rxjs';
import { TechnologiesBulletComponent } from 'src/app/core/ui/general-components/technologies-bullet/technologies-bullet.component';
import { StatusPage } from 'src/app/core/ui/interfaces/status-page';
import { IComponentModel } from '../../../domain/models/component/component.model';
import { IImplementationModel } from '../../../domain/models/implementation/implementation.model';
import { GetComponentImplementationByVersionUsecase } from '../../../domain/usecases/get-component-implementation-by-version/get-component-implementation-by-version.usecase';
import { GetVersionsComponentsUsecase } from '../../../domain/usecases/get-versions-components/get-versions-components.usecase';

@Component({
  selector: 'app-develop-information',
  templateUrl: './develop-information.component.html',
  styleUrls: ['./develop-information.component.css'],
})
export class DevelopInformationComponent implements OnInit, AfterViewInit {
  @ViewChild(TechnologiesBulletComponent, { static: false }) technologiesBullentComponent: TechnologiesBulletComponent;
  // @ViewChild(BcInputSelectComponent, { static: false }) inputSelectComponent: BcInputSelectComponent;
  @Input() data: IComponentModel;
  status: StatusPage;
  /**
   * List of technologies present in the component.
   * The possible technologies are: native, angular, flutter.
   *
   * @type {string[]}
   * @memberof DevelopInformationComponent
   */
  technologies: string[];

  /**
   * This is the current implementation of the component.
   * By default, the current implementation is the latest version of that implementation
   * of the component.
   *
   * @type {IImplementationModel}
   * @memberof DevelopInformationComponent
   */
  currentImplementation: IImplementationModel;

  implementationsTable;

  availableVersionsByTech: any[];
  currentTech: any;
  currentVersion: any;

  behaviorSubject: BehaviorSubject<boolean>;
  constructor(
    public changeDetector: ChangeDetectorRef,
    private getVersionsComponentsCatalogueUsecase: GetVersionsComponentsUsecase,
    private getComponentImplementationByVersionUsecase: GetComponentImplementationByVersionUsecase
  ) {
    this.implementationsTable = {};
    this.behaviorSubject = new BehaviorSubject(false);
    this.status = 'Pending';
  }
  ngAfterViewInit(): void {
    this.behaviorSubject.subscribe((isReady) => {
      if (isReady) {
        // this.inputSelectComponent.writeValue(this.currentVersion);
      }
    });
  }
  ngOnInit(): void {
    const $versions = this.getVersionsComponentsCatalogueUsecase.invoke(this.data.id);
    if ($versions) {
      this.status = 'Loaded';
      $versions.subscribe((res) => {
        this.technologies = Object.keys(this.data.implementations).sort();
        for (const tech in res) {
          if (Object.prototype.hasOwnProperty.call(res, tech)) {
            const versions: Array<string> = res[tech];
            this.implementationsTable[tech] = {};
            if (versions && versions.length > 0 && this.data.implementations[tech]) {
              this.implementationsTable[tech][[...versions].shift()] = this.data.implementations[tech];
            }
            versions.forEach((version) => {
              if (!this.implementationsTable[tech][version]) {
                this.implementationsTable[tech][version] = undefined;
              }
            });
          }
        }
        this.changeDetector.detectChanges();
        const defaultTech = [...this.technologies].shift();
        this.technologiesBullentComponent.selectBullet(defaultTech);

        this.currentVersion = res[this.currentTech].shift();
        this.availableVersionsByTech = this.implementationsTable[this.currentTech]
          ? Object.keys(this.implementationsTable[this.currentTech])
          : [];
        this.behaviorSubject.next(true);
        this.behaviorSubject.complete();
      });
    } else {
      this.status = 'Not Allowed';
    }
  }

  onSelectTech(tech) {
    this.currentTech = tech;
    this.availableVersionsByTech = this.implementationsTable[tech] ? Object.keys(this.implementationsTable[tech]) : [];
    this.getImplementationByVersionAndTech([...this.availableVersionsByTech].shift(), tech);
  }

  onSelectVersion(version) {
    this.getImplementationByVersionAndTech(version, this.currentTech);
  }
  /**
   * Gets a specific implementation given a version, and add it to the implementationsTable variable
   * @param {*} version
   * @param {*} tech
   * @param {*} id
   * @memberof DevelopInformationComponent
   */
  async getImplementationByVersionAndTech(version, tech) {
    this.currentImplementation = null;
    if (tech && version) {
      if (this.implementationsTable[tech] && this.implementationsTable[tech][version] === undefined) {
        const $version = this.getComponentImplementationByVersionUsecase.invoke({
          technology: tech,
          version,
          id: this.data.id,
        });
        if ($version) {
          $version.subscribe((data) => {
            if (data) {
              this.implementationsTable[tech][version] = data;
              this.currentImplementation = this.implementationsTable[tech][version];
            }
          });
        } else {
          this.status = 'Not Allowed';
        }
      }
      this.currentImplementation = this.implementationsTable[tech][version];
    }
  }
}

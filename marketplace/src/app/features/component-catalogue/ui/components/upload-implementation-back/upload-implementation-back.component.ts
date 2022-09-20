import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IImplementationModel } from '../../../domain/models/implementation/implementation.model';
import { UploadImageUseCase } from '../../../domain/usecases/upload-image/upload-image.usecase';
import { UploadImplementationUsecase } from '../../../domain/usecases/upload-implementation/upload-implementation.usecase';
@Component({
  selector: 'app-upload-implementation-back',
  templateUrl: './upload-implementation-back.component.html',
})
export class UploadImplementationBackComponent implements OnInit {
  @Input()
  data;
  entryFile;
  name: string;
  componentForm;
  typeSelected = 'success';
  timeout = 5000;
  block = false;
  uploadInfo = false;
  before = false;
  alertInlineStatus = '';
  // dialogRef: BcDialogRef;
  showUploader = false;
  currentUrl;
  titleAlert;
  textAlert;
  constructor(
    // private dialogService: BcDialogService,
    fb: FormBuilder,
    private uploadImage: UploadImageUseCase,
    private uploadImpl: UploadImplementationUsecase
  ) {
    this.componentForm = fb.group({
      version: '',
    });
  }
  closed() {
    this.alertInlineStatus = 'Alerta inline cerrada';
  }

  open(): void {
    // this.dialogRef = this.dialogService.open(BcAlertComponent, {
    //   id: 'info-upload-component',
    //   type: this.typeSelected,
    //   title: this.titleAlert,
    //   text: this.textAlert,
    //   timeout: this.timeout,
    //   elementRef: this.block ? 'IdElementRef' : '',
    //   insertBefore: this.before,
    // });

    // this.dialogRef.onResult().subscribe(() => this.closed());
  }
  getFilesAdded(file) {
    this.entryFile = file[0];
  }
  setValuesAlert(title: string, body: string, typeAlert: string) {
    this.titleAlert = title;
    this.textAlert = body;
    this.typeSelected = typeAlert;
  }
  setImplComponentValues(swaggerRoute): IImplementationModel {
    let infoImplComponent = {} as IImplementationModel;
    infoImplComponent.idComponent = this.data.id;
    infoImplComponent.version = this.componentForm.get('version').value;
    infoImplComponent.technology = 'java';
    infoImplComponent.apiSwagger = swaggerRoute;
    return infoImplComponent;
  }

  async doUploadImage(): Promise<string> {
    const extension = this.entryFile.name.split('.').pop();
    this.name = `components/${this.data.nameComponent}/implementations/${
      this.componentForm.get('version').value
    }/api-service.${extension}`;
    const routeOfSavedImage = await this.uploadImage
      .invoke({
        name: this.name,
        file: this.entryFile,
      })
      .toPromise();
    return routeOfSavedImage;
  }
  async uploadImplementation() {
    let routeOfSavedImage: string;
    routeOfSavedImage = await this.doUploadImage();
    let infoImplComponent = this.setImplComponentValues(routeOfSavedImage);
    this.uploadInfo = true;
    await this.uploadImpl
      .invoke(infoImplComponent)
      .toPromise()
      .catch((error) => {
        this.setValuesAlert(
          'Error',
          `Se ha presentado un error:  ${error} al ejecutar la subida del archivo `,
          'error'
        );
        this.open();
      })
      .then(() => {
        this.setValuesAlert(
          'Tarea Ejecuta éxitosamente',
          'Gracias por su contribución, ya se encuentra desplegado el Swagger',
          'success'
        );
        this.open();
        this.uploadInfo = false;
      });
  }
  ngOnInit(): void {}
}

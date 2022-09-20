import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IPhotoMicrosoftGateway } from "../../models/photo-microsoft/gateway/photo-microsoft.gateway";

@Injectable()
export class PhotoMicrosoftUseCase{
  constructor(private dataMicrosoftGateway: IPhotoMicrosoftGateway) {}
  invoke(): Observable<any> {
    return this.dataMicrosoftGateway.getPhotoMicrosoft();
  }
}
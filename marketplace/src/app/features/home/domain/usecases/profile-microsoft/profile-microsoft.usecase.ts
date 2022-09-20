import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IProfileMicrosoftGateway } from "../../models/profile-microsoft/gateway/profile-microsoft.gateway";
import { IProfileMicrosoftModel } from "../../models/profile-microsoft/profile-microsoft.model";

@Injectable()
export class ProfileMicrosoftUseCase  {
  constructor(private profileMicrosoftGateway: IProfileMicrosoftGateway) {}
  invoke(): Observable<IProfileMicrosoftModel> {
    return this.profileMicrosoftGateway.getProfileMicrosoft()
  }
}
import { Observable } from "rxjs";
import { IProfileMicrosoftModel } from "../profile-microsoft.model";

export abstract class IProfileMicrosoftGateway {
    abstract getProfileMicrosoft(): Observable<IProfileMicrosoftModel>;
}
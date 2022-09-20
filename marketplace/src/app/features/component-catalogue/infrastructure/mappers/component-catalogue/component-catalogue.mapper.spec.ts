import { async ,ComponentFixture, TestBed } from "@angular/core/testing";
import { IComponentModel } from "../../../domain/models/component/component.model";
import { ComponentMapper } from "./component-catalogue.mapper"

describe("ComponentMapper", () => {
    let component: ComponentMapper;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          providers: [ ComponentMapper ]
        });
        component = TestBed.inject(ComponentMapper);
      }));

    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should invoke Mapper', () => {
      let obj: IComponentModel = {
        implementations: {},
        image: [],
        id: "obj.id",
        nameComponent: "Onboarding",
        tags: [
          "Mobile",
          "Átomo"
        ],
        status: ""
      };
      spyOn(component, 'fromMap').and.callThrough();
      component.fromMap(obj);
      expect(component.fromMap).toHaveBeenCalled();
    });
})
import { RelationResource } from "../../../api/api-v3/hal-resources/relation-resource.service";

export class TimelineRelationElement {
  constructor(public belongsToId:string, public relation:RelationResource) {
  }

  public static workPackagePrefix(workPackageId:string) {
    return `__tl-global-element-${workPackageId}-`;
  }

  public get className():string {
    const prefix = TimelineRelationElement.workPackagePrefix(this.belongsToId);
    return `${prefix}-${this.relation.id}`;
  }
}

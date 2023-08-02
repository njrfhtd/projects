import {IProject} from "../../models/IProject";

export class SetGlobalDisable {
  static readonly type = '[Projects] Set Global Disable';
  constructor(public payload: boolean) { }
}

export class SetSelectedProject {
  static readonly type = '[Projects] Set Selected Project';
  constructor(public payload: IProject | null) { }
}

export class SetSelectedProjectById {
  static readonly type = '[Projects] Set Selected Project By Id';
  constructor(public payload: string | null) { }
}

export class ClearSelectedProject {
  static readonly type = '[Projects] Clear Selected Project';
}

export class SetProjects {
  static readonly type = '[Projects] Set Projects';
  constructor(public payload: IProject[]) { }
}

export class AddProjects {
  static readonly type = '[Projects] Add Projects';
  constructor(public payload: IProject[]) { }
}

export class SetProject {
  static readonly type = '[Projects] Set Project';
  constructor(public payload: IProject) { }
}

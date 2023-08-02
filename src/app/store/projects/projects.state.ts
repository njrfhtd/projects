import {Injectable} from '@angular/core';
import {State, Action, StateContext, Selector} from '@ngxs/store';
import {
    AddProjects, ClearSelectedProject,
    SetGlobalDisable, SetProject,
    SetProjects, SetSelectedProject, SetSelectedProjectById,
} from './projects.actions';
import {IProject} from "../../models/IProject";
import {Navigate} from "@ngxs/router-plugin";

export class ProjectsStateModel {
    public globalDisable: boolean;
    public projects: IProject[];
    public selectedProject: IProject | null;
}

const defaults = {
    globalDisable: false,
    projects: [],
    selectedProject: null,
};

@State<ProjectsStateModel>({
    name: 'projects',
    defaults
})
@Injectable()
export class ProjectsState {
    constructor(
    ) {
    }

    @Action(SetGlobalDisable)
    setGlobalDisable({patchState}: StateContext<ProjectsStateModel>, {payload}: SetGlobalDisable) {
        patchState({
            globalDisable: payload
        });
    }

    @Selector()
    static getGlobalDisable(state: ProjectsStateModel) {
        return state.globalDisable;
    }

    @Selector()
    static getSelectedProject(state: ProjectsStateModel) {
        return state.selectedProject;
    }

    @Action(SetSelectedProject)
    setSelectedProject({patchState}: StateContext<ProjectsStateModel>, {payload}: SetSelectedProject) {
        patchState({
            selectedProject: payload
        });
    }

    @Action(SetSelectedProjectById)
    setSelectedProjectById({getState, patchState}: StateContext<ProjectsStateModel>, {payload}: SetSelectedProjectById) {
        const state = getState();
        const projects = state.projects;
        const selectedProject = projects.find((project) => project.id === payload);
        patchState({
            selectedProject: selectedProject || null
        });
    }

    @Action(ClearSelectedProject)
    clearSelectedProject({patchState}: StateContext<ProjectsStateModel>) {
        patchState({
            selectedProject: null
        });
    }

    @Action(SetProjects)
    setProjects({patchState}: StateContext<ProjectsStateModel>, {payload}: SetProjects) {
        patchState({
            projects: payload
        });
    }

    @Action(AddProjects)
    addProjects({getState, patchState, dispatch}: StateContext<ProjectsStateModel>, {payload}: AddProjects) {
        const state = getState();
        const currentProjects = state.projects;
        const updatedProjects = currentProjects.map((currentProject) => {
            const updatedProjectIndex = payload.findIndex((payloadProject) => payloadProject.id === currentProject.id);
            if (updatedProjectIndex > -1) {
                const updatedProject = payload[updatedProjectIndex];
                payload.splice(updatedProjectIndex, 1);
                return updatedProject;
            }
            return currentProject;
        });

        patchState({
            projects: [...updatedProjects, ...payload]
        });

        dispatch(new Navigate(['/projects']));
    }

    @Selector()
    static getProjects(state: ProjectsStateModel) {
        return state.projects;
    }

    @Selector()
    static getProject(state: ProjectsStateModel) {
        return (id: string) => {
            return state.projects.filter((project) => project.id === id)[0];
        };
    }

    @Action(SetProject)
    setProject({getState, setState, dispatch}: StateContext<ProjectsStateModel>, {payload}: SetProject) {
        const state = getState();
        const updatedProjects = state.projects.map((project) => project.id === payload.id ? payload : project);
        setState({
            ...state,
            projects: updatedProjects,
            selectedProject: payload,
        });
        dispatch(new ClearSelectedProject());
    }
}

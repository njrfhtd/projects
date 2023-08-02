import {Component, OnDestroy} from '@angular/core';
import {Actions, ofActionSuccessful, Store} from "@ngxs/store";
import {RouterDataResolved} from "@ngxs/router-plugin";
import {Subject, takeUntil} from "rxjs";
import {ILink} from "./models/ILink";
import {SetSelectedProjectById} from "./store/projects/projects.actions";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
    links: ILink[] = [
        {
            label: 'Данные',
            path: '/',
        },
        {
            label: 'Проекты',
            path: '/projects',
        },
    ];

    activeLink: ILink;

    private destroy$ = new Subject<void>();

    constructor(
        actions$: Actions,
        private store: Store,
    ) {
        this.activeLink = this.links[0];
        actions$.pipe(
            ofActionSuccessful(RouterDataResolved),
            takeUntil(this.destroy$)
        ).subscribe((action) => {
            const routerState: any = action.routerState as any;
            const actionUrl: string = routerState.url;
            if (!!routerState.root.firstChild.params.id) {
                this.store.dispatch(new SetSelectedProjectById(routerState.root.firstChild.params.id));
            }
            this.activeLink = this.links.find((link) => actionUrl.split(';')[0] === (link.path)) || this.links[0];
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }
}

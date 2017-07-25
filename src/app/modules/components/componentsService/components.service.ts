import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ComponentsService {
    private componentsResource: string = '/data/';

    private emptyComponent = {
        sections : [
            {
                "id": "empty-overview",
                "type": "title-text",
                "title": "Component in the works",
                "content": "This component is been designed and developed."
            }
        ]
    }

    constructor(private http: Http) {}

    getComponentList(): Observable<any> {
        let components =
            this.http
                .get(this.componentsResource + 'index.json')
                .map( (res:Response) => res.json() );
        return components;
    }

    getComponent(category, id: string): Observable<any> {
        let component =
            this.http
                .get(this.componentsResource + 'components/' + category + '/' + id + '/' + id + '.json')
                .map( (res:Response) => res.json() )
                .catch( (err: Response) => Observable.of(this.getEmptyComponent(id)));
        return component;
    }

    getComponentSampleCode(category, id: string, codeFile: string): Observable<any> {
        let component =
            this.http
                .get(this.componentsResource + 'components/' + category + '/' + id + '/' + codeFile)
                .map( (res:Response) => res.text() );
        return component;
    }

    getEmptyComponent(id: string) {
        var emptyComponent = this.emptyComponent;
        emptyComponent.sections[0].title = id;

        return emptyComponent;
    }
}
import { Pipe, PipeTransform } from '@angular/core';
import { FileIndex, indexIdMap } from '@runejs/filestore';

@Pipe({
    name: 'indexName'
})
export class IndexNamePipe implements PipeTransform {

    transform(value: FileIndex): string {
        if(!value || value.indexId === undefined) {
            return '';
        }

        let indexName = '?';

        Object.keys(indexIdMap).forEach(name => {
            if(indexIdMap[name] === value.indexId) {
                indexName = name;
            }
        });

        return indexName;
    }

}

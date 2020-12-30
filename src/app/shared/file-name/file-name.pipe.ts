import { Pipe, PipeTransform } from '@angular/core';
import { Archive, FileData } from '@runejs/filestore';

const fileNames = require('../../../../filestore/file-names.json');
const mapFileNames = require('../../../../filestore/map-file-names.json');


@Pipe({
    name: 'fileName'
})
export class FileNamePipe implements PipeTransform {

    transform(value: Archive | FileData): string {
        if(!value || !value.nameHash) {
            return '';
        }

        const fileName = fileNames[`${value.nameHash}`] || mapFileNames[`${value.nameHash}`] || null;
        return fileName || '';
    }

}

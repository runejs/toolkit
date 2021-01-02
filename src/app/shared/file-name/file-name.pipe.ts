import { Pipe, PipeTransform } from '@angular/core';
import { Archive, FileData, FileIndex, indexIdMap } from '@runejs/filestore';

const fileNames = require('../../../../filestore/file-names.json');
const mapFileNames = require('../../../../filestore/map-file-names.json');


@Pipe({
    name: 'fileName'
})
export class FileNamePipe implements PipeTransform {

    transform(value: Archive | FileData, index?: FileIndex): string {
        if(!value || !value.nameHash) {
            return '';
        }

        let fileName: string = fileNames[`${value.nameHash}`] || mapFileNames[`${value.nameHash}`] || '';

        if(index && fileName) {
            if(index.indexId === indexIdMap.music) {
                fileName = fileName.replace(/ /g, '_');
                fileName += '.mid';
            }
        }

        return fileName;
    }

}

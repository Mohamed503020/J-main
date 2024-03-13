import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UploadFileModel } from '../models/upload-file.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private _HttpClient: HttpClient) {
  }

  uploadFile(model: UploadFileModel) {
    const formData = new FormData();
    formData.append('image', model.image);
    return this._HttpClient.post("https://api.imgbb.com/1/upload", formData, {
      params: { key: environment.imgbbKey },
    });

  }
}

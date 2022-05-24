import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IFolderCreate } from 'src/Models/IFolderCreate';
import { INode } from 'src/Models/INode';

@Injectable({
  providedIn: 'root'
})
export class FoldersService {

  public data: INode;
  public current: INode;
  
  constructor(private http:HttpClient) { }

  private baseUrl = environment.baseUrl;
  
  getFolders() {
    return this.http.get<INode>(this.baseUrl + "folders");
  }

  createFolder(folderCreateDTO: IFolderCreate) {
    return this.http.post<INode>(this.baseUrl + "folders/create", folderCreateDTO);
  }
}

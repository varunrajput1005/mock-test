import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { BehaviorSubject, lastValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  base: string = environment.API_URL;
  updateImg: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(public http: HttpClient) {
  }

  get(path: string, options?: any) {
    return lastValueFrom(this.http.get(this.base + path, options))
  }
  getRequest(path: string, options?: any) {
    return this.http.get(this.base + path, options);
  }
  post(path: string, data: any, options?: any) {
    return lastValueFrom(this.http.post(this.base + path, data, options))
  }
  postRequest(path: string, data: any, options?: any) {
    return this.http.post(this.base + path, data, options);
  }

  put(path: string, data: any, options?: any) {
    return lastValueFrom(this.http.put(this.base + path, data, options))
  }

  delete(path: string, data: any, options?: any) {
    return lastValueFrom(this.http.delete(this.base + path, options))
  }
  updateProfileImg(value: boolean) {
    this.updateImg.next(value);
  }
  async uploadImage(file: any) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return await this.post('uploadGetUrl', formData)
  }
}

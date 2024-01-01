import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor() {}

  public getIconPath(iconName: string) {
    return `../assets/icons/${iconName}.svg`;
  }
  public getImagePath(imageName: string, ext = 'png') {
    return `../assets/images/${imageName}.${ext}`;
  }
}

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

  public gotoSection(hash: string, yOffset: number = -90) {
    setTimeout(() => {
      const div = document.getElementById(hash);
      if (!div) return;
      const y = div.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }, 100);
  }

  //
  formatTags(tags: string[]) {
    const str = tags.join(', ');
    const lastCommaIndex = str.lastIndexOf(',');
    const modifiedStr =
      str.slice(0, lastCommaIndex) + ' and' + str.slice(lastCommaIndex + 1);
    return modifiedStr;
  }
}

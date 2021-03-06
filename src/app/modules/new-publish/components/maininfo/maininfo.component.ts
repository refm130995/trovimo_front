import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {MainInfo} from '../../../../models/main-info';
import {DomSanitizer} from '@angular/platform-browser';
import {MapService} from '../../../../services/map/map.service';

@Component({
  selector: 'app-maininfo',
  templateUrl: './maininfo.component.html',
  styleUrls: ['./maininfo.component.scss']
})
export class MaininfoComponent implements OnInit {
  @Input() type;
  @Input() optionType;
  @Input() mainInfo: MainInfo;
  @Input() images = [];
  @Input() imagesReader = [];
  @Input() videos = [];
  @Input() videosReader = [];
  @Output() setMainInfo = new EventEmitter();
  years = [];
  plans = [{}];
  typesp = [{}];
  videoUrl: string;
  coordinates = '';
  showCoordinates = false
  constructor(
    private sanitizer: DomSanitizer,
    private mapService: MapService
  ) {
  }

  ngOnInit(): void {
    this.getYearBuilt();
    this.coordinates = this.mainInfo.lon + ',' + this.mainInfo.lat;
  }
  getYearBuilt(): any {
    const actualYear = new Date().getFullYear();
    for (let i = 0; i < 100; i++) {
      this.years[i] = actualYear - i;
    }
  }
  addImage(files): void {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    this.images.push(files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imagesReader.push(reader.result);
    };
    this.emitData();
  }
  removeImage(index): void {
    this.imagesReader.splice(index, 1);
    this.images.splice(index, 1);
    this.emitData();
  }
  addVideo(files): void {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/video\/*/) == null) {
      return;
    }
    this.videos.push(files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.videosReader.push(reader.result);
    };
    this.emitData();
  }
  addVideoUrl(): void {
    if (this.videoUrl === '') {
      return;
    }
    this.videos.push(this.videoUrl);
    this.videosReader.push( this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl));
    this.videoUrl = '';
  }
  isVideoUrl(index): boolean {
    return typeof this.videos[index] === 'string';
  }
  removeVideo(index): void {
    this.videosReader.splice(index, 1);
    this.videos.splice(index, 1);
    this.emitData();
  }
  onChange(): void {
    this.emitData();
  }
  emitData(): void {

    this.setMainInfo.emit({
      mainInfo: this.mainInfo,
      images: this.images,
      videos: this.videos,
      imagesReader: this.imagesReader,
      videosReader: this.videosReader
    });
  }
  setCoordinates(): void {
    const coordinates = this.coordinates.split(',');
    this.mainInfo.lon = coordinates[0];
    this.mainInfo.lat = coordinates[1];
    console.log(this.coordinates);
    this.mapService.changeCenterMap(this.mainInfo.lon,  this.mainInfo.lat);
  }
  changeCountry(): void {
    switch (this.mainInfo.country) {
      case 'Colombia': {
        this.mapService.changeCenterMap('-73.129056', '3.06508799999999');
        this.mainInfo.city = '';
        this.mainInfo.postal_code = '';
        break;
      }
      case 'Switzerland': {
        this.mapService.changeCenterMap('17.6754094331351', '64.9648751621697');
        this.mainInfo.city = '';
        this.mainInfo.postal_code = '';
        break;
      }
    }
    this.emitData();
  }
  addPlans(): void {
    this.plans.push({});
  }
  addProperty(): void {
    this.typesp.push({});
  }
}

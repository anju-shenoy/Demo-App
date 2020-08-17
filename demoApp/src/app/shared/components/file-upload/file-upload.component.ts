import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  public imagePath;
  @Input() id ;
  imgURL: any;
  public message: string;

  constructor() {}

  ngOnInit(): void {
    if (this.id) {
      this.imgURL = JSON.parse(localStorage.getItem('currentPhoto'));
    }
  }

  preview = (files) => {
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      const profilePhoto = this.imgURL;
      localStorage.removeItem('currentPhoto');
      localStorage.setItem('currentPhoto', JSON.stringify(profilePhoto));
    };
  };
}

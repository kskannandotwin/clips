import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  isDragOver = false;
  file: File | null = null;
  nextStep = false;

  title = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);
  uploadForm = new FormGroup({
    title: this.title
  });

  storeFile($event: Event) {
    this.isDragOver = false;

    this.file = ($event as DragEvent).dataTransfer?.files.item(0) ?? null;
    if (!this.file || this.file.type !== 'video/mp4') {
      return
    }

    this.title.setValue(
      this.file.name.replace(/\.[^/.]+$/, '')
    );
    this.nextStep = true;
  }

  uploadFile() {
    console.log('File uploaded');
  }

}

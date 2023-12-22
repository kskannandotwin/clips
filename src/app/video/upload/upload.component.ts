import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { v4 as uuid } from 'uuid';
import { last, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  isDragOver = false;
  file: File | null = null;
  nextStep = false;
  showAlert = false;
  alertColor = 'blue';
  alertMsg = 'Please wait! Your clip is being uploaded.';
  inSubmission = false;
  percentage = 0;
  showPercentage = false;
  user: firebase.User | null = null;

  title = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);
  uploadForm = new FormGroup({
    title: this.title
  });

  constructor(
    private storage: AngularFireStorage,
    private auth: AngularFireAuth
    ) {
      auth.user.subscribe(user => this.user = user);
    }

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
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait! Your clip is being uploaded.';
    this.inSubmission = true;
    this.showPercentage = true;
    
    const clipFileName = uuid();
    const clipPath = `clips/${clipFileName}.mp4`;

    const task = this.storage.upload(clipPath, this.file);
    const clipRef = this.storage.ref(clipPath);

    task.percentageChanges().subscribe(progress => {
      this.percentage = progress as number / 100;
    });

    task.snapshotChanges().pipe(
      last(),
      switchMap(() => clipRef.getDownloadURL())
    ).subscribe({
      next: (url) => {
        const clip = {
          uid: this.user?.uid,
          displayName: this.user?.displayName,
          title: this.title.value,
          fileName: `${clipFileName}.mp4`,
          url
        }
        console.log(clip);
        this.alertColor = 'green';
        this.alertMsg = 'Success! Your clip is now ready to share with the World';
        this.showPercentage = false;
      },
      error: (error) => {
        this.alertColor = 'red';
        this.alertMsg = 'Upload failed! Please try again later';
        this.inSubmission = true;
        this.showPercentage = false;
        console.error(error);
      }
    });
  }

}

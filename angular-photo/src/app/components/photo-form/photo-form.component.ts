import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { PhotoService } from "../../services/photo.service";

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  file: File;
  photoSelected: string | ArrayBuffer;
  // lo instancio en el constructor: PhotoService
  constructor(private photoService: PhotoService, private router: Router) { }

  ngOnInit() {
  }

  onPhotoSelected(event: HtmlInputEvent): void{
    // Me estan subiendo algo????
    if(event.target.files && event.target.files[0]){
      this.file = <File>event.target.files[0]
      // Previa de la imagen
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  uploadPhoto(title: HTMLInputElement, description: HTMLTextAreaElement): boolean{
    this.photoService.createPhoto(title.value,description.value,this.file)
      .subscribe(res => {
        this.router.navigate(['/photos']);
      }, err => console.log(err)) //escuchar respuesta y error
    return false;
  }

}

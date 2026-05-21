import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TypesMedia } from '../../../data/enums/TypesMedia';
import { getClassWithColor } from 'file-icons-js';

@Component({
  selector: 'app-custom-file-picker',
  templateUrl: './custom-file-picker.component.html',
  styleUrls: ['./custom-file-picker.component.scss']
})
export class CustomFilePickerComponent implements OnInit {

  @Input() inputID!: string
  @Input() multiple: boolean = false
  @Input() mediaType: TypesMedia = TypesMedia.IMAGE
  @Output() onFileChanged: EventEmitter<File | null> = new EventEmitter()
  @Output() onFilesChanged: EventEmitter<File[] | null> = new EventEmitter()

  readonly typesMedia = TypesMedia
  file?: File
  media?: string

  files?: File[] = []
  medias?: string[] = []

  isOver: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  update(file: File | null): void {
    this.onFileChanged.emit(file)
  }

  updateFiles(files: File[] | null): void {
    this.files = files ?? undefined
    this.onFilesChanged.emit(files)
  }

  reset(): void {
    this.removeFile()
  }

  onDropFile(event: any): void {
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();

    var mediaFiles: any[] = []
    if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...event.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
          const file = item.getAsFile();
          mediaFiles.push(file)
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...event.dataTransfer.files].forEach((file, i) => {
        mediaFiles.push(file)
      });
    }

    let multipleAcceptedFilesCount: number = 0
    for (let index = 0; index < mediaFiles.length; index++) {
      const mediaFile = mediaFiles[index];

      const type: string = mediaFile.type
      if (type) {
        let isAccepted: boolean = false
        switch (this.mediaType) {
          case TypesMedia.IMAGE:
            isAccepted = ['image/png', 'image/jpg', 'image/jpeg'].includes(type)
            console.log(TypesMedia.IMAGE + ': ' + isAccepted)
            break;

          case TypesMedia.VIDEO:
            isAccepted = type.includes('video/')
            console.log(TypesMedia.VIDEO + ': ' + isAccepted)
            break;

          case TypesMedia.PDF:
            // isAccepted = type.includes('video/')
            console.log(TypesMedia.PDF + ': ' + isAccepted)
            break;

          case TypesMedia.TIFF:
            // isAccepted = type.includes('video/')
            console.log(TypesMedia.TIFF + ': ' + isAccepted)
            break;

          case TypesMedia.ALL:
            isAccepted = true
            console.log(TypesMedia.ALL + ': ' + isAccepted)
            break;

          default:
            break;
        }

        if (isAccepted) {
          if (!this.multiple) {
            this.media = mediaFile.name
            this.update(mediaFile)

            let mediaInputElement: any = document.getElementById(this.inputID)
            mediaInputElement!.files = event.dataTransfer.files
          }
          else {
            multipleAcceptedFilesCount += 1
          }
        }
        else {
          console.log("Not accepted")
        }
      }
    }

    if (multipleAcceptedFilesCount == mediaFiles.length) {
      this.medias = mediaFiles.map(value => value.name)
      this.updateFiles(mediaFiles)

      let mediaInputElement: any = document.getElementById(this.inputID)
      mediaInputElement!.files = event.dataTransfer.files
    }
    else {
      console.log("Not accepted")
    }

    this.isOver = false
  }

  removeFile(): void {
    this.update(null)
    this.media = undefined
    let mediaInputElement: any = document.getElementById(this.inputID)
    mediaInputElement!.value = ''
  }

  removeFiles(mediaIndex: number): void {
    this.medias = this.medias?.filter((value, index) => index != mediaIndex)
    this.files = this.files?.filter((value, index) => index != mediaIndex)
    this.updateFiles(this.files ?? null)

    if (this.medias?.length == 0) {
      this.updateFiles(null)
      let mediaInputElement: any = document.getElementById(this.inputID)
      mediaInputElement!.value = ''
    }
  }

  onDragOver(event: DragEvent): void {
    this.isOver = true
    event.preventDefault();
  }

  onDragEnter(): void {
    this.isOver = true
  }

  onDragLeave(): void {
    this.isOver = false
  }

  onFileChange(event: any): void {
    if (!this.multiple) {
      this.file = event.target.files[0]
      this.file == undefined ? this.update(null) : this.update(this.file)

      this.media = event.target.files[0].name
      console.log(this.media)
    }
    else {
      this.files = []
      for (let index = 0; index < event.target.files.length; index++) {
        this.files.push(event.target.files[index])
      }
      this.files == undefined ? this.updateFiles(null) : this.updateFiles(this.files)

      this.medias = this.files.map((file: File) => file.name)
      console.log(this.medias)
    }
  }

  getFichierRessourceIcone(nomFichier: string): string {
    return getClassWithColor(nomFichier)
  }
}

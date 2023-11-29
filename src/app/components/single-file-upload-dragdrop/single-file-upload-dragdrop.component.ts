import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-single-file-upload-dragdrop',
  templateUrl: './single-file-upload-dragdrop.component.html',
  styleUrls: ['./single-file-upload-dragdrop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleFileUploadDragdropComponent implements OnInit {
  // TODO Sayed: Emit the added file
  @Input() FGN: FormGroup;
  @Input() FCN: string;
  @Input() dialogId: string;
  @Output() file = new EventEmitter<any>();
  Image: Observable<any>;
  imageUrl: string;
  filesAdded: File;
  constructor() {}

  ngOnInit(): void {
    this.Image = this.FGN.value[this.FCN]
      ? of(this.FGN.value[this.FCN])
      : of(null);
    this.imageUrl = this.FGN.value[this.FCN];
  }

  async addImage(event) {
    this.filesAdded = event.target.files[0];
    let blob = this.convertFileToBlob(this.filesAdded);
    blob.subscribe((res) => (this.imageUrl = res));
    this.Image = blob.pipe(map((res) => res));
    // this.file.emit(filesAdded);
  }

  convertFileToBlob(file: File): Observable<string> {
    // What it does:
    // the name is self explainatory
    const sub = new Subject<string>();
    var reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (item) => {
      const content: string = item.target.result as string;
      sub.next(content);
      sub.complete();
    };
    return sub.asObservable();
  }

  removeImage = () => {
    this.Image = null;
  };

  cancelClick() {
    this.Image = null;
  }
  confirmClick() {
    // console.log(this.filesAdded);
    this.file.emit(this.filesAdded);
    this.Image = null;
  }
}

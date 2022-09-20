import { Component, ElementRef, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ContentChange, QuillEditorComponent } from 'ngx-quill'
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';
@Component({
  selector: 'app-doc-fill',
  templateUrl: './doc-fill.component.html',
  styleUrls: ['./doc-fill.component.scss']
})
export class DocFillComponent implements OnInit {
  form: FormGroup;
  safeHtml: SafeHtml;
  defaultHTML = '<h3 class="ql-align-center"><strong>Este contenido no está disponible por el momento.</strong></h3><p class="ql-align-center"><img src="https://showcase-sdb.apps.bancolombia.com/assets/icons/illustrations/il-networking.svg"></p><p class="ql-align-center"><br></p>';
  @Input() hide = false;
  @Input() canEdit = true;
  @Input() initialHTML;
  @Output() editedData = new EventEmitter<string>();
  @Output() acceptedChanges = new EventEmitter<boolean>();

  @ViewChild('editor', {
    static: true
  }) editor: QuillEditorComponent
  constructor(fb: FormBuilder, private sanitizer: DomSanitizer) {
    this.form = fb.group({
      editor: [this.defaultHTML]
    })
  }

  ngOnInit(): void {
    this.form.get('editor')
      .setValue([this.initialHTML == null ? this.defaultHTML : this.initialHTML]);
    this.form.get('editor').patchValue(this.initialHTML == null ? this.defaultHTML : this.initialHTML);
    this.form
      .controls
      .editor
      .valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((data) => {
        this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(data)
        this.editedData.emit(this.form.get('editor').value)
      }
      )

  }
  updateData() {
    this.toggleValues();
    this.editedData.emit(this.form.get('editor').value);
    this.acceptedChanges.emit(true);
  }
  toggleValues() {
    this.hide = !this.hide;
  }
}

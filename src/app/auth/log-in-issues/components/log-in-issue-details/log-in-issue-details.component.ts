import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { LogInIssuesDetailsFormInterface } from '../../forms-interface/log-in-issues-details.form-interface';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { AuthService } from 'src/app/auth/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import { SubSink } from 'subsink';
import { StaticDataLogIssuesDto } from 'src/app/auth/shared/dtos/log-in-issues.dto';
import { DetailChildOfLoginIssueTypeEntityNgrxModel, LoginIssueTypeEntityNgrxModel } from 'src/app/core/states/entities/login-issue-type.entity';
import { ToastrService } from 'ngx-toastr';
import { FileService } from 'src/app/auth/shared/services/file.service';
import { RecaptchaComponent } from 'ng-recaptcha';
import { ConstantService } from 'src/app/auth/shared/services/constant.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/states/app-state';
import { constantSelectors } from 'src/app/core/states/constant/constant.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in-issue-details',
  templateUrl: './log-in-issue-details.component.html',
  styleUrls: ['./log-in-issue-details.component.scss']
})
export class LogInIssueDetailsComponent implements AfterViewInit {
  private subs = new SubSink();
  rForm!: FormGroup<LogInIssuesDetailsFormInterface>;
  reCaptchaKey = environment.siteKey;
  contactMethodArr: StaticDataLogIssuesDto[] = [];

  allowedUploadedFileDepositReceipt: string[] = ['png', 'jpg', 'apng', 'pdf'
    , 'gif', 'jpeg', 'pjpeg', 'webp', 'svg', 'xlsx', 'zip', 'rar', 'doc', 'docx', 'PNG', 'JPG',
    'APNG', 'PDF', 'GIF', 'JPEG', 'PJPEG', 'WEBP', 'SVG', 'XLSX', 'ZIP', 'RAR', 'DOC', 'DOCX']

  preferredCountries$ = this._Store.select(constantSelectors.preferredPhoneCountries)


  get fCtrls() {
    return this.rForm.controls;
  }

  get countryISO() {
    return CountryISO;
  }

  get searchCountryField() {
    return SearchCountryField;
  }
  @Output() onBackEmit = new EventEmitter();

  @Input() lvl1!: LoginIssueTypeEntityNgrxModel | null;
  @Input() lvl2!: DetailChildOfLoginIssueTypeEntityNgrxModel | null;
  @Input() guestIp!: string | null;

  @ViewChild('fileAttachmentElem') fileAttachmentElem!: ElementRef;
  @ViewChild('reCaptchaElem') reCaptchaElem!: RecaptchaComponent;
  @ViewChild("nForm", { static: false }) nForm!: NgForm;

  constructor(private _AuthService: AuthService, private _FormBuilder: FormBuilder,
    private _ToastrService: ToastrService, private _FileService: FileService,
    private _ConstantService: ConstantService, private _Store: Store<AppState> ,
    private _Router:Router) {
  }

  ngAfterViewInit(): void {
    console.log(this.fileAttachmentElem);
  }

  ngOnInit(): void {
    this.rForm = this._FormBuilder.group<LogInIssuesDetailsFormInterface>({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
      selectedCountryISO: new FormControl(CountryISO.SaudiArabia),
      contactMethod: new FormControl(null, [Validators.required]),
      fileUrl: new FormControl(null),
      reCaptcha: new FormControl(null),
    })

  }

  onBack() {
    this.onBackEmit.emit()
  }

  onFileChange(event: any): any {
    if (event.target.files.length > 0) {

      let file = event.target.files[0]
      const isNotAllowedSize = this.checkFileSize(file);
      if (isNotAllowedSize) {
        return false;
      }

      const fileIsAllowed = this.checkIfUploadedFileAllowed(file)
      if (fileIsAllowed == false) {
        this._ToastrService.warning("يجب أن يكون الملف من النوع: mimes:png,jpg,apng,gif,jpeg,pjpeg,webp,svg,pdf,doc,docx")
        return false;
      }

      this.uploadImgToCdn(file)
    }
  }

  onSave() {
    this._ConstantService.createErrorInLogin({
      name: this.fCtrls.name.value!,
      email: this.fCtrls.email.value!,
      mobile: this.fCtrls.phone.value.e164Number!,
      contactOption: this.fCtrls.contactMethod.value!,
      imgUrl: this.fCtrls.fileUrl.value!,
      ip: this.guestIp!,
      mainError: this.lvl1?.name!,
      subError: this.lvl2?.id!,
    }).subscribe((res) => {
      this._ToastrService.success('تم ارسال البيانات بنجاح')
      this.resetForm();
    }, (error) => {
      this._ToastrService.error('حدث خطأ اثناء ارسال البيانات');
      this.reCaptchaElem.reset();
    })
  }

  openFile() {
    window.open(this.fCtrls.fileUrl.value!, "_blank");
  }

  private checkFileSize(file: File) {
    const fileSize = +(file.size / 1024 / 1024).toFixed(4)
    if (fileSize > environment.maxUploadSize) {
      this._ToastrService.warning(`يجب أن يكون حجم الملف أقل من ${environment.maxUploadSize} ميجا بايت`, "حجم الملف كبير")
      this.fileAttachmentElem.nativeElement.value = null
      return true
    }
    return false
  }

  private uploadImgToCdn(file: File) {
    if (file) {
      this._FileService.uploadFile({
        image: file
      }).subscribe((res: any) => {
        this.fCtrls.fileUrl.patchValue(res.data.url);
      }, (error) => {
        this._ToastrService.error("حدث خطأ أثناء رفع الملف", "خطأ")
      }
      )
    }
  }

  private checkIfUploadedFileAllowed(file: File): boolean {
    const lastDotIndex = file.name.lastIndexOf('.')
    var fileExtension = file.name.substring(lastDotIndex + 1)
    if (this.allowedUploadedFileDepositReceipt.includes(fileExtension)) {
      return true
    }
    return false
  }

  private resetForm() {
    console.log(this.fileAttachmentElem);
    this.rForm.reset()
    this.reCaptchaElem.reset()
    this.fileAttachmentElem.nativeElement.value = null;
    this.nForm.resetForm()
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormGroup, NonNullableFormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { UnitMeseare } from 'src/app/models/uit-meseare.model';
import { UnitMerseareService } from 'src/app/service/unit-merseare.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-unit-meseare',
  templateUrl: './unit-meseare.component.html',
  styleUrls: ['./unit-meseare.component.scss']
})
export class UnitMeseareComponent implements OnInit {
  listUnitMeasure: UnitMeseare[] = [];
  validateForm!: FormGroup;
  searchQuery!: string;
  searchTerms = new Subject<string>();
  displayedCategory: UnitMeseare[] = [];
  search: string = '';




  constructor(private service: UnitMerseareService, private fb: NonNullableFormBuilder, private cdr: ChangeDetectorRef,) {
    this.validateForm = this.fb.group({
      id: ['', null],
      symbole: ['', [Validators.required]],
      libelle: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => this.service.searchUnitMeseare(term))
      )
      .subscribe((data: { data: UnitMeseare[] }) => {
        this.listUnitMeasure = data.data || [];
        this.displayedCategory = this.listUnitMeasure.slice(0, 10);

        this.cdr.detectChanges();
      });
    this.getAllUnite();
  }

  resetForm(e: MouseEvent): void {
    //console.log("Rest : ", e)
    e.preventDefault();
    this.validateForm.reset();
  }


  libelleAsyncValidator: AsyncValidatorFn = (control: AbstractControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === "") {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 500);
    });


  getAllUnite() {
    this.service.getAllUnitMeseare().subscribe((response: any) => {
      this.listUnitMeasure = response.data;
    });
  }

  submitForm(): void {

    const formData = this.validateForm.value;

    if (formData.id == '') {
      this.service.addUnitMeseare(formData).subscribe((response: any) => {
        Swal.fire({
          title: "",
          text: response.message,
          icon: "info"
        });
        this.getAllUnite();
      });

    } else {
      console.log("Form Data 2 : ", formData.id)
      this.service.updateUnitMeseare(formData.id, formData).subscribe((response: any) => {
        Swal.fire({
          title: "",
          text: response.message,
          icon: "info"
        });
        this.getAllUnite();

      });

    }
    this.validateForm.reset();


  }

  getUnite(unite: UnitMeseare) {
    console.log("Donnée : ", unite)
    this.validateForm = this.fb.group({
      id: [unite != null ? unite.id : null, null],
      symbole: [unite != null ? unite.symbole : null,],
      libelle: [unite != null ? unite.libelle : null,],
    });
    window.scrollTo(0, 0);
  }

  deleteUnite(unite: UnitMeseare) {
    this.service.deleteUnitMeseare(unite.id!).subscribe((response: any) => {
      Swal.fire({
        title: "",
        text: response.message,
        icon: "info"
      });
      this.getAllUnite();
    });
  }
  searchUint(term: string): void {
    this.searchTerms.next(term);
  }

  autoSearch() {
    if (!this.searchQuery) {
      this.getAllUnite();
    } else {
      this.searchUint(this.searchQuery);
    }
  }

  filterProducts() {
    this.listUnitMeasure.filter(unite => {
      return (
        unite.libelle?.toLowerCase().includes(this.search.toLowerCase()),
        unite.symbole?.toLowerCase().includes(this.search.toLowerCase())
      );
    });

  }
}

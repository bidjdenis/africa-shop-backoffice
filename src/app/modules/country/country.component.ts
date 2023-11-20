import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, AsyncValidatorFn, AbstractControl, ValidationErrors, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject, Observable, Observer, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Country } from 'src/app/models/country.model';
import { CountryService } from 'src/app/service/country.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  isVisible = false;
  isOkLoading = false;
  listCateory: Country[] = [];
  validateForm!: FormGroup;
  searchQuery!: string;
  searchTerms = new Subject<string>();
  displayedCountry: Country[] = [];
  search: string = '';

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



  constructor(private service: CountryService, private modal: NzModalService, private fb: NonNullableFormBuilder, private cdr: ChangeDetectorRef,) {
    this.validateForm = this.fb.group({
      id: ['', null],
      libelle: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => this.service.searchCountry(term))
      )
      .subscribe((data: { data: Country[] }) => {
        this.listCateory = data.data || [];
        this.displayedCountry = this.listCateory.slice(0, 10);

        this.cdr.detectChanges();
      });
    this.getAllCountry();
  }

  submitForm(): void {

    const formData = this.validateForm.value;

    if (formData.id == '') {
      this.service.addCountry(formData).subscribe((response: any) => {
        Swal.fire({
          title: "",
          text: response.message,
          icon: "info"
        });
        this.getAllCountry();
      });

    } else {
      console.log("Form Data 2 : ", formData.id)
      this.service.updateCountry(formData.id, formData).subscribe((response: any) => {
        Swal.fire({
          title: "",
          text: response.message,
          icon: "info"
        });
        this.getAllCountry();

      });

    }
    this.validateForm.reset();


  }


  getAllCountry() {
    this.service.getAllCountry().subscribe((response: any) => {
      this.listCateory = response.data;
    });
  }

  getCountry(Country: any) {
    console.log("Donnée : ", Country)
    this.validateForm = this.fb.group({
      id: [Country != null ? Country.id : null, null],
      libelle: [Country != null ? Country.libelle : null,],
    });
    window.scrollTo(0, 0);
  }




  deleteCountry(Country: any) {

    this.service.deleteCountry(Country.id).subscribe((response: any) => {
      Swal.fire({
        title: "",
        text: response.message,
        icon: "info"
      });
      this.getAllCountry();
    });
  }
  searchCatgory(term: string): void {
    this.searchTerms.next(term);
  }

  autoSearch() {
    if (!this.searchQuery) {
      this.getAllCountry();
    } else {
      this.searchCatgory(this.searchQuery);
    }
  }

  filterProducts() {
    this.listCateory.filter(Country => {
      return (
        Country.libelle?.toLowerCase().includes(this.search.toLowerCase())

      );
    });

  }

}

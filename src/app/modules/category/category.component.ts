import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AsyncValidatorFn, AbstractControl, ValidationErrors, ValidatorFn, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, Observer, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  isVisible = false;
  isOkLoading = false;
  listCateory: Category[] = [];
  validateForm!: FormGroup;
  searchQuery!: string;
  searchTerms = new Subject<string>();
  displayedCategory: Category[] = [];
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



  constructor(private service: CategoryService, private modal: NzModalService, private fb: NonNullableFormBuilder, private cdr: ChangeDetectorRef,) {
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
        switchMap((term: string) => this.service.searchCategorie(term))
      )
      .subscribe((data: { data: Category[] }) => {
        this.listCateory = data.data || [];
        this.displayedCategory = this.listCateory.slice(0, 10);

        this.cdr.detectChanges();
      });
    this.getAllCategory();
  }

  submitForm(): void {

    const formData = this.validateForm.value;

    if (formData.id == '') {
      this.service.addCategorie(formData).subscribe((response: any) => {
        Swal.fire({
          title: "",
          text: response.message,
          icon: "info"
        });
        this.getAllCategory();
      });

    } else {
      console.log("Form Data 2 : ", formData.id)
      this.service.updateCategorie(formData.id, formData).subscribe((response: any) => {
        Swal.fire({
          title: "",
          text: response.message,
          icon: "info"
        });
        this.getAllCategory();

      });

    }
    this.validateForm.reset();


  }


  getAllCategory() {
    this.service.getAllCategorie().subscribe((response: any) => {
      this.listCateory = response.data;
    });
  }

  getCategory(category: any) {
    console.log("Donnée : ", category)
    this.validateForm = this.fb.group({
      id: [category != null ? category.id : null, null],
      libelle: [category != null ? category.libelle : null,],
    });
    window.scrollTo(0, 0);
  }




  deleteCategory(category: any) {

    this.service.deleteCategorie(category.id).subscribe((response: any) => {
      Swal.fire({
        title: "",
        text: response.message,
        icon: "info"
      });
      this.getAllCategory();
    });
  }
  searchCatgory(term: string): void {
    this.searchTerms.next(term);
  }

  autoSearch() {
    if (!this.searchQuery) {
      this.getAllCategory();
    } else {
      this.searchCatgory(this.searchQuery);
    }
  }

  filterProducts() {
    this.listCateory.filter(category => {
      return (
        category.libelle?.toLowerCase().includes(this.search.toLowerCase())

      );
    });

  }


}

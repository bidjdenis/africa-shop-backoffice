import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, switchMap, Observable, Observer } from 'rxjs';
import { Country } from 'src/app/models/country.model';
import { Product } from 'src/app/models/product.model';
import { UnitMeseare } from 'src/app/models/uit-meseare.model';
import { CategoryService } from 'src/app/service/category.service';
import { CountryService } from 'src/app/service/country.service';
import { ProductService } from 'src/app/service/product.service';
import { UnitMerseareService } from 'src/app/service/unit-merseare.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  listProduct: Product[] = [];
  listCategory: any;
  validateForm!: FormGroup;
  searchQuery!: string;
  searchTerms = new Subject<string>();
  displayedCategory: Product[] = [];
  search: string = '';
  listCountry: Country[] = [];
  listUnit: UnitMeseare[] = [];
  file!: File;
  publish: boolean = false;
  @ViewChild('inputFile') inputFile!: ElementRef;


  constructor(private service: ProductService,
    private fb: NonNullableFormBuilder,
    private cdr: ChangeDetectorRef,
    private serviceCategory: CategoryService,
    private serviceCountry: CountryService,
    private serviceUniteMeasure: UnitMerseareService) {
    this.validateForm = this.fb.group({
      id: ['', null],
      libelle: ['', [Validators.required]],
      description: ['', [Validators.required]],
      quatity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      valeurUniteMesure: ['', [Validators.required]],
      idProductCategory: ['', [Validators.required]],
      idUniteMesure: ['', [Validators.required]],
      idCountry: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => this.service.searchProduct(term))
      )
      .subscribe((data: { data: Product[] }) => {
        this.listProduct = data.data || [];
        this.displayedCategory = this.listProduct.slice(0, 10);

        this.cdr.detectChanges();
      });
    this.getAllProduct();
    this.getAllCategory();
    this.getAllCountry();
    this.getAllUnit();
  }

  getAllCountry() {
    this.serviceCountry.getAllCountry().subscribe((response: any) => {
      this.listCountry = response.data;
    });
  }

  getAllUnit() {
    this.serviceUniteMeasure.getAllUnitMeseare().subscribe((response: any) => {
      this.listUnit = response.data;
    });
  }

  getAllCategory() {
    this.serviceCategory.getAllCategorie().subscribe((response: any) => {
      this.listCategory = response.data;
      console.log("List of Category : ", this.listCategory)
    });
  }

  resetForm(e: MouseEvent): void {
    //console.log("Rest : ", e)
    e.preventDefault();
    this.validateForm.reset();
    this.removeData();
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


  getAllProduct() {
    this.service.getAllProduct().subscribe((response: any) => {
      this.listProduct = response.data;

      console.log("List of Product : ", response.data)
    });
  }

  submitForm(): void {

    const formData = this.validateForm.value;

    if (formData.id == '') {
      console.log("Produit : ", formData)
      this.service.addProduct(formData).subscribe((response: any) => {
        this.service.uploadProduct(response.data.id, this.file).subscribe((response: any) => {
          console.log("Images : ", response.data);
        });

        Swal.fire({
          title: "",
          text: response.message,
          icon: "info"
        });

        this.getAllProduct();
      });

    } else {
      console.log("Form Data 2 : ", formData.id)
      this.service.updateProduct(formData.id, formData).subscribe((response: any) => {
        Swal.fire({
          title: "",
          text: response.message,
          icon: "info"
        });
        this.getAllProduct();

      });

    }
    this.validateForm.reset();


  }



  getProduct(product: Product) {
    console.log("Donnée : ", Product)
    this.validateForm = this.fb.group({
      id: [product != null ? product.id : null, null],
      libelle: [product != null ? product.libelle : null,],
      description: [product != null ? product.description : null,],
      quatity: [product != null ? product.quatity : null,],
      price: [product != null ? product.price : null,],
      currency: [product != null ? product.currency : null,],
      valeurUniteMesure: [product != null ? product.valeurUniteMesure : null],
      idProductCategory: [product != null ? product.idProductCategory : null,],
      idUniteMesure: [product != null ? product.idUniteMesure : null,],
      idCountry: [product != null ? product.idCountry : null,],
    });
    window.scrollTo(0, 0);
  }

  deleteProduct(Product: Product) {
    this.service.deleteProduct(Product.id!).subscribe((response: any) => {
      Swal.fire({
        title: "",
        text: response.message,
        icon: "info"
      });
      this.getAllProduct();
    });
  }
  searchUint(term: string): void {
    this.searchTerms.next(term);
  }

  autoSearch() {
    if (!this.searchQuery) {
      this.getAllProduct();
    } else {
      this.searchUint(this.searchQuery);
    }
  }

  filterProducts() {
    this.listProduct.filter(Product => {
      return (
        Product.libelle?.toLowerCase().includes(this.search.toLowerCase()),
        Product.description?.toLowerCase().includes(this.search.toLowerCase())
      );
    });

  }
  onFileSelected(event: any): void {
    this.file = event.target.files[0];
    //console.log("fileName : ", this.file.name);
    //  this.isActionInProgress = true;

  }

  removeData() {
    this.inputFile.nativeElement.value = '';
  }
  publishProduct(id: number) {
    this.service.publishProduct(id).subscribe((response: any) => {
      this.publish = response.data.publish;
      Swal.fire({
        title: "",
        text: response.message,
        icon: "info"
      });
      this.getAllProduct()
    });

  }

}

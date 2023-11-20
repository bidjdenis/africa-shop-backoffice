import { Category } from "./category.model";
import { Country } from "./country.model";
import { UnitMeseare } from "./uit-meseare.model";

export class Product {
    id: number | undefined;
    libelle: string | undefined;
    price: number | undefined;
    currency: string | undefined;
    quatity: number | undefined;
    description: string | undefined;
    valeurUniteMesure: number | undefined;
    idProductCategory: number | undefined;
    idUniteMesure?: number | undefined;
    idCountry: number | undefined;
    imageName: string | undefined;
    publish: boolean | undefined;
    codeAuto: string | undefined;
}
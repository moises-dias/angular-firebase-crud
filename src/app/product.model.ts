export class Product {

    // product characteristics
    id: string;
    name: string;
    categories: string; //categorys or tags
    details: string;

    //purchaser
    purchaseValue: number;
    purchaseDate: string;
    purchaserName: string;
    purchaserContacts: string;

    //sales
    saleValue: number;
    saleDate: string;
    salePlatforms: string;
    sold: boolean;
}
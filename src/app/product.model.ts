export class Product {
    
    // product characteristics
    id: string;
    name: string;
    categorys: string[]; //categorys or tags

    //purchaser
    purchaseValue: number;
    purchaseDate: Date;
    purchaserName: string;
    purchaserContacts: string[];

    //sales
    saleValue: number;
    saleDate: Date;
    salePlatforms: string[];
    sold: boolean;
}
export default class ProductUpdateForm {
  public title: string;
  public description: string;
  public price: number;
  public stock: number;
  public brandId: number;
  public categoryId: number;

  constructor(dataForm: any) {
    this.title = dataForm.title;
    this.description = dataForm.description;
    this.price = dataForm.price;
    this.stock = dataForm.stock;
    this.brandId = dataForm.brand;
    this.categoryId = dataForm.category;
  }
}

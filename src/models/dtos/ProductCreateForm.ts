export default class ProductCreateForm {
  public title: string;
  public description: string;
  public price: number;
  public stock: number;
  public thumbnail: string;
  public userId: number;
  public brandId: number;
  public categoryId: number;
  public galleryId: number | null;

  constructor(dataForm: any) {
    this.title = dataForm.title;
    this.description = dataForm.description;
    this.price = dataForm.price;
    this.stock = dataForm.stock;
    this.thumbnail = dataForm.thumbnail;
    this.userId = dataForm.user;
    this.brandId = dataForm.brand;
    this.categoryId = dataForm.category;
    this.galleryId = null;
  }
}

import { EventData, Page, ShowModalOptions } from '@nativescript/core';
import { ProductsViewModel } from '../../view-models/products-view-model';

let viewModel: ProductsViewModel;

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    viewModel = new ProductsViewModel();
    viewModel.page = page;  // Set the page property
    page.bindingContext = viewModel;
}

export function onAddProduct() {
    const options: ShowModalOptions = {
        context: {},
        closeCallback: (success: boolean) => {
            if (success) {
                viewModel.loadProducts();
            }
        },
        fullscreen: true
    };
    const page = <Page>viewModel.page;
    page.showModal('pages/add-product/add-product-page', options);
}
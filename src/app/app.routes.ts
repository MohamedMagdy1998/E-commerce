import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout/auth-layout.component';
import { LoginComponent } from './layouts/auth-layout/login/login.component';
import { RegisterComponent } from './layouts/auth-layout/register/register.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout/blank-layout.component';
import { authGuard } from './core/guard/auth/auth.guard';
import { loggedInGuard } from './core/guard/loggedIn/logged-in.guard';
import { NotFoundComponent } from './layouts/not found/not-found/not-found.component';
import { ForgetPasswordComponent } from './layouts/auth-layout/forget-password/forget-password/forget-password.component';



export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: 'full' },
    {
        path: "", component: AuthLayoutComponent, title: "auth", canActivate: [loggedInGuard], children: [
            { path: "login", component: LoginComponent, title: "login" },
            { path: "register", component: RegisterComponent, title: "register" },
            { path: "forgot", component: ForgetPasswordComponent, title: "forget password" },
        ]
    },
    {
        path: "",
        component: BlankLayoutComponent,
        title: "Blank",
        canActivate: [authGuard],
        children: [
            { 
                path: "home", 
                loadComponent: () => import('./layouts/blank-layout/home/home.component')
                    .then(m => m.HomeComponent), 
                title: "Home" 
            },
            { 
                path: "cart", 
                loadComponent: () =>import('./layouts/blank-layout/cart/cart.component')
                    .then(m => m.CartComponent), 
                title: "Cart" 
            },
            { 
                path: "products", 
                loadComponent: () => import('./layouts/blank-layout/products/products.component')
                    .then(m => m.ProductsComponent), 
                title: "Products" 
            },
            { 
                path: "allorders", 
                loadComponent: () => import('./layouts/allorders/allorders.component')
                    .then(m => m.AllordersComponent), 
                title: "All Orders" 
            },
            { 
                path: "details/:id", 
                loadComponent: () => import('./layouts/blank-layout/specificProduct/details-product/details-product.component')
                    .then(m => m.DetailsProductComponent), 
                title: "specific Product" 
            },

            { 
                path: "specificCategory/:id", 
                loadComponent: () => import('./layouts/blank-layout/categories/specific-category/category-details/category-details.component')
                    .then(m => m.CategoryDetailsComponent), 
                title: "specific category" 
            },
            { 
                path: "brands", 
                loadComponent: () => import('./layouts/blank-layout/brands/brands.component')
                    .then(m => m.BrandsComponent), 
                title: "Brands" 
            },
            { 
                path: "categories", 
                loadComponent: () => import('./layouts/blank-layout/categories/categories.component')
                    .then((m) => m.CategoriesComponent), 
                title: "Categories" 
            },
            { 
                path: "checkout/:cartId", 
                loadComponent:()=>import('./layouts/blank-layout/checkout/checkout.component').then(m=>m.CheckoutComponent),
                title: "Checkout" 
            },
        ]
    },
    { 
        path: "**", 
        component: NotFoundComponent, 
        title: "404 - Not Found" 
    }
];
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";
import {PostsComponent} from "./components/posts/posts.component";
import {PostComponent} from "./components/post/post.component";

const routes: Routes = [
  {path: '', component: AdminDashboardComponent,
  children: [
    {path: 'posts', component: PostsComponent},
    {path: 'posts/post/:id', component: PostComponent},
    {path: 'posts/post', redirectTo: 'posts', pathMatch: 'full'},
    {path: '', redirectTo: 'posts', pathMatch: 'full'}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

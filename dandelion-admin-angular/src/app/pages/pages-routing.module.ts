// ng generate module pages/pages-routing --module pages/pages --flat
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LayoutWithMenuComponent } from "./layouts/layout-with-menu/layout-with-menu.component";

import { Routes, RouterModule } from "@angular/router";

import { TablesComponent } from "./tables/tables.component";
import { IntroductionComponent } from "./introduction/introduction.component";
import { ChartsComponent } from "./charts/charts.component";
import { UserlistComponent } from "./user/list/list.component";
import { UserAddEditComponent } from "./user/add-edit/add-edit.component";
import { MoviesComponent } from "./douban/movies/movies.component";
import { AnnualMoviesComponent } from "./douban/annual-movies/annual-movies.component";
import { RankingMoviesComponent } from "./douban/ranking-movies/ranking-movies.component";
// 添加路由
// 注意：这里的引用组建，如果是按照module来定向就不需要再imports，也不需要declarations
// 如果是按照组件来引入的话就需要添加declarations到最近的module中

const routes: Routes = [
  {
    path: "",
    component: LayoutWithMenuComponent,
    children: [
      {
        path: "introduction",
        component: IntroductionComponent
      },
      {
        path: "charts",
        component: ChartsComponent
      },
      {
        path: "tables",
        component: TablesComponent
      },
      {
        path: "user",
        children: [
          {
            path: "list",
            component: UserlistComponent
          },
          {
            path: "edit/:id",
            component: UserAddEditComponent
          },
          {
            path: "add",
            component: UserAddEditComponent
          }
        ]
      },
      {
        path: "douban",
        children: [
          {
            path: "chart-movies",
            component: MoviesComponent
          },
          {
            path: "annual-movies",
            component: AnnualMoviesComponent
          },
          {
            path: "ranking-movies",
            component: RankingMoviesComponent
          }
        ]
      }
    ]
  },
  {
    path: "auth",
    loadChildren: "./auth/auth.module#AuthModule"
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}

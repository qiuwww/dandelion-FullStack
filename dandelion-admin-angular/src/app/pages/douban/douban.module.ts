// ng g module pages/douban --module pages
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MoviesComponent } from "./movies/movies.component";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AnnualMoviesComponent } from "./annual-movies/annual-movies.component";
import { RankingMoviesComponent } from './ranking-movies/ranking-movies.component';

@NgModule({
  declarations: [MoviesComponent, AnnualMoviesComponent, RankingMoviesComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgZorroAntdModule]
})
export class DoubanModule {}

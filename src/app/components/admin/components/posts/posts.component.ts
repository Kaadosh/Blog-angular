import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Post} from "../../services/Post";
import {AdminService} from "../../admin.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  PostsList!:Observable<Post[]>
  constructor(private adminService : AdminService) {}

  ngOnInit() {
    this.PostsList = this.adminService.getPosts()
  }
}

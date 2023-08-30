import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Post} from "../../services/Post";
import {ActivatedRoute} from "@angular/router";
import {AdminService} from "../../admin.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
    id!: number;
    post!: Observable<Post>
    constructor(private  activeRoute: ActivatedRoute, private adminService: AdminService) {
    }

    ngOnInit() {
        this.activeRoute.params.subscribe((params) => this.id =  params?.['id'])
        this.post = this.adminService.getPost(this.id)
    }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts:any[]
  private url = "https://jsonplaceholder.typicode.com/users";
  constructor(private http:HttpClient) { }
  // httpdata;
  ngOnInit() {
    this.http.get(this.url).
    subscribe((data)=>{
      this.displaydata(data)
      // console.log(data)
    })
  }
  displaydata(data){this.posts=data;}
  
  createPost(input: HTMLInputElement){
    console.log(input.value)
    let post = {name:input.value};
    input.value='';
    console.log('pp',post)
    this.http.post(this.url, JSON.stringify(post))
      .subscribe(response =>{
        post['id']=response;
        this.posts.splice(0,0,post)
        // console.log('ssss',post.name)
        // console.log(response);
      })
  }

  updatePost(post,input:HTMLInputElement){
    console.log('hgf',post) 
    // input.value=post.name;
    let ppost = {name:input.value};
    this.http.patch(this.url+'/'+post.id, JSON.stringify(ppost))
      .subscribe(response=>{
        input.value=response['name'];
        console.log('resp',response)
      })
    console.log('update',ppost)
    // let ppost= this.posts[post.id];
    // console.log('hghjgj',ppost)
  }
  

  deletePost(post){
    console.log('from delete',post.id)
    this.http.delete(this.url+'/'+post.id)
      .subscribe(response=>{
        let index=this.posts.indexOf(post);
        this.posts.splice(index,1)
      })
  }
  
}

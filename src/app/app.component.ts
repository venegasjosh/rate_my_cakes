import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Rate My Cakes';
  cakes = [];
  show_cake = {};
  new_cake = {};
  ratings = {};
  errors = null;
  avg_rating: number;
  constructor(private _httpService: HttpService) {}
  ngOnInit() {
    this.getAllCakes();
  }

  getAllCakes() {
    let observable = this._httpService.getAllCakes();
    observable.subscribe(data => {
      this.cakes = data["data"]
      this.ratings = {};
      for(let i in this.cakes) {
        this.ratings[this.cakes[i]._id] = {rating: 5, comment: "Type your comment here"};
      }
    });
  }

  getOneCake(id: string) {
    let observable = this._httpService.getOneCake(id);
    observable.subscribe(data => {
      this.show_cake = data["data"];
      this.avg_rating = 0;
      for(let i in this.show_cake["ratings"]) {
        this.avg_rating += this.show_cake["ratings"][i]["rating"];
      }
      this.avg_rating /= this.show_cake["ratings"].length;
    });
  }

  createCake() {
    let observable = this._httpService.createCake(this.new_cake);
    observable.subscribe(data => {
      if(data["message"] == "Error") {
        this.errors = data["error"];
      }
      else {
        this.errors = null;
        this.new_cake = {};
        this.getAllCakes();
      }
    });
  }
  
  rateCake(id: string) {
    let observable = this._httpService.rateCake(id, this.ratings[id]);
    observable.subscribe(data => {
      if(data["message"] == "Error") {
        this.errors = data["error"];
      }
      else {
        this.errors = null;
        this.getAllCakes();
        if(id == this.show_cake["_id"]) {
          this.getOneCake(id);
        }
      }
    });
  }
}

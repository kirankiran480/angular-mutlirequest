import { Component, Input,OnInit  } from '@angular/core';
import { SearchService} from './getData.service';
@Component({
  selector: 'hello',
  template: `<h1>Hello {{name}}!</h1>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent implements OnInit {
  @Input() name: string;
   constructor(
     private getData:SearchService
   ){}
  ngOnInit(){
    this.getData.search('ar').subscribe(response=>{console.log(response)})
  }
}

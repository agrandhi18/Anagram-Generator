import { Component, OnInit } from '@angular/core';
import { AnagramDataService } from '../shared/anagramData.service';
import { AnagramData } from '../shared/anagramData.model';

@Component({
  selector: 'app-display-grid',
  templateUrl: './display-grid.component.html',
  styleUrls: ['./display-grid.component.css']
})
export class DisplayGridComponent implements OnInit {

  anagramsList: AnagramData[] = [];

  constructor(private anagramDataService: AnagramDataService) { }

   ngOnInit() {
     this.anagramsList = this.anagramDataService.getAnagrams();
   }
}

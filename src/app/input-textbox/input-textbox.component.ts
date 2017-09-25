import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { AnagramDataService } from "../shared/anagramData.service";

@Component({
  selector: 'input-textbox',
  templateUrl: './input-textbox.component.html',
  styleUrls: ['./input-textbox.component.css']
})
export class InputTextboxComponent implements OnInit {

  userForm = new FormGroup({
    inputString: new FormControl('', [Validators.required])
  });

  sortOrder = "ascendingOrder";

  constructor(private anagramDataService: AnagramDataService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.userForm.get("inputString").valueChanges.subscribe(data => {
      this.anagramDataService.generateGibberishAnagram(data);
      this.sortOrder = "ascendingOrder";
    });
  }

  onFormSubmit() {
    this.anagramDataService.generateGibberishAnagramForOldString();
    this.changeItemsAsPerOrder();
  }

  changeOrder() {
    this.sortOrder = this.sortOrder === "ascendingOrder" ? "descendingOrder" : "ascendingOrder";
    this.changeItemsAsPerOrder();
  }

  changeItemsAsPerOrder() {
    if (this.sortOrder === "ascendingOrder") {
      this.anagramDataService.getAnagrams().sort((a, b) => a.anagramString.localeCompare(b.anagramString));
    } else {
      this.anagramDataService.getAnagrams().sort((a, b) => a.anagramString.localeCompare(b.anagramString));
      this.anagramDataService.getAnagrams().reverse();
    }
  }
}

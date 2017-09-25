import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnagramDataService } from '../shared/anagramData.service';

@Component({
  selector: 'app-input-textbox',
  templateUrl: './input-textbox.component.html',
  styleUrls: ['./input-textbox.component.css']
})
export class InputTextboxComponent implements OnInit, AfterViewInit {

  userForm = null;
  sortOrder = 'ascendingOrder';

  constructor(private anagramDataService: AnagramDataService) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      inputString: new FormControl('', [Validators.required])
    });
  }

  ngAfterViewInit() {
    // Create two way data binding for input textbox and update anagrams based on text change
    this.userForm.get('inputString').valueChanges.subscribe(data => {
      this.anagramDataService.generateGibberishAnagram(data);
      this.sortOrder = 'ascendingOrder';
    });
  }

  /**
   * This function is called by the submit button on the form, this would 
   * call "generateGibberishAnagramForOldString" function to update anagrams and
   * call "changeItemsAsPerOrder" function to sort based on the sort order
   */
  onFormSubmit() {
    // Generate new anagrams for the text in the inputText box
    this.anagramDataService.generateGibberishAnagramForOldString();
    // Change the anagrams order based on the sort order
    this.changeItemsAsPerOrder();
  }

  /**
   * This function changes the value of sort order
   */
  changeOrder() {
    this.sortOrder = this.sortOrder === 'ascendingOrder' ? 'descendingOrder' : 'ascendingOrder';
    this.changeItemsAsPerOrder();
  }

  /**
   * This function changes the anagrams order based on sort order value, during sorting it would replace
   * all the white spaces
   */
  changeItemsAsPerOrder() {
    if (this.sortOrder === 'ascendingOrder') {
      // Sorting anagrams by removing the white spaces in the words words
      this.anagramDataService.getAnagrams().sort((a, b) => a.anagramString.replace(/ /g,'').localeCompare(b.anagramString.replace(/ /g,'')));
    } else {
      // For desending order, we need to sort it accending and reverse it
      this.anagramDataService.getAnagrams().sort((a, b) => a.anagramString.replace(/ /g,'').localeCompare(b.anagramString.replace(/ /g,'')));
      this.anagramDataService.getAnagrams().reverse();
    }
  }
}

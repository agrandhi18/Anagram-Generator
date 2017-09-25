import { AnagramData } from './anagramData.model';

/**
 * Function to swap array values based on positions
 * @param chars An array
 * @param i The first elements position which would be swapped
 * @param j The second elements position which would be swapped
 */
const swap = (chars, i, j) => {
    const tmp = chars[i];
    chars[i] = chars[j];
    chars[j] = tmp;
};

/**
 * This function generates different permutations for the given string and populates in
 * anagramList(array) with unique values
 * @param input The input string
 * @param anagramList List of unique gibberish anagrams based on input string
 */
const permutationGenerator = (input, anagramList) => {
    const counter = [],
        anagrams = [],
        chars = input.split(''),
        length = chars.length;

    let i = 0;
    for (i = 0; i < length; i++) {
        counter[i] = 0;
    }
    i = 0;

    // swapping it randomly to generate gibberish string
    swap(chars, Math.floor(Math.random() * chars.length), Math.floor(Math.random() * chars.length));

    while (i < length) {
        if (anagramList.length > 10) {
            return anagramList;
        }
        if (counter[i] < i) {
            swap(chars, i % 2 === 1 ? counter[i] : 0, i);
            counter[i]++;
            i = 0;
            // Checking if the string is already present in the anagramList, if not present pushing the string
            // in to angaramList
            if (anagramList.every(({ anagramString }) => anagramString !== chars.join(''))) {
                anagramList.push({ anagramString: chars.join(''), isSelected: false });
            }
        } else {
            counter[i] = 0;
            i++;
        }
    }
};

export class AnagramDataService {
    private anagramList: AnagramData[] = [];

    private inputStringValue = '';

    /**
     * This function return the anagramList
     */
    getAnagrams() {
        return this.anagramList;
    }

    /**
     * This function filters out the anagrams whose respective checkboxes are not checked and add new
     * anagrams to the anagramList
     */
    generateGibberishAnagramForOldString() {
        // Creates an array of all the anagrams whose checkbox's are not checked
        const removableElements = this.anagramList.filter(item => { if (item.isSelected === false) { return true; } return false; });
        let lastValue = [{anagramString: ''}];
        // Removes all the unchecked anagrams and add the last removed anagram string value to the lastValue
        removableElements.map(removableElement => {
            const index = this.anagramList.findIndex(item => item.anagramString === removableElement.anagramString);
            lastValue = this.anagramList.splice(index, 1);
        });
        // Generate new anagrams if the lastValue is present or use the same inputString value
        permutationGenerator(lastValue[0].anagramString || this.inputStringValue, this.anagramList);
    }

    /**
     * This function replaces all the anagramList array with new values based on the inputStrng value
     * @param inputStringVaue The string value of the text box
     */
    generateGibberishAnagram(inputStringVaue) {
        this.inputStringValue = inputStringVaue;
        this.anagramList.splice(0, this.anagramList.length);
        permutationGenerator(inputStringVaue, this.anagramList);
        this.anagramList.sort((a, b) => a.anagramString.replace(/ /g,'').localeCompare(b.anagramString.replace(/ /g,'')));
    }
}

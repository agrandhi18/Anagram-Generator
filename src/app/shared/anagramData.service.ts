import { AnagramData } from "./anagramData.model";

const swap = (chars, i, j) => {
    var tmp = chars[i];
    chars[i] = chars[j];
    chars[j] = tmp;
}

const permutationGenerator = (input, anagramList) => {
    let counter = [],
        anagrams = [],
        chars = input.split(''),
        length = chars.length,
        i;

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
            if (anagramList.every(({ anagramString }) => anagramString != chars.join(''))) {
                anagramList.push({ anagramString: chars.join(''), isSelected: false })
            }
        } else {
            counter[i] = 0;
            i++;
        }
    }
}

export class AnagramDataService {
    private anagramList: AnagramData[] = [];

    private inputStringValue = "";

    

    getAnagrams() {
        return this.anagramList;
    }

    generateGibberishAnagramForOldString() {
        const removableElements = this.anagramList.filter(item => { if (item.isSelected == false) { return true }; return false; });
        let lastValue = [{anagramString: ""}];
        removableElements.map(removableElement => {
            const index = this.anagramList.findIndex(item => item.anagramString == removableElement.anagramString);
            lastValue = this.anagramList.splice(index, 1);
        });
        permutationGenerator(lastValue[0].anagramString || this.inputStringValue, this.anagramList);
    }

    generateGibberishAnagram(data) {
        this.inputStringValue = data;
        this.anagramList.splice(0, this.anagramList.length);
        permutationGenerator(data, this.anagramList);
        this.anagramList.sort((a,b) => a.anagramString.localeCompare(b.anagramString));
    }
}

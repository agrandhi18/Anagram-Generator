export class AnagramData {
    public anagramString: string;
    public isSelected: boolean;

    constructor (anagramString: string, isSelected: boolean){
        this.anagramString = anagramString;
        this.isSelected = isSelected;
    }
}
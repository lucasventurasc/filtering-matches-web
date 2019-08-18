class UserMatched {

    private _mainPhoto: string;
    private _age: number;
    private _cityName: string;
    private _compatibilityScore: number;
    private _contactsExchanged: number;
    private _favourite: boolean;
    private _jobTitle: string;
    private _displayName: string;
    private _heightInCm: number;

    get mainPhoto(): string {
        return this._mainPhoto;
    }

    set mainPhoto(value: string) {
        this._mainPhoto = value;
    }

    get age(): number {
        return this._age;
    }

    set age(value: number) {
        this._age = value;
    }

    get cityName(): string {
        return this._cityName;
    }

    set cityName(value: string) {
        this._cityName = value;
    }

    get compatibilityScore(): number {
        return this._compatibilityScore;
    }

    set compatibilityScore(value: number) {
        this._compatibilityScore = value;
    }

    get contactsExchanged(): number {
        return this._contactsExchanged;
    }

    set contactsExchanged(value: number) {
        this._contactsExchanged = value;
    }

    get favourite(): boolean {
        return this._favourite;
    }

    set favourite(value: boolean) {
        this._favourite = value;
    }

    get jobTitle(): string {
        return this._jobTitle;
    }

    set jobTitle(value: string) {
        this._jobTitle = value;
    }

    get displayName(): string {
        return this._displayName;
    }

    set displayName(value: string) {
        this._displayName = value;
    }

    get heightInCm(): number {
        return this._heightInCm;
    }

    set heightInCm(value: number) {
        this._heightInCm = value;
    }
}

export default UserMatched
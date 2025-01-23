
import { SourceElementFactory } from "./TypeScriptGenerator/SourceElementFactory";
export class Dictionary<Tkey, TValue>{
    private keys : KeyCollection<Tkey>
    private values : ValueCollection<TValue>;
    public constructor(){
        this.keys = new KeyCollection<Tkey>();
        this.values = new ValueCollection<TValue>();
    }
    public add(key: Tkey, value : TValue) : void{
        this.keys.add(key);
        this.values.add(value);
    }
    public keyContains(key : Tkey) : boolean{
        return this.keys.contains(key);
    }
    public valueContains(value : TValue) : boolean{
        return this.values.contains(value);
    }
    public get(key : Tkey) : TValue {
        let index : number = this.keys.indexOf(key);
        return this.values.get(index);
    }
    public getOrDefault(key : Tkey, defaultValue : TValue) : TValue {
        const NOT_FOUND_KEY : number = -1;
        let index : number = this.keys.indexOf(key);
        if(index == NOT_FOUND_KEY){
            return defaultValue;
        }
        return this.values.get(index);
    }
    public* keyIterator(){
        for(let index = 0 ; index < this.keys.size(); index++){
            yield this.keys.get(index);
        }
    }
}
interface IDictionaryKey<Tkey>{
    add(key:Tkey) : void;
    contains(key : Tkey) : boolean;
    indexOf(key : Tkey) : number;
    size() : number;
    get(index : number) :Tkey
}
interface IDictionaryValue<TValue>{
    add(value:TValue) : void;
    contains(value : TValue) : boolean;
    indexOf(value : TValue) : number;
    get(index : number) : TValue;
}
class KeyCollection<TKey> implements IDictionaryKey<TKey>{
    private keys : Array<TKey>;
    constructor(){
        this.keys = [];
    }
    public contains(key: TKey): boolean {
        return this.keys.includes(key);
    }
    public indexOf(key: TKey): number {
        return this.keys.indexOf(key);
    }
    public add(key :TKey) : void{
        this.keys.push(key);
    }

    public size() : number{
        return this.keys.length;
    }
    public get(index : number) : TKey{
        return this.keys[index];
    }

}
class ValueCollection<TValue> implements IDictionaryValue<TValue>{
    private values : Array<TValue>
    constructor(){
        this.values = [];
    }
    get(index: number): TValue {
        return this.values[index];
    }
    contains(value: TValue): boolean {
        return this.values.includes(value);
    }
    indexOf(value: TValue): number {
        return this.values.indexOf(value);
    }
    public add(value: TValue) : void{
        this.values.push(value);
    }
}
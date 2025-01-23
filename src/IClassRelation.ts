import { IList } from "./IList";

export interface IClassRelation{
    /**
     * 実装文字列を取得できる
     */
    getImplementsString() : string;
    /**
     * 継承文字列を取得できる
     */
    getExtendsString() : string;

    /**
     * 実装インターフェース一覧を取得できる
     */
    getImplements() : Array<string>
}
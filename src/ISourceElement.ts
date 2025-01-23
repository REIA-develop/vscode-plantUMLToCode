export interface ISourceElement{
	/**
	 * 各要素をファイルに書き込める形に整形する
	 */
	parse() : string;
}
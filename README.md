# Description
This Extension is Generate Source Code based on the XMi of PlantUML-ClassDiagrams.<br/>
It Source Code Writing rule is depending on the Language.<br/>
Can Create things in this Extensions list in below:
- SourceCode file
- field variable or class variable(with access option(ex. private, public))
- methods(with access option(ex. private, public))

But Can't create Package.<br/>
also Can't write implements and extends.<br/>
Because not included packages information in XMi of plantUML-ClassDigram<br/>
About Available Language, reference to Section-Supported Language.<br/>

xml create uses tools in below<br/>
[jebbs.plantuml](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml)

この拡張機能ではPlantUMLで作成したクラス図を基に言語に応じたソースコードを作成することができます。<br/>
本拡張機能で作成できるものは以下になります<br/>
- ソースファイル
- フィールド変数またはクラス変数(アクセサ修飾子付き(ex. private,public))
- メソッド(アクセサ修飾子付き(ex. private,public))

ただし、PlantUMLで作成したクラス図のXMLファイルの中にパッケージ情報がないため、<br/>
また、継承関係、実装関係もまた、同様の理由で、作成できません<br/>
パッケージ構成を作成することはできません。<br/>
利用可能な言語についてはSupported Languageセクションを参照ください。

# Supported Language
- typescript
- java // not implements

# Getting standard
1. create PlantUML class Diagram And generate xmi file(but xmi Extensions at I use Tools)<br/>
&nbsp;&nbsp;&nbsp;About High Detailed Writing rule, reference to [OfficialSite](https://plantuml.com/).<br/>
&nbsp;&nbsp;&nbsp;But Setting below rules for Execute Auto Generate.
&nbsp;&nbsp;&nbsp;<ul><li><p>method rule:</p><p>&nbsp;&nbsp;&nbsp;{access option}{name}(){harf-size space}:{harf-size space}{Return type}</p><p>&nbsp;&nbsp;&nbsp;ex. "+ testMethod() : String"</p></li><li><p>variable rule:</p><p>&nbsp;&nbsp;&nbsp;{access option}{name}{harf-size space}:{harf-size space}{type}</p><p>&nbsp;&nbsp;&nbsp;ex. "+ testField : String"</p></li></ul><br/>
example image<br/>
![image](https://github.com/user-attachments/assets/4caf9d2d-a59a-4693-bc24-5af5f397527b)<br/>
2. use (Ctrl or Command) + Shit + P  -> click the Auto Generate based on plantUML
![image](https://github.com/user-attachments/assets/a19475a1-df29-463c-9af9-48b504998a21)<br/>
3. select xmi file<br/>
![image](https://github.com/user-attachments/assets/923ea082-b66b-4f75-940b-2b61d6994aa0)<br/>
4. select save Folder<br/>
![image](https://github.com/user-attachments/assets/4ab1006d-c24e-4fe9-90f5-ebab33003673)<br/>
5. select Language<br/>
![image](https://github.com/user-attachments/assets/ce2dcb2d-de9a-4692-987a-afd998271133)
6. created complete<br/>
![image](https://github.com/user-attachments/assets/29e4f799-8952-4833-950b-6f31b4024a26)

sorry for japanese images.

1. PlantUMLでクラス図とxmiファイルを作成する(ただし、前述したxmiファイル作成ツールを用いてください)<br/>
&nbsp;&nbsp;&nbsp;PlantUMLの詳しい記載については[公式サイト](https://plantuml.com/).を参照ください。<br/>
&nbsp;&nbsp;&nbsp;ですが、自動生成のために以下のルールだけはもうけさせていただきます。
&nbsp;&nbsp;&nbsp;<ul><li><p>メソッドルール:</p><p>&nbsp;&nbsp;&nbsp;{アクセサ修飾子}{メソッド名}(){半角スペース}:{半角スペース}{戻り値のデータ型}</p><p>&nbsp;&nbsp;&nbsp;ex. "+ testMethod() : String"</p></li><li><p>変数ルール:</p><p>&nbsp;&nbsp;&nbsp;{アクセサ修飾子}{変数名}{半角スペース}:{半角スペース}{データ型}</p><p>&nbsp;&nbsp;&nbsp;ex. "+ testField : String"</p></li></ul><br/>
Xmiファイル画像イメージ<br/>
![image](https://github.com/user-attachments/assets/4caf9d2d-a59a-4693-bc24-5af5f397527b)<br/>
2. (Ctrl or Command) + Shit + P を実行  -> Auto Generate based on plantUMLをクリック
![image](https://github.com/user-attachments/assets/a19475a1-df29-463c-9af9-48b504998a21)<br/>
3. xmiファイルを選択する<br/>
![image](https://github.com/user-attachments/assets/923ea082-b66b-4f75-940b-2b61d6994aa0)<br/>
4. 保存場所を選択する<br/>
![image](https://github.com/user-attachments/assets/4ab1006d-c24e-4fe9-90f5-ebab33003673)<br/>
5. 生成する言語を選択する<br/>
![image](https://github.com/user-attachments/assets/ce2dcb2d-de9a-4692-987a-afd998271133)
6. 作成完了<br/>
![image](https://github.com/user-attachments/assets/29e4f799-8952-4833-950b-6f31b4024a26)




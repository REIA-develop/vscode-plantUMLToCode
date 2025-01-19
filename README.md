# Description
This Extension is Generate Source Code based on the XML of PlantUML-ClassDiagrams.<br/>
It Source Code Writing rule is depending on the Language.<br/>
Can Create things in this Extensions list in below:
- SourceCode file
- field variable or class variable(with access option(ex. private, public))
- methods(with access option(ex. private, public))

But Can't create Package.<br/>
Because not included packages information in XML of plantUML-ClassDigram<br/>
About Available Language, reference to Section-Supported Language.<br/>

xml create uses tools in below<br/>
[jebbs.plantuml](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml)

この拡張機能ではPlantUMLで作成したクラス図を基に言語に応じたソースコードを作成することができます。<br/>
本拡張機能で作成できるものは以下になります<br/>
- ソースファイル
- フィールド変数またはクラス変数(アクセサ修飾子付き(ex. private,public))
- メソッド(アクセサ修飾子付き(ex. private,public))

ただし、PlantUMLで作成したクラス図のXMLファイルの中にパッケージ情報がないため、<br/>
パッケージ構成を作成することはできません。
利用可能な言語についてはSupported Languageセクションを参照ください。

# Supported Language
- typescript
- java

# Getting standard
1. create PlantUML class Diagram<br/>
&nbsp;&nbsp;&nbsp;About High Detailed Writing rule, reference to [OfficialSite](https://plantuml.com/).<br/>
&nbsp;&nbsp;&nbsp;But Setting below rules for Execute Auto Generate.
&nbsp;&nbsp;&nbsp;<ul><li><p>method rule:</p><p>&nbsp;&nbsp;&nbsp;{name}(){harf-size space}:{harf-size space}{Return type}</p><p>&nbsp;&nbsp;&nbsp;ex. "+ testMethod() : String"</p></li><li><p>variable rule:</p><p>&nbsp;&nbsp;&nbsp;{name}{harf-size space}:{harf-size space}{type}</p><p>&nbsp;&nbsp;&nbsp;ex. "+ testField : String"</p></li></ul>
2. use (Ctrl or Command) + Shit + P create xml file (but xmi Extensions at I use Tools)
{image}
{image2}
sorry for japanese images.





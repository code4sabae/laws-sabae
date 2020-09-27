# 鯖江市条例

html に全599条例  
docs/word に使用されている全画像  
docs/laws-sabae-body.zip が、テキストの全圧縮  
（2020-09-27現在）  

# 鯖江市条例検索

https://code4sabae.github.io/laws-sabae/  


# データ作成手順

```
deno run -A scrape.js
deno run -A parse.js
deno run -A download.js
deno run -A imageDownload.js
sh zip-laws-sabae.sh
```

## Introduction
insta_search is just a spider/crawler that aim to provide simple but continuous search integration with Instagram by using it's recent tag channel.

## Installation
I believe it's too early in development to publishing it to NPM, so right now the way to use it is by installing directly from this repository:

Run:

```bash
$ npm install git://github.com/ammarques/insta_search.git
```

## Code Example
At the moment this is merely a script.

```
var inst = require("insta_search");

var result = function(obj){
    console.log(obj);
};

var obj = {
    last_post_id:null, // Last post obtained, this was mean to be used with a database.
    query:"adventuretime", // Desired tag, at the moment and due to Instagram only one tag can be searched at time, check our road map for more info.
    id:"YOUR_CLIENT_ID",
    secret:"YOUR_APP_SECRET",
    cb:result // Callback function.
};

inst.search(obj);
```

## Documents
*   Instagram endpoint tags documentation
    [http://instagram.com/developer/endpoints/tags](http://instagram.com/developer/endpoints/tags)

*   This module uses David W. McKelvey instagram-node-lib, you can check more of his amazing work here:
    [https://github.com/mckelvey/instagram-node-lib](https://github.com/mckelvey/instagram-node-lib) and here [https://github.com/mckelvey](https://github.com/mckelvey)


## Roadmap
*   Implement a manual multiple tags search.

## License
insta_search is freely distributable under the terms of the MIT license.
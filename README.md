# gametest-requests

```js
import requests from "./gametest-requests";

requests.post("https://example.com", {
    timeout: 100,
    data: {
        score: 100
    }
}).then((res) => {
    if(res.status !== 200) {
        return;
    }

    console.log(res.body);
});
```

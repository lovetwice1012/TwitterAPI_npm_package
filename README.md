# TwitterAPI
Retrieve the number of followers and followings of a specified user even after twitter-api has been paid for
### How to use
```
import getUserFFData from twitterapi
async functon getFF(userid: String){
    console.log(await getUserFFData(userid))
}
getFF(userid)
```

### return 
```
{
    "screen_name": "{TwitterID}",
    "followerCount": {int},
    "following": {int}
}
```

### special thanks
[TwitterAPI](https://github.com/yuyutti/TwitterAPI) made by yuyutti

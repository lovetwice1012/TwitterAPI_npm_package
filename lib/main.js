module.exports = {
    async getUserFFData(twitterid) {
        return new Promise(function (resolve) {
            require('dotenv').config();

            const follower_request = async () => {
                await fetch("https://api.twitter.com/1.1/guest/activate.json", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: process.env.TWITTER_API_TOKEN,
                    }
                })
                    .then(response => {
                        return response.json();
                    })
                    .then((json) => {
                        const token = json.guest_token;
                        fetch(`https://twitter.com/i/api/graphql/nZjSkpOpSL5rWyIVdsKeLA/UserByScreenName?variables=%7B%22screen_name%22%3A%22${twitterid}%22%2C%22withSafetyModeUserFields%22%3Atrue%7D&features=%7B%22responsive_web_twitter_blue_verified_badge_is_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%7D`, {
                            method: "GET",
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: process.env.TWITTER_API_TOKEN,
                                'x-guest-token': token
                            }
                        })
                            .then(response => {
                                return response.json();
                            })
                            .then((json) => {
                                const name = json.data.user.result.legacy.screen_name
                                const follower = json.data.user.result.legacy.followers_count;
                                const following = json.data.user.result.legacy.friends_count
                                resolve({
                                    screen_name: name,
                                    followerCount: follower,
                                    following: following
                                });
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    })
            }
            follower_request();
        })
    }
}
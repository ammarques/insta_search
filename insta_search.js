var config = {
    last_post_id: null,
    first_post_id: null,
    initial_limit: 5,
    firstLoop: true,
    query: null,
    cb: null
};

var inst = require("instagram-node-lib");


var insta_search = {
    max_tag_id: null,
    store: function (obj) {
        config.cb(obj);
    },
    list: function (data, pagination) {
        if (data != null) {

            if (config.firstLoop) {
                config.first_post_id = data[0].id; // Takes the first post_id returned
            }

            for (var i = 0; i < data.length; i++) {
                try {
                    if (config.last_post_id == null) {
                        insta_search.store(data[i]);
                        if (i == config.initial_limit) {
                            console.log("Initial limit reached");
                            return insta_search.restart(null);
                        }
                    } else {
                        if (data[i].id == config.last_post_id) {
                            console.log("Found the last post_id");
                            return insta_search.restart(null);
                        } else {
                            insta_search.store(data[i]);
                        }
                    }
                } catch (err) { // ERROR
                    console.log(err);
                    return insta_search.restart(null);
                }
            }

            config.firstLoop = false;
            if (pagination != null) {
                insta_search.current_max_tag_id = pagination.next_max_tag_id;
                console.log("Exist pagination");
                return insta_search.init();
            } else {
                console.log("End pagination");
                return insta_search.restart(null);
            }
        }
    },
    error: function (msg, obj, caller) {
        console.log(msg, obj);
        insta_search.interval(null);
    },
    init: function () {
        var search_query = {
            name: config.query,
            max_tag_id: insta_search.max_tag_id,
            error: insta_search.error,
            complete: insta_search.list
        };

        if (config.firstLoop) {
            delete search_query.max_tag_id;
        }

        inst.tags.recent(search_query);
    },
    restart: function (current_min_tag_id) {
        config.last_post_id = config.first_post_id;
        config.firstLoop = true;
        insta_search.current_max_tag_id = current_min_tag_id;
        insta_search.init();
    }
};

module.exports = {
    search: function (src) {
        config.last_post_id = src.last_post_id;
        config.query = src.query;
        config.cb = src.cb;

        inst.set('client_id', src.id);
        inst.set('client_secret', src.secret);

        insta_search.init();
    }
}
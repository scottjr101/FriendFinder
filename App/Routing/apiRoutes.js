var friendData = require("../Data/friends");

function compareFriends(s1, s2) {
    var difference = 0;
    for (var i = 0; i < s1.length; i++) {
        difference += Math.abs(s1[i] - s2[i]);
    }
    return difference;
}

//Routing
module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friendData);
    });

    app.post("/api/friends", function (req, res) {

        var newFriend = req.body;
        var bestScore = 9999;
        var bestMatch;

        //Compare friends
        for (var i = 0; i < friendData.length; i++) {
            var score = compareFriends(newFriend.scores, friendData[i].scores);
            console.log("Score for " + friendData[i].name + ": " + score);
            if (score < bestScore) {
                bestMatch = friendData[i];
                bestScore = score;
            }
        }

        console.log("Best Match:");
        console.log(bestMatch);

        // Return best match
        friendData.push(newFriend);
        res.json(bestMatch);
    });
};
// LOAD DATA
// We are linking our routes to a "data" source.
// This data source holds an array of information on friends-data, etc.
// ===============================================================================
var path = require('path');
var friendsData = require("../data/friends.js");

module.exports = function(app) {
    // API GET Requests
    // Below code handles when users click "API Friends List" link.
    // the get retrieves the data from the friends.js file
    // (the post pushes that data tho the "API Friends List" link. they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------
  
    app.get("/api/friends", function(req, res) {
      res.json(friendsData);
    });

    app.post("/api/friends", function(req, res) {
        var apiPush = {
            name: "",
            photo: "",
            
            differential: 500
        }
        console.log(req.body)
        
		var differentialSum = 0;

		for  (var i=0; i< friendsData.length; i++) {
			differentialSum = 0;

			for (var h=0; h<friendsData[i].scores[h]; h++){
				differentialSum += Math.abs(parseInt(req.body.scores[h]) - parseInt(friendsData[i].scores[h]));
				if (differentialSum <= apiPush.differential){
					apiPush.name = friendsData[i].name;
					apiPush.photo = friendsData[i].photo;
					apiPush.differential = differentialSum;
				}
			}
        }
        console.log(apiPush)
        res.json(apiPush);
        friendsData.push(req.body);
    });
}
/* 
* Profile image
* User name
* Links to the following:
  * User location via Google Maps
  * User GitHub profile
  * User blog
* User bio
* Number of public repositories
* Number of followers
* Number of GitHub stars
* Number of users following
*/



const fs = require("fs");
const convertFactory = require('electron-html-to');
const axios = require("axios");
const inquirer = require("inquirer");
const path = require("path");

inquirer
    .prompt({
        message: "Enter your GitHub username",
        name: "username"
    })
    .then(function ({ username }) {
        const queryUrl = `https://api.github.com/users/${username}`;
        axios.get(queryUrl)
            .then(function (response) {
                // handle success
                // console.log(response.data);
                
                const userProfile = {
                    profileImage: response.data.avatar_url, 
                    name: response.data.name,
                    location: response.data.location, 
                    githubProfile: response.data.html_url, 
                    userBlog: response.data.blog, 
                    userBio: response.data.bio, 
                    publicRepoCount: response.data.public_repos, 
                    followers: response.data.followers, 
                    userStars: response.data.starred_URL,
                    usersFollowing: response.data.following, 
                
                }
                 
                console.log(userProfile);

                const profileHTML = `
                <div class = "profile-data">
                    <p class = "profile-image"><img src="${userProfile.profileImage}"</img></p>
                    <p class = "name">${userProfile.name}</p>
                    <p class = "location">${userProfile.location}</p>
                    <p class = "githubProfile"><a href="${userProfile.githubProfile}"</a></p>
                    <p class = "userBlog"><a href="${userProfile.userBlog}"</a></p>
                    <p class = "userBio">${userProfile.userBio}</p>
                    <p class = "publicRepoCount">${userProfile.publicRepoCount}</p>
                    <p class = "followers">${userProfile.followers}</p>
                    <p class = "userStars">${userProfile.userStars}</p>
                    <p class = "usersFollowing">${userProfile.usersFollowing}</p>

                </div>
                `
                console.log(profileHTML);
                
                const conversion = convertFactory({
                    converterPath: convertFactory.converters.PDF
                  });
                   
                  conversion({ html: profileHTML}, function(err, result) {
                    if (err) {
                      return console.error(err);
                    }
                   
                    console.log(result.numberOfPages);
                    console.log(result.logs);
                    result.stream.pipe(fs.createWriteStream(path.join(__dirname, "profile.pdf")))
                    conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
                  });
                
                   
            });

           
    });
   


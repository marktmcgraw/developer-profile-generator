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
const axios = require("axios");
const inquirer = require("inquirer");
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
                

                /*
                const profileImage = response.data.avatar_url;
                //console.log(profileImage);
                const name = response.data.name;
                //console.log(name);
                const location = response.data.location;
                //console.log(location); 
                const githubProfile = response.data.html_url;
                //console.log(githubProfile);
                const userBlog = response.data.blog;
                //console.log(userBlog);
                const userBio = response.data.bio;
                //console.log(userBio);
                const publicRepoCount = response.data.public_repos;
                //console.log(publicRepoCount);
                const followers = response.data.followers;
                //console.log(followers);
                const userStars = response.data.starred_URL;
                //console.log(userStars);
                const usersFollowing = response.data.following;
                // console.log(usersFollowing);
                */
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
                ;
                
                   
            });

            const element = document.getElementById("user-profile");
            element.innerHTML = profileHTML;
    });
   


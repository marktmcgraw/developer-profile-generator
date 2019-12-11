const fs = require("fs");
const convertFactory = require("electron-html-to");
const axios = require("axios");
const inquirer = require("inquirer");
const path = require("path");

inquirer
  .prompt({
    message: "Enter your GitHub username",
    name: "username"
  })
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}`;
    axios.get(queryUrl).then(function(response) {
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
        usersFollowing: response.data.following
      };

      console.log(userProfile);

      const profileHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <title>Document</title>
    </head>
    <body>
        <div class = "user-profile">
                <div class = "profile-data">
                    <p class = "profile-image"><img src="${userProfile.profileImage}"</img></p>
                    <p class = "name">Name: <b>${userProfile.name}</b></p>
                    <p class = "location">Location: ${userProfile.location}</p>
                    <p class = "githubProfile"><a href="${userProfile.githubProfile}">GitHub</a></p>
                    <p class = "userBlog"><a href="${userProfile.userBlog}">Blog</a></p>
                    <p class = "userBio">Bio: ${userProfile.userBio}</p>
                    <p class = "publicRepoCount">Public Repo Count: ${userProfile.publicRepoCount}</p>
                    <p class = "followers">Follower Count: ${userProfile.followers}</p>
                    <p class = "userStars">User Stars: ${userProfile.userStars}</p>
                    <p class = "usersFollowing">Users Following: ${userProfile.usersFollowing}</p>
                 </div>
         </div>
    </body>
</html>
                `;

      // Copied from electron-html-to NPM
      const conversion = convertFactory({
        converterPath: convertFactory.converters.PDF
      });

      conversion({ html: profileHTML }, function(err, result) {
        if (err) {
          return console.error(err);
        }

        console.log(result.numberOfPages);
        console.log(result.logs);
        result.stream.pipe(
          fs.createWriteStream(path.join(__dirname, "profile.pdf"))
        );
        conversion.kill();
      });
    });
  });

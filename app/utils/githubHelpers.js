// app/utils/githubHelpers.js
var axios = require('axios');

var id = "af38f81e1a9695d83e88";
var sec = "72ac92ecc5cc04a021b92f0a1e1da807aee5aeb4";
var param = "?client_id=" + id + "&client_secret=" + sec;

function getUserInfo(username) {
    return axios.get('https://api.github.com/users/' + username + param);
}

function getRepos(username) {
    return axios.get('https://api.github.com/users/' + username + '/repos' + param + '&per_page=100');
}

function getTotalStars(repos) {
    return repos.data.reduce(function (prev, current) {
        return prev + current.stargazers_count
    }, 0)
}

function getPlayersData(player) {
    return getRepos(player.login)
        .then(getTotalStars)
        .then(function (totalStars) {
            return {
                followers: player.followers,
                totalStars: totalStars
            }
        })
}

function calculateScores(players) {
    return [
        players[0].followers * 3 + players[0].totalStars,
        players[1].followers * 3 + players[1].totalStars
    ]
}

var helpers = {
    getPlayersInfo: function (players) {
        // ดึงข้อมูล userจาก Github มาใช้
        return axios.all(players.map(function (username) {
            return getUserInfo(username)
        }))
            .then(function (info) {
                // console.log('INFO', info);
                return info.map(function (user) {
                    return user.data
                })
            })
            .catch(function (err) { console.warn('Error in getPlayersInfo: ', err) })
    },
    battle: function (players) {
        var playerOneData = getPlayersData(players[0]);
        var playerTwoData = getPlayersData(players[1]);
        return axios.all([playerOneData, playerTwoData])
            .then(calculateScores)
            .catch(function (err) { console.warn('Error in getPlayersInfo: ', err) })
    }
};

module.exports = helpers;
const express = require("express");
const app = express.Router();

const { verifyToken, verifyClient } = require("../tokenManager/tokenVerify.js");
const functions = require("../structs/functions.js");

app.get("/fortnite/api/calendar/v1/timeline", (req, res) => {
    const memory = functions.GetVersionInfo(req);

    let activeEvents = [
        {
            "eventType": `EventFlag.Season${memory.season}`,
            "activeUntil": "2028-01-01T00:00:00.000Z",
            "activeSince": "2020-01-01T00:00:00.000Z"
        },
        {
            "eventType": `EventFlag.${memory.lobby}`,
            "activeUntil": "2028-01-01T00:00:00.000Z",
            "activeSince": "2020-01-01T00:00:00.000Z"
        }
    ];

    res.json({
        channels: {
            "client-matchmaking": {
                states: [],
                cacheExpire: "2028-01-01T00:00:00.000Z"
            },
            "client-events": {
                states: [{
                    validFrom: "0001-01-01T00:00:00.000Z",
                    activeEvents: activeEvents,
                    state: {
                        activeStorefronts: [],
                        eventNamedWeights: {},
                        seasonNumber: memory.season,
                        seasonTemplateId: `AthenaSeason:athenaseason${memory.season}`,
                        matchXpBonusPoints: 0,
                        seasonBegin: "2020-01-01T00:00:00Z",
                        seasonEnd: "2028-01-01T00:00:00Z",
                        seasonDisplayedEnd: "2028-01-01T00:00:00Z",
                        weeklyStoreEnd: "2028-01-01T00:00:00Z",
                        stwEventStoreEnd: "2028-01-01T00:00:00.000Z",
                        stwWeeklyStoreEnd: "2028-01-01T00:00:00.000Z",
                        sectionStoreEnds: {
                            Featured: "2028-01-01T00:00:00.000Z"
                        },
                        dailyStoreEnd: "2028-01-01T00:00:00Z"
                    }
                }],
                cacheExpire: "2028-01-01T00:00:00.000Z"
            }
        },
        eventsTimeOffsetHrs: 0,
        cacheIntervalMins: 10,
        currentTime: new Date().toISOString()
    });
});

module.exports = app;
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());

app.use(cors());

app.post('/create-jira-ticket', async (req, res) => {
    const { apiToken, projectKey, summary, description } = req.body;

    const userName = "2021MT93645@wilp.bits-pilani.ac.in";
    const jiraEndpoint = "https://2021mt93645.atlassian.net/rest/api/3/issue/";

    const token =  authenticateUser(userName, apiToken);
    
    const headers = {
        'Content-Type': 'application/json',
        Authorization : token
    };

    try {
        const response = await axios.post(
            jiraEndpoint,
            {
                "fields": {
                    "summary": summary,
                    "issuetype": {
                        "name": "Task"
                    },
                    "project": {
                        "key": projectKey
                    },
                    "description": {
                        "type": "doc",
                        "version": 1,
                        "content": [
                            {
                                "type": "paragraph",
                                "content": [
                                    {
                                        "text": description,
                                        "type": "text"
                                    }
                                ]
                            }
                        ]
                    }
                }
            },
            {
                headers: headers
            }
        );
        console.log("SERVER.JS :: got response");
        res.json(response.data);
    } catch (error) {
        console.error('SERVER.JS :: Error creating Jira Ticket:', error);
        throw error;
    }
});

function authenticateUser(user, password)
{
    var token = user + ":" + password;

    // Should i be encoding this value????? does it matter???
    // Base64 Encoding -> btoa
    var hash = btoa(token); 
    return "Basic " + hash;
}

app.get('/status', async (req, res) => {
  try {
    console.log("In express :: app.get status");
    const response = {
        "value": "Hello World !!!"
    };
    res.json(response.data);
  } catch (error) {
    console.error('Error creating Jira Ticket:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server 987907 is running on http://localhost:${port}`);
});
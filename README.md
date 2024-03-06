# Node.js text clustering - kmeans-categorize-text-js

|<img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />|<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" /> |
|----  |----|  

## What is k-means clustering?
K-means clustering is an unsupervised machine learning algorithm used to find groups in a dataset. The objective of k-means clustering is to divide a dataset into groups (clusters) of similar items.

To improve the result, the words are compared using the [Jaro–Winkler](https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance) string distance algorithm that will return a number between 0 and 1 which tells how closely the strings match (0 = not at all, 1 = exact match) e.g:

```javascript
var natural = require('natural');
console.log(natural.JaroWinklerDistance("dixon","dicksonx")); // 0.7466666666666666
console.log(natural.JaroWinklerDistance('not', 'same'));      // 0 (No match)
```

## Installation
```
$ npm install kmeans-categorize-text-js
```
## Usage
To use k-means clustering you need to provide a dataset with objects with id and text:

```javascript
const kMeansText = require('kMeansText');

const dataSet = [
    {id: 1, text: "Leaves sway in the gentle breeze, crafting a soothing harmony of nature's tune" },
    {id: 2, text: "Waves collide against the shore, bearing whispers of secrets from the depths below" },
    {id: 3, text: "The sun dips below the tranquil horizon, adorning the sky with shades of orange and pink" },
    {id: 4, text: "Snowflakes pirouette in the wintry air, covering the earth in a gentle, white embrace" },
    {id: 5, text: "Urban lights shimmer like stars in the evening, brightening the lively streets below" },
    {id: 6, text: "Trees whisper in the soft breeze, weaving a tranquil melody through the forest" },
    {id: 7, text: "Waves break upon the coastline, echoing the ancient rhythms of the sea" },
    {id: 8, text: "The horizon blushes as the sun dips, casting a golden glow across the landscape" },
    {id: 9, text: "Frost kisses the ground, painting a delicate pattern of ice across the earth" },
    {id: 10,text: "Streetlights flicker like fireflies, guiding the way through the bustling cityscape" },
];
const groups = 3;
const excludeWords = ['dips']
kMeansText(dataSet, groups, [], result => console.log(result), error => console.log(error);
```

## Output
The method returns an object with the category group as the key and the array objects as values.
```javascript
{
    whispers: {
        '2': 'Waves collide against the shore, bearing whispers of secrets from the depths below',
            '3': 'The sun dips below the tranquil horizon, adorning the sky with shades of orange and pink',
            '7': 'Waves break upon the coastline, echoing the ancient rhythms of the sea',
            '9': 'Frost kisses the ground, painting a delicate pattern of ice across the earth'
    },
    landscape: {
        '8': 'The horizon blushes as the sun dips, casting a golden glow across the landscape'
    },
    crafting: {
        '1': "Leaves sway in the gentle breeze, crafting a soothing harmony of nature's tune",
            '4': 'Snowflakes pirouette in the wintry air, covering the earth in a gentle, white embrace',
            '5': 'Urban lights shimmer like stars in the evening, brightening the lively streets below',
            '6': 'Trees whisper in the soft breeze, weaving a tranquil melody through the forest',
            '10': 'Streetlights flicker like fireflies, guiding the way through the bustling cityscape'
    }
}
```

## Params

| **Name**          | **Type**                          | **Default**       |
| -------------     |-------------                |:----------:   |
| data              | array of objects {id, text}   |[ ]            |
| groups            | integer                       |2              |
| excludeWords      | array of strings              |[ ]            |
| onClusterize      | callback to success (result)  |console.log    |
| onError           | callback to error (error)     |console.log    |

## Reference
>[Implementing K-Means Clustering From Scratch in JavaScript](https://medium.com/geekculture/implementing-k-means-clustering-from-scratch-in-javascript-13d71fbcb31e)
>[Natural string distance](https://naturalnode.github.io/natural/string_distance.html)

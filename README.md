# Challenge 03: Random Password Generator - Due Dec 5, 2022

## Introduction

The purpose of this challenge was to familiarize me with the use of APIs and DOM manipulation through the use of javaScript.

## Techniques Used

I employed the use of a multitude of document methods, including query selectors, create elements, append elements, and others, and employed a number of javascript methods, including timer intervals, local storage, and others.

## Examples of Use

Upon load, users are presented with a blank game interface and a start button:

<img src="assets/images/onopen.jpg"/>

User's are presended with a descending timer and a series of multiple choice questions to answer:

<img src="assets/images/properfunction.jpg"/>

Should the user answer the question wrong, their selected answer is highlighed in red, the correct answer highlighted in green, and 5 seconds are subtracted from the clock before the next question is presented:

<img src="assets/images/incorrectanswer.jpg"/>

If the user answers a question correctly, their answer is highlighted in green and the next question is presented.

At the end of the game (if time runs out or all questions have been attempted), users are presented with their score and an input through which they can submit their scores to be stored locally on their computer:

<img src="assets/images/scoresubmit.jpg"/>

After submission, the user is presented with the highscores:

<img src="assets/images/hiscorelist.jpg"/>

## Link to Deployed Application

<a href="https://harryhamlin.github.io/javascriptquiz/">https://harryhamlin.github.io/javascriptquiz/</a>
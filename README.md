# Challenge 03: Random Password Generator - Due Nov 28, 2022

## Introduction

The purpose of this challenge was to familiarize me with the use of Javascript to perform logical functions that result in an action being performed, in this case the generation of a random password.

## Techniques Used

I employed the use of a multitude of if statements; variable declarations; various methods including window.prompt, window.confirm, isFinite, floor, random, isInteger, length, querySelector, addEventListener, and split; for intirations; and various concatenation techniques.

## Examples of Use

A successful execution of the password generator results in a random password being generated with the parameters selected by the user, as demonstrated here:

<img src="assets/images/successful.jpg"/>

When selecting password length, the user is prompted with this window prompt:

<img src="assets/images/length_error_message.jpg"/>

Should the user input a string, they are presented with this error message in the text area:

<img src="assets/images/nan_error_message.jpg"/>

If the user inputs an integer outside of the requested range or a non-integer, the following error message appears in the text area:

<img src="assets/images/length_error_message.jpg"/>

If the user inputs an invalid entry in this stage, the program terminates and the user must start over.

After selecting the length of password, the user is prompted with a series of questions about what type of characters they would like used:

<img src="assets/images/character_prompt.jpg"/>

If the user answers no to all character types, a similar error message to the above error messages displays in the textarea.

## Link to Deployed Application

<a href="https://harryhamlin.github.io/randompasswordgenerator/">https://harryhamlin.github.io/randompasswordgenerator/</a>
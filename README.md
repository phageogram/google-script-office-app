# Employee Sign In App for Google Apps Script
This is a simple web app made to track employee location during the workday. Employees can clock in and out and their location will be updated dynamically. This was built on Google Apps Script and uses a simple Google Sheet as a back end.

## Background
I work on a team that is quickly expanding and is spread across two buildings. Supervisors in the organization are required to know the location of their staff at all times in case of emergency, and until recently, the team has been small enough that we were able to coordinate well enough using Google's Chat feature. However, the team has grown to nearly 40 people, so we needed some kind of formal system to track our locations. 

I decided to build this simple web app using Google's Apps Script environment, because our organization is already based on Google Cloud, making it easy to build internal tools.

This could be done with a shared spreadsheet, but I wanted to challenge myself and see how well I can make this app work within the limitations of the Apps Script environment. Plus, we have enough spreadsheets as it is!

## To-Do

1. This first version of the app relies on a page refresh after every interaction. This slows things down considerably and is generally just a clunky way to manage dynamic updates. I need to create a branch and revamp the structure of the app using AJAX to provide dynamic updates without requiring a full reload. But this will only be used by an internal team, so it will work fine for the time being.

## Structure

This follows the basic structure for a dynamic web page:

- page.html is a bootstrap HTML template that structures the UI. There are a few JS functions included in the script tags at the bottom to ensure they are loaded before the other client-side JS functions.

- js.html contains client-side JS functions:
    * updatePicker() refreshes the dynamic select element (dropdown) in the UI
    * updateUi() fetches data from the back end and updates the UI. Since I'm not using AJAX yet, the UI only refreshes upon reload.

- Code.gs contains server-side JS functions for the Apps Script environment
    * getData() fetches data from the back end and sorts it into two variables (one for each work location), mainData and annexData
    * updateSheet() sends changes to the back end.

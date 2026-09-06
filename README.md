# Study Timetable
A simple web app to plan and track study sessions with my brother.

## What it does

- Add a study session by picking a date and typing a topic
- Tick a box when a session is done
- Delete a session if it's no longer needed
- Everyone who opens the link sees the same, shared list — so my brother can plan sessions for me, and I can mark them done as I finish them

## How it's built

- Built with **Next.js** and **React** 
- The data (all the sessions) is stored in a small cloud database, that's what makes it shared between me and my brother
- It talks to that database through a small API  hosted on AWS

## Where it lives

The actual working app is here: https://d1apjdu7p193c8.cloudfront.net
This repo is just the source code — the actual website is deployed separately using the infrastructure code 
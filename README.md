# Red Planet Staffing Analytics

A backend analytics system built with NestJS and Prisma to rank workplaces and workers based on completed shifts.

## Features

- Filters completed shifts (endAt < current time)
- Aggregates shift counts per workplace
- Aggregates shift counts per worker
- Returns Top 3 ranked entities
- Clean CLI output with JSON formatting
- Logger suppression for script compatibility

## Tech Stack

- Node.js
- NestJS
- Prisma ORM
- SQLite

## Key Concepts Demonstrated

- Database querying with Prisma
- Data aggregation and ranking
- Sorting and slicing
- CLI script architecture
- Debugging JSON output issues
- Prisma migrations & seeding

## How It Works

1. Fetch completed shifts.
2. Count shifts per entity.
3. Map results with names.
4. Sort descending.
5. Return top 3.

## Learning Outcomes

This project strengthened my understanding of:
- Backend data processing
- ORM-based querying
- Handling clean script output
- Debugging ANSI escape issues

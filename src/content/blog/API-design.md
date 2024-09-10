---
title: 'API Design'
description: 'Some notes on REST API design'
pubDate: 'Mar 18 2024'
---

Recently I have been reading about good practices for REST API's design. This post is basically a summary of some useful rules/tips taken from:

- [https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/)

# What is a REST API ?

- API stands for Application Programming Interface, _(it's a way for computer programs to communicate with each other)_
- REST stands for Representational State Transfer _(it's a software architecture that imposes conditions on how an API should work)_

So _(obviously)_ REST API is an API that satisfies REST architecture constraints. _(wow, that was totally unexpected)_

I don't think its very useful to go over what the REST constraints are. Mostly because they are [a subject of debate.](https://htmx.org/essays/how-did-rest-come-to-mean-the-opposite-of-rest/)

**In practice, devs refer to REST APIs as a way to communicate with a program through HTTPS.**

So, what do we need to develop _good_ APIs?

## Accept and respond with JSON

Part of the [REST debate mentioned](https://htmx.org/essays/how-did-rest-come-to-mean-the-opposite-of-rest/) argues that you should use HTML and not JSON. But, in practice, everybody expects to communicate with your API using JSON, it's the standard now. The only exception its [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) used when you need to send files.

## Nouns for endpoint paths, not verbs

The nouns represent the _entity_ that the endpoint is retrieving or manipulating. The verb is in the HTTP request method (GET, POST, PUT, DELETE).

## Logical nesting on endpoints

Endpoints paths follow a hierarchy where elements on the left are considered "parents" and elements on the right are "children".
E.g: If you want to get the comments of an article you would use `/articles/:articleId/comments` and not `/comments/:articleId/`.
Mirroring your database is not necessarily good.

But nesting shouldn't go too far, **after the second or third level, nested endpoints can get annoying**. Consider returning the URL to those resources instead.

```json
{
  "id": "1",
  "comment": "Pretty good article",
  "author": "/user/2" // /user/:userId
}
```

## Handle errors gracefully and return standard error codes

Use HTTP Error codes and add descriptive messages in your responses. Don't be overly descriptive, attackers can use the error content.

Avoid sending a response with status 200 and a message explaining the error, embrace the native error handling.

## Allow filtering, sorting, and pagination

Databases behind REST APIs can get very large. Sending all the data at once can be slow and/or bring down our systems.

The more data in the database, the more important filtering, sorting and pagination becomes.

The common pattern is to **use query parameters** to filter, paginate or sort a resource.
E.g.: `/resource?filter=value&page=1&sort=-datepublished` → filtered by "value", page 1, sorted descending by date (- means descending, + means ascending).

## Good security practices

This is quite straightforward:

- SSL, TLS and HTTPS are a must: _adding them is not difficult and the cost is very low or even free._
- Follow the principle of least privilege: _Modules, Users or any abstraction should access only the information and resources that are necessary for its purpose._

Security cannot be reduced to those two points, but those are quick wins. Try to follow the best security practices whenever you can and don't neglect them.

## Cache data to improve performance

There are many kinds of caching solutions. Cache can reduce queries to the database and make data fetching faster. The cost is to make debugging more difficult.
If you use caching, include Cache-Control information in your headers. This will help users effectively use your caching system.

## Versioning our APIs

We can just add the version number to the start of the endpoint URL path to version them: `/v2/employees`. This will allow older versions of the API to keep working.

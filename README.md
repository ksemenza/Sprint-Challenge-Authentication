# Sprint Challenge: Authentication - Dad Jokes

## Description

In this challenge, you build a real wise-guy application. _Dad jokes_ are all the rage these days. Currently the application is trying to receive some `Dad Jokes`, however we are locked out.

## Instructions

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This is an individual assessment, please work on it alone. It is an opportunity to demonstrate proficiency in the concepts and objectives introduced and practiced in preceding days.

If the instructions are not clear, please seek support from your TL and Instructor on Slack.

The Minimum Viable Product must be completed in three hours.

Follow these steps to set up and work on your project:

- [x] Create a forked copy of this project.
- [x] Add your _Team Lead_ as collaborator on Github.
- [x] Clone your forked version of the Repository.
- [x] Create a new Branch on the clone: git checkout -b `firstName-lastName`.
- [x] Implement the project on this Branch, committing changes regularly.
- [x] Push commits: git push origin `firstName-lastName`.

Follow these steps for completing your project.

- [x] Submit a Pull-Request to merge `firstName-lastName` branch into `master` on your fork. **Please don't make Pull Requests against Lambda's repository**.
- [x] Please don't merge your own pull request.
- [x] Add your _Team Lead_ as a Reviewer on the Pull-request
- [x] Your _Team Lead_ will count the challenge as done by merging the branch into _master_.

## Commits

Commit your code regularly and use descriptive messages. This helps both you (in case you ever need to return to old code) and your Team Lead.

## Self-Study/Essay Questions

Demonstrate your understanding of this week's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your project manager.

- [x] What is the purpose of using _sessions_?

Without using something like sessions, changing pages causes the server to lose any data it had about the client, such as whether the client is logged in or not. This is because HTTP protocol is stateless, with no memory across requests. 

Using sessions creates a way for data to persist across requests. The server stores sessions for each client, and cookies can be created and sent back and forth. Once a cookie is created, it contains the session ID, and it will be sent with any request related to that domain. Key/value pairs can be added to the session data. This is handy for authentication and authorization.


- [x] What does bcrypt do to help us store passwords in a secure manner.

It creates a cryptographic hash of the password, which is a much more secure way to store a password than plain text. Specifically, bcrypt follows these steps:

    1. It takes a password from the user.
    2. The cost factor is specified by the server.
    3. It generates a random salt, using a function that has the cost factor as a parameter.
    4. It derives an encryption key using the password and the salt. If the password was bad or too short, bcrypt stretches it into a longer password/key.
    5. It uses the encryption key to encrypt a well-known string.
    6. It concatenates 4 things: the identifier of the bcrypt algorithm version used, the cost, a hashed version of the salt, and the cipher text, and stores that in a single field in the database.

When a user tries to log in and enters a username and password:

    1. Decrypt looks up the username (or other identifying field, depending how you set things up) inputted by the user in the database and retrieves the cost and salt from the stored hash that corresponds with that user.
    2. It derives an encryption key using the password that the user entered, the cost and salt.
    3. Use that encryption key to encrypt the well-known string.
    4. It compares the stored cipher text to the newly-generated cipher text.
    5. If those are the same, it returns true. False otherwise.

Because bcrypt incorporates a salt (random data different for each user), it protects against rainbow table attacks. (A rainbow table is a database table created by attackers, containing pre-calculated hashs for all character combinations up to a certain length.)  Without a salt, a password could have the same hash in different databases, which would make it easier for an attacker to use a rainbow table to figure out the password.

- [x] What does bcrypt do to slow down attackers?

It uses salts, to make using rainbow tables pointless. So a hacker would have to try a brute-force attack on each password individually (in which an attacker first tries common passwords and dictionaries and then moves on to trying every possible combination of letters, numbers and symbols until the correct value is discovered). Each successful attack is independent of the next one.

Also, bcrypt is designed to be computationally expensive. It runs repeated iterations of the key derivation function to slow things down, such as 2 to the 14th power iterations when the cost is set to 14, making the database more resistant to brute-force search attacks. So an attacker can’t make as many attempts to crack a password as he/she would if bcrypt were faster.

The ability to set the cost factor is a great feature. We can diminish any benefit attackers could potentially get from faster hardware, by increasing the number of iterations to make bcrypt slower.


- [x] What are the three parts of the JSON Web Token?

1. Header: It is an encoded JSON object. The object typically consists of two parts: the type of the token, which is JWT, and the signing algorithm being used, such as HMAC SHA256 or RSA.
2. Payload: It contains the claims, which come in 3 types: registered, public, and private, and contain data. Also encoded.
3. Signature: Made with the encoded header, the encoded payload, a secret, and the algorithm specified in the header. It verifies that the data wasn’t modified along the way.

## Minimum Viable Product

Implement an User Authentication System. Hash user's passwords before saving them to the database. Use `JSON Web Tokens` or `Sessions and Cookies` to persist authentication across requests.

- [x] Implement the `register` and `login` functionality inside `/auth/auth-router.js`. A `user` has `username` and `password`. Both properties are required.
- [x] Implement the `authenticate` middleware inside `/auth/authenticate-middleware.js`.
- [x] Write a **minimum o 2 tests** per API endpoint. Write more tests if you have time.

**Note**: the database already has the users table, but if you run into issues, the migrations are available.

## Stretch Problem

Build a front end to show the jokes.

- [ ] Add a React client that connects to the API and has pages for `Sign Up`, `Sign In` and showing a list of `Jokes`.
- [ ] Once you have the functionality down, style it!

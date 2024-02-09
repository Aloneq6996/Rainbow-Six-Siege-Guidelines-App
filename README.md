# Rainbow Six Siege Guidelines

# Contents

- [Functionalities](#whats-inside)
  - [Operators](#operators)
  - [Weapons](#weapons)
  - [Statistics](#statistics)
  - [News](#news)
- [How does it work?](#but-how-does-it-work)
- [What's the purpose?](#why-in-the-world-would-you-make-it)
- [Tech](#simple-nerd-stuff)
  - [Programming languages](#programming-languages-it-was-made-in)
  - [Storage system](#settings-storage-system)
  - [Environment](#what-i-was-using)
  - [Build time](#build-time)
- [Creators](#creators)
  - [Creator](#creator)
  - [Co-Creator](#co-creator)
  - [Helpers](#helpers)
- [How to run](#how-to-run)

## What's inside?

So what does this application even do?

Here is a list of functionalities:

- ### Operators

  - A list of all operators in Siege divided to Attack and Defense
  - You can open a specific operators page to see some information about them
    - Even lore things like theirs real names
  - You can check and click theirs weapon or special gadget to check page made for them!
  - Counters listed one by one and it's even interactive!

- ### Weapons

  - A list of all weapons available in Siege
  - Underscored most optimal builds, which are updated!
  - Listed one by one Operators which uses this weapon, and it's interactive too!

- ### Statistics

  - Discontinued for now. (I'm waiting for response from ubisoft since 5.02.2024)

- ### News
  - As you can tell, you can check newest updates in here!

## But how does it work?

It's not that complicated actually

Each functionality:

- Operators

  - Each operator is a stack of information saved in jsons, made by me! Why? Because ubisoft hates developers and doesn't publish any of theirs api's :(

- Weapons

  - exactly the same as **Operators**

- Statistics

  - Based on your Ubisoft credentials (email, password, username and platform) which are provided by you in settings (don't worry it's being saved on your device so no one can intercept it), it's getting information from Ubisoft and showing it to you!
  - well it's under develompent so you can't actually use it entirely
  - **_for now it's discontinued because of lack of api_**

- News
  - It's requesting data from Ubisoft and shows the newest updates for you!

## Why in the world would you make it?

Great question, here's an answer!
I have no idea.

It was a tiny pain to make it, since React doesn't like me but even so I decided to do it.
I couldn't find a simple and yet useful guideline for Siege so I made one.
I want to update it as much as I can but I have other projects to make and school to pass.
So if not updated, well I'm sorry for that pal.

## Simple nerd stuff

### Programming languages it was made in:

- React Native
- Node.js

### Settings storage system:

- [AsyncStorage](https://reactnative.dev/docs/asyncstorage)
  - it's really simple yet amazing storage library

### What I was using:

- [VS Code](https://code.visualstudio.com/)
- [Expo](https://expo.dev/)

### Build time:

- First time
  - _approximately_ 30 000 ms
- After first time
  - _approximately_ 90ms

## Creators

### Creator: [Aloneq\_](https://github.com/Aloneq6996)

### Co-Creator [Casbear](https://github.com/casbear)

## Helpers

### Bartek Budowniczy

### Natan Naprawiacz

### Dawid Deweloper

### Maciek Myśliciel

## How to run

_I'm assuming you already have a programming environment, npm and you downloaded this project and opened it_

Download [Expo Go](https://expo.dev/client) on your phone.

Open 2 terminal windows.

- in the first one go into **rsixAppBack** and run:

```bash
npm ci
```

- after it's finished, run:

```bash
npm run dev
```

or

```bash
node index.js
```

- in the second one go into **rsixAppFront** and run:

```bash
npm ci
```

- after it's finished run:

```bash
npm start
```

- after you done this two things you can scan QR code which popped up with your camera (iOS) or expo go app (Android)

Enjoy

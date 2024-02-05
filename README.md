# Rainbow Six Siege App Documentation
Hello, it's me once again. Today I present to you a guideline based app for Rainbow Six Siege!

# Contents
- [Functionalities](##-What's-inside)
- [How does it work?](##-But-how-does-it-work)
- [What's the purpose?](##-Why-in-the-world-would-you-make-it?)
- [Tech](##-Simple-nerd-stuff)

## What's inside?
So what does this application even do?

Here is a list of functionalities:
- Operators
  - A list of all operators in Siege divided to Attack and Defense
  - You can open a specific operators page to see some information about them
	  - Even lore things like theirs real names
  - You can check and click theirs weapon or special gadget to check page made for them!
  - Counters listed one by one and it's even interactive!
- Weapons
	- A list of all weapons available in Siege
	- Underscored most optimal builds, which are updated!
	- Listed one by one Operators which uses this weapon, and it's interactive too!
- Statistics
	- it's currently under development so stay put :)
- News
	- As you can tell, you can check newest updates in here!
	- It's still being made as you read it so there will be some changes and new features

## But how does it work?
It's not that complicated actually

Each functionality:
- Operators
	- Each operator is a stack of information saved in jsons made by me! Why? Because ubisoft hates developers and doesn't publish any of theirs api's :(
- Weapons
	- exactly the same as **Operators**

- Statistics
	- Based on your Ubisoft credentials (email, password, username and platform) which are provided by you in settings (don't worry it's being saved on your device so no one can intercept it), it's getting information from Ubisoft and showing it to you!
	- well it's under develompent so you can't actually use it entirely
      _for now it's discontinued because of lack of api_

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
Programming languages it was made in:
- React Native
- Node.js

Settings storage system:
- [AsyncStorage](https://reactnative.dev/docs/asyncstorage) 
	- it's really simple yet amazing storage library

What I was using:
- [VS Code](https://code.visualstudio.com/)
- [Expo](https://expo.dev/)

Build time:
- First time
	- _approximately_ 30 000 ms
- More then first time
	- _approximately_ 90ms

## Well that's about it
Have fun using it !

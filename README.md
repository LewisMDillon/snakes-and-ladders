# SNAKES AND LADDERS

⚠️⚠️⚠️⚠️⚠️ START OF NOTES (to be deleted) ⚠️⚠️⚠️⚠️⚠️

In this section, you will include a few paragraphs providing an overview of your project.
Essentially, this part is your "sales pitch".

At this stage, you should have a name for your project so use it!
Don't introduce the project as a "portfolio project" for the diploma.

In this section, describe what the project hopes to accomplish, who it is intended to target, and how it will be useful to the target audience.

Consider adding a mockup image using the "Am I Responsive" website.
Here's your deployed site as an example:
https://ui.dev/amiresponsive?url=https://lewismdillon.github.io/snakes-and-ladders

Screenshots for the README and testing should not be inside of `assets/` or `static/` image folders.
(reminder: `assets/` and `static/` are for files used on the live site, not documentation)
Consider adding a new folder called `documentation`, and add the amiresponsive screenshot inside of that folder.
To add the image into your README, use this format:
(assuming you have a new folder called `documentation` with an image called "mockup.png")

![screenshot](documentation/mockup.png)

Note: Markdown files (.md) should not contain HTML elements like `img`, `br`, `div`, `a`, etc, only Markdown formatting.
Find out more about using Markdown elements here:
https://pandao.github.io/editor.md/en.html

🛑🛑🛑🛑🛑 END OF NOTES (to be deleted) 🛑🛑🛑🛑🛑

## UX
The aim with the user interface in this project is to provide clear and concise options to the user. The gameboard of snakes and ladders is necessarily busy and cluttered so the other elements were kept as minimal as possible.

The user is presented with the gameboard and the game setup in one screen to prevent having to scroll up and down to access options. HTML elements are added and removed depending on the game state so as to keep the game area clean and un-cluttered.

Large buttons and fonts make it easy for the user to interact with the different elements and recieve information back from them.

Color-dependent text is used to further clarify things such as turn states.


### Colour Scheme

The site uses bright, pastel colours for the gameboard elements with accented blue elements for the fonts and buttons. Player pieces are also brightly coloured, but using strong, bold primary and secondary colours so as to draw the eye of the user and allow them to instantly spot their piece on the gameboard.

- `#3d999a` used for primary text.
- `#327e80` used for primary highlights.
- `#ffe8cc` used for gameboard.
- `#ff9e40` used for gameboard.
- `#9ad6d7` used for gameboard.
- `#ffcdb6` used for gameboard.
- `#bc91d9` used for gameboard.


⚠️⚠️⚠️⚠️⚠️ START OF NOTES (to be deleted) ⚠️⚠️⚠️⚠️⚠️

Consider adding a link and screenshot for your colour scheme using "coolors".
https://coolors.co/generate

When you add a colour to the palette, the URL is dynamically updated, making it easier for you to return back to your colour palette later if needed.

Example:

🛑🛑🛑🛑🛑 END OF NOTES (to be deleted) 🛑🛑🛑🛑🛑

I used [coolors.co](https://coolors.co/e84610-009fe3-4a4a4f-445261-d63649-e6ecf0-000000) to generate my colour palette.

![screenshot](documentation/coolors.png)


### Typography

Google Fonts as used for all main fonts in the site

Google Material Symbols & Icons, as well as FontAwesome were used for icons


- [Yanone Kaffeesatz](https://fonts.google.com/specimen/Yanone+Kaffeesatz) was used for the primary headers and titles.

- [PT Sans](https://fonts.google.com/specimen/PT+Sans) was used for all other secondary text.

- [Google Icons](https://fonts.google.com/icons) icons were used throughout the site

- [Font Awesome](https://fontawesome.com) icons were used throughout the site

## Features

⚠️⚠️⚠️⚠️⚠️ START OF NOTES (to be deleted) ⚠️⚠️⚠️⚠️⚠️

In this section, you should go over the different parts of your project,
and describe each in a sentence or so.

You will need to explain what value each of the features provides for the user,
focusing on who this website is for, what it is that they want to achieve,
and how your project is the best way to help them achieve these things.

For some/all of your features, you may choose to reference the specific project files that implement them.

IMPORTANT: Remember to always include a screenshot of each individual feature!

🛑🛑🛑🛑🛑 END OF NOTES (to be deleted) 🛑🛑🛑🛑🛑

### Existing Features

- **Game Board**

    - This is the main game area of the site. player pieces advance up the numbered squares to reach the finish square. This provides the surface for the player pieces, as well as depictions of where the snake and ladder squares are.

![screenshot](documentation/feature01.png)

- **Game Setup Form**

    - This form allows the user to customize the game to their liking. A user can choose whether to play a 1-player game against a computer opponent or a 2-player game with another user. Users can also select the colour of their player piece. The form automatically changes based on whether the user selects 1 or 2 players, helping to avoid unnecessary confusion. The Start Game button provides the user with a very clear and definitive way of beginning the game.

![screenshot](documentation/feature02.png)

- **Dice Roller**

    - This is the mechanism used by the user to advance their piece up the board. Once the game begins, these elements take the place of the setup form to keep all of the elements tidy and compact. A large 'Roll' button makes it easy for the user to use this feature. A rolling die image next to the button simulates the rolling of a die before displaying the result of the user's roll. This helps to add realism and satisfaction to the ordinary random number generation going on in the background. The roll button is disabled while the dice animation is playing, and also while the computer is taking their turn, avoiding risk of multiple or accidental clicks.

![screenshot](documentation/feature03.png)

- **Player Pieces**

    - The player pieces are large and contrasting against the gameboard, as well as their colour being customisable, allowing the user to quickly see where on the gameboard their piece is.
    Smooth transitions were used to help the user to follow the piece along the board as it moves, as well as providing realism to the movement of the pieces. The pieces visibly climb up the ladders and slide down the snakes on the board, again hlping the user to easily visualise what is happening on the gameboard.

![screenshot](documentation/feature04.png)

- **Computer Piece**

    - The computer piece functions in the same way as the player pieces, but is colored a robotic grey. A robotic face icon is also added to the piece to further clarify this piece's identity to the user.

![screenshot](documentation/feature05.png)

- **1-Player Game**

    - A computer opponent is implemented in order to allow the user to play the game on their own. The computer player takes its turn automatically, without dice roll animations, in order for the user to quickly return to playing their turn.

![screenshot](documentation/feature06.png)

- **2-Player Game**

    - Users can also choose to play a 2-player game via the setup form. The site will allow the users to choose their individual colors and, upon starting the game, will randomly select one or the other to take their turn first. The game will then alternate turns between the two users.

![screenshot](documentation/feature07.png)

- **Color Check**

    - When a 2-player game is started, the site will perform a check to see if the players have selected the same coloured player piece. If so, the site will alert the users to this fact and ask them to pick different colours, to avoid confusion while playing. 

![screenshot](documentation/feature08.png)

- **Reset Game Button**

    - This button allows the user to reset the game back to its original state. The user is prompted to confirm this action, to avoid accidental clicks. The pieces' location is reset to the first square on the gameboard and the setup form is once again presented to the user to setup another game if they should choose. The button is disabled during turns to avoid potential bugs caused by resetting the game while pieces are moving.

![screenshot](documentation/feature09.png)

- **Game Messages**

    - Game messages are presented to the user to provide information and reduce potential confusion. The user will see messages informing them of the current turn, with a color matching that player's piece. If a user is playing against a computer opponent, the computer's automatically generated dice rolls will also be displayed, to help the user to visualise the computer opponent's turn, but without having to watch the computer go through their own dice roll animation.

![screenshot](documentation/feature10.png)

- **Background Music**

    - Background music begins automatically wheen the user starts the game. Music was not chosen to begin autoplaying on first loading of the site as this can be disabled by certain browsers. The music is easygoing and not too loud, to provide a simple background accompaniment which enhances the experience of playing the game.

- **Audio Effects**

    - The dice roller produces a real dice shaking and rolling sound to further increase the satisfaction and realism of using the dice roll element. When a piece climbs a ladder, a pleasant, rising style sound effect is played to draw the user's attention to the ladder function as well as to provide a sense of satisfaction at having landed on the ladder square. When a piece slides down a snake, a less pleasant, falling style sound effect is played.

- **Audio Mute Button**

    - This button allows the user to mute and unmute all audio from the site. Users can easily press the button at any time during all stages of the game to mute it the audio, or turn it back on. Recognisable volume and mute icons are displayed to the user, allowing them to see what state the audio mute setting is, even without using the audio itself. 

![screenshot](documentation/feature13.png)


### Future Features

- Multiple players
    - Ability to select more than two players would provide more ways to play the game.
- Multiple computer players
    - This would mean that one or more users can add multiple computer opponents to a game, increasing the challenge
- Remote play
    - Facility for users to connect and play the game remotely

## Tools & Technologies Used

- [HTML](https://en.wikipedia.org/wiki/HTML) used for the main site content.
- [CSS](https://en.wikipedia.org/wiki/CSS) used for the main site design and layout.
- [JavaScript](https://www.javascript.com/) used for auto-closing the responsive burger menu.
- [CSS Flexbox](https://www.w3schools.com/css/css3_flexbox.asp) used for an enhanced responsive layout.
- [Git](https://git-scm.com) used for version control. (`git add`, `git commit`, `git push`)
- [GitHub](https://github.com) used for secure online code storage.
- [GitHub Pages](https://pages.github.com) used for hosting the deployed front-end site.
- [Gitpod](https://gitpod.io) used as a cloud-based IDE for development.
- [Markdown Builder by Tim Nelson](https://traveltimn.github.io/markdown-builder) used to help generate the Markdown files.
- [Google Fonts](https://fonts.google.com/) used for fonts on the site.
- [Color Hexa](https://www.colorhexa.com/) used to generate contrasting and complementary colors 
- [Palette Generator](https://palettegenerator.com/) used to generate color palettes based on image colors
- [Web AIM](https://webaim.org/resources/contrastchecker/) used to check color contrast for accessibility purposes
- [Dimensions](https://chrome.google.com/webstore/detail/dimensions/baocaagndhipibgklemoalmkljaimfdj?hl=en) Chrome extension used to measure dimensions on virtual elements of site
- [Eye Dropper](https://chrome.google.com/webstore/detail/eye-dropper/hmdcmlfkchdmnmnmheododdhjedfccka?hl=en) Chrome extension used to quickly identify and work with colors
- [Pesticide](https://chrome.google.com/webstore/detail/pesticide-for-chrome/bakpbgckdnepkmkeaiomhmfcnejndkbi) Chrome extension used to illustrate borders on virtual elements
- [Cubase](https://www.steinberg.net/cubase/) DAW used to edit audio.

## Testing

For all testing, please refer to the [TESTING.md](TESTING.md) file.

## Deployment

The site was deployed to GitHub Pages. The steps to deploy are as follows:
- In the [GitHub repository](https://github.com/LewisMDillon/snakes-and-ladders), navigate to the Settings tab 
- From the source section drop-down menu, select the **Main** Branch, then click "Save".
- The page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment.

The live link can be found [here](https://lewismdillon.github.io/snakes-and-ladders)

### Local Deployment

This project can be cloned or forked in order to make a local copy on your own system.

#### Cloning

You can clone the repository by following these steps:

1. Go to the [GitHub repository](https://github.com/LewisMDillon/snakes-and-ladders) 
2. Locate the Code button above the list of files and click it 
3. Select if you prefer to clone using HTTPS, SSH, or GitHub CLI and click the copy button to copy the URL to your clipboard
4. Open Git Bash or Terminal
5. Change the current working directory to the one where you want the cloned directory
6. In your IDE Terminal, type the following command to clone my repository:
	- `git clone https://github.com/LewisMDillon/snakes-and-ladders.git`
7. Press Enter to create your local clone.

Alternatively, if using Gitpod, you can click below to create your own workspace using this repository.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/LewisMDillon/snakes-and-ladders)

Please note that in order to directly open the project in Gitpod, you need to have the browser extension installed.
A tutorial on how to do that can be found [here](https://www.gitpod.io/docs/configure/user-settings/browser-extension).

#### Forking

By forking the GitHub Repository, we make a copy of the original repository on our GitHub account to view and/or make changes without affecting the original owner's repository.
You can fork this repository by using the following steps:

1. Log in to GitHub and locate the [GitHub Repository](https://github.com/LewisMDillon/snakes-and-ladders)
2. At the top of the Repository (not top of page) just above the "Settings" Button on the menu, locate the "Fork" Button.
3. Once clicked, you should now have a copy of the original repository in your own GitHub account!

### Local VS Deployment

⚠️⚠️⚠️⚠️⚠️ START OF NOTES (to be deleted) ⚠️⚠️⚠️⚠️⚠️

Use this space to discuss any differences between the local version you've developed, and the live deployment site on GitHub Pages.

🛑🛑🛑🛑🛑 END OF NOTES (to be deleted) 🛑🛑🛑🛑🛑

## Credits

⚠️⚠️⚠️⚠️⚠️ START OF NOTES (to be deleted) ⚠️⚠️⚠️⚠️⚠️

In this section you need to reference where you got your content, media, and extra help from.
It is common practice to use code from other repositories and tutorials,
however, it is important to be very specific about these sources to avoid plagiarism.

🛑🛑🛑🛑🛑 END OF NOTES (to be deleted) 🛑🛑🛑🛑🛑

### Content

⚠️⚠️⚠️⚠️⚠️ START OF NOTES (to be deleted) ⚠️⚠️⚠️⚠️⚠️

Use this space to provide attribution links to any borrowed code snippets, elements, or resources.
A few examples have been provided below to give you some ideas.

Ideally, you should provide an actual link to every resource used, not just a generic link to the main site!

🛑🛑🛑🛑🛑 END OF NOTES (to be deleted) 🛑🛑🛑🛑🛑

| Source | Location | Notes |
| --- | --- | --- |
| [Markdown Builder](https://traveltimn.github.io/markdown-builder) | README and TESTING | tool to help generate the Markdown files |
| [Chris Beams](https://chris.beams.io/posts/git-commit) | version control | "How to Write a Git Commit Message" |
| [W3Schools](https://www.w3schools.com/howto/howto_js_topnav_responsive.asp) | entire site | responsive HTML/CSS/JS navbar |
| [W3Schools](https://www.w3schools.com/howto/howto_css_modals.asp) | contact page | interactive pop-up (modal) |
| [W3Schools](https://www.w3schools.com/css/css3_variables.asp) | entire site | how to use CSS :root variables |
| [Flexbox Froggy](https://flexboxfroggy.com/) | entire site | modern responsive layouts |
| [Grid Garden](https://cssgridgarden.com) | entire site | modern responsive layouts |
| [StackOverflow](https://stackoverflow.com/a/2450976) | quiz page | Fisher-Yates/Knuth shuffle in JS |
| [YouTube](https://www.youtube.com/watch?v=YL1F4dCUlLc) | leaderboard | using `localStorage()` in JS for high scores |
| [YouTube](https://www.youtube.com/watch?v=u51Zjlnui4Y) | PP3 terminal | tutorial for adding color to the Python terminal |
| [strftime](https://strftime.org) | CRUD functionality | helpful tool to format date/time from string |
| [WhiteNoise](http://whitenoise.evans.io) | entire site | hosting static files on Heroku temporarily |

### Media

⚠️⚠️⚠️⚠️⚠️ START OF NOTES (to be deleted) ⚠️⚠️⚠️⚠️⚠️

Use this space to provide attribution links to any images, videos, or audio files borrowed from online.
A few examples have been provided below to give you some ideas.

If you're the owner (or a close acquaintance) of all media files, then make sure to specify this.
Let the assessors know that you have explicit rights to use the media files within your project.

Ideally, you should provide an actual link to every media file used, not just a generic link to the main site!
The list below is by no means exhaustive. Within the Code Institute Slack community, you can find more "free media" links
by sending yourself the following command: `!freemedia`.

🛑🛑🛑🛑🛑 END OF NOTES (to be deleted) 🛑🛑🛑🛑🛑

| Source | Location | Type | Notes |
| --- | --- | --- | --- |
| [Pexels](https://www.pexels.com) | entire site | image | favicon on all pages |
| [Lorem Picsum](https://picsum.photos) | home page | image | hero image background |
| [Unsplash](https://unsplash.com) | product page | image | sample of fake products |
| [Pixabay](https://pixabay.com) | gallery page | image | group of photos for gallery |
| [Wallhere](https://wallhere.com) | footer | image | background wallpaper image in the footer |
| [This Person Does Not Exist](https://thispersondoesnotexist.com) | testimonials | image | headshots of fake testimonial images |
| [Audio Micro](https://www.audiomicro.com/free-sound-effects) | game page | audio | free audio files to generate the game sounds |
| [Videvo](https://www.videvo.net/) | home page | video | background video on the hero section |
| [TinyPNG](https://tinypng.com) | entire site | image | tool for image compression |

### Acknowledgements

⚠️⚠️⚠️⚠️⚠️ START OF NOTES (to be deleted) ⚠️⚠️⚠️⚠️⚠️

Use this space to provide attribution to any supports that helped, encouraged, or supported you throughout the development stages of this project.
A few examples have been provided below to give you some ideas.

🛑🛑🛑🛑🛑 END OF NOTES (to be deleted) 🛑🛑🛑🛑🛑

- I would like to thank my Code Institute mentor, [Tim Nelson](https://github.com/TravelTimN) for their support throughout the development of this project.
- I would like to thank the [Code Institute](https://codeinstitute.net) tutor team for their assistance with troubleshooting and debugging some project issues.
- I would like to thank the [Code Institute Slack community](https://code-institute-room.slack.com) for the moral support; it kept me going during periods of self doubt and imposter syndrome.
- I would like to thank my partner (John/Jane), for believing in me, and allowing me to make this transition into software development.
- I would like to thank my employer, for supporting me in my career development change towards becoming a software developer.

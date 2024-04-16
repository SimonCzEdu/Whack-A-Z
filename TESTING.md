# Testing
## Code Validation
The Whack-a-Z site has be thoroughly tested. All the code has been run through the [W3C html Validator](https://validator.w3.org/) and the [W3C CSS Validator](https://jigsaw.w3.org/css-validator/). Minor errors were found on the all pages. After a fix and retest, no errors were returned for any of the pages tested. 

The HTML validator results for each page are below:

* Logo page

![W3C Validator test result](assets/image/Readme-images/01_validation-index.html.jpg)

* Home page

![W3C Validator test result](assets/image/Readme-images/02_validation-home.html.jpg)

* Gallery page

![W3C Validator test result](assets/image/Readme-images/03_validation-gallery.html.jpg)

* Contact us page

![W3C Validator test result](assets/image/Readme-images/04_validation-form.html.jpg)

* Form validation page

![W3C Validator test result](assets/image/Readme-images/05_validation-submission.html.jpg)

The CSS validator results are below:

![CSS Validator test result](assets/image/Readme-images/06_validation-style.css.jpg)

## Responsiveness Test

* The responsive design tests were carried out manually with [Google Chrome DevTools](https://developer.chrome.com/docs/devtools/) and [Responsive Design Checker](https://www.responsivedesignchecker.com/checker.php?url=https%3A%2F%2Fsimonczedu.github.io%2FFuture-Window---CI-Project---01%2F&width=1920&height=1200).

|        | Moto G4 | Galaxy S5 | iPhone 5 | iPad | iPad Pro | Display <1200px | Display >1200px |
|--------|---------|-----------|----------|------|----------|-----------------|-----------------|
| Render | pass    | pass      | pass     | pass | pass     | pass            | pass            |
| Images | pass    | pass      | pass     | pass | pass     | pass            | pass            |
| Links  | pass    | pass      | pass     | pass | pass     | pass            | pass            |

## Testing User Stories

* As a user I want to be able to navigate through the whole site smoothly.
    * Navigation is at the top of every page in the form of the **navigation menu**.
    * Navigation menu is always on screen due to it's fixed position. On user input it can be hidden with a checkbox. This is in the spirit of: "there when you need it, gone when you don't" 
    * In the the Gallery section, there are an additional links to the two section of the Gallery: Light and Cold.

    <br>
* As a user I want to understand the purpose of the site upon loading it.
    * Home page is answering three questions: Who, What, How. This is so users know from the start who/what the Whack-a-Z is; what they do and how they do it. 

    <br>
* As a user I want to easily be able to contact Whack-a-Z for more information.
    * On the **contact us** page there are contact details.
    * On the **contact us** page there is also a **form** for ease of contact.
    * On the **contact us** page users can find a map, to find and visit Whack-a-Z

    <br>
* As a user, I want to see product samples.
    * The **Gallery** page features responsive gallery of photos divided into to sections: Light and Cold.

    <br>
* As a user, I want to be able to provide a feedback/ask questions directly to the company.
    * On the **contact us** page form provides an option to put in feedback in text area.

    <br>
* As a user I want to connect with Whack-a-Z on social media.
    * In the **footer** of every page there are some **social media links** to Whack-a-Z social media pages. 
    * Same as navigation links, these can be hidden on user input.

## Known Bugs
* ### Resolved

	* Bug 01 - When setting up end Turn with event listener on #endTurn div that only exists IF player did 2 actions this error msg appeared:

		* script.js:47 Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
		* at script.js:47:35

	* Theory:
		* Suspecting I need to create endTurn div, but hide it with .style.display = 'none' instead. Will test now.
		* Test successful. Fixed.
	

	* Bug 02 - When I tested 'end turn/zombie turn' I noticed that zombie was rolling for attack one time on first press, two on second, three on third ect. - resulting in more chances to hit player. Considered a bug as it is not initially intended behavior. However this creates interesting mechanic that will be considered a feature with tweaks to zombie hit chance and damage for the future iterations.

	* Theory:
		* Function nesting is causing the increase in how many times endTurn is called.

	Solution:
	I've broken down endTurn() into endTurnBtn() and zTurn(). zTurn() portion is no longer called on 'click' event. Instead it is called once after remainder is ===0. This means that zombie rolls attack only once per 2 player moves as originally intended.

	*Bug 03 - Combat log is displaying only last action. This can lead to confussion as to what is happening. 

	Theoretical solution:
	instead of simply loging:

	"Message on hit
	document.getElementById(`combatLog`).innerHTML = `Zombie swings and hits! You take ${zAttackDmg} points of damage!`;"

	I will append the combat log instead and make it so players can scroll through combat log.

	*Bug 04 - When I tested game on my phone initial load had "actions" div out of place. 

	Theory:
	Pushing from the bottom instead from the top (like the rest of the items with fixed positions) caused and issue. - tested. Conclusion: theory was wrong.

	Solution:
	- Body was parent for all divs. It's relative postion could not be changed due to the background image depending on it. Instead I enclosed all dives in section #main. That solved the issue for the most part.
	- Fixed by changing how tooltips are displayed as it was expanding screen.

* ### Unresolved

    * On my phone sometimes I can't scroll to the bottom of a page. Works on my wifes phone. Same manufacturer - different model. Might be cache issue, or browser/OS issue. It would be prime candidate for day one patch if players report it as a widespread bug on phones. Looks good in dev tools though.
	* Tooltip behaviour - works on both phones and computer screens, but I had version with tooltip following cursor. It did not work for phones though. In future versions by using pointer: coars check I can return to that concept and make inv and settings also close on tap out (without need for clicking specifically on their respective "buttons".


## Additional Testing
### Lighthouse
The site was also tested using [Google Lighthouse](https://developers.google.com/web/tools/lighthouse) in Chrome Developer Tools to test each of the pages for:
* Performance - How the page performs whilst loading.
* Accessibility - Is the site accessible for all users and how can it be improved.
* Best Practices - Site conforms to industry best practices.
* SEO - Search engine optimization. Is the site optimized for search engine result rankings.

As an example the results for Whack-a-Z gallery page (featuring most photos and thus using most resources) are below:
![Lighthouse test results](assets/image/Readme-images/08_speed-test.jpg)

* Conclusion: ...

### Peer review
In addition to the above testing the beta version of the site was put through its paces by peers, both in the software development field and outside. The bug with scrolling on phone screes has been reported. It since been adressed, but I will monitor further scrolling issues on phones. There were also minor spelling and grammar errors that have since been addressed.

Back to [README.md](./README.md#testing).
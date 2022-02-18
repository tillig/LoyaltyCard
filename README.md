# LoyaltyCard

> :warning: For a long time phone-based loyalty card apps didn't work for me, so I ended up writing this app. Since then the tech has improved and I've sort of let it die. I have a branch at `feature/reactjs` where I started trying to learn React and update it to be more single-page-app, but time, desire, and burnout all collided to mean... I just didn't. I may come back to it if I ever feel like fighting some UI, but hopes are not high.

LoyaltyCard is a web application to generate a combined loyalty/club card.

I loved the (now-offline) "JustOneClubCard" application. I had created a couple of combined cards that I carried with me everywhere. When that disappeared, I made this as a way to get a physical combined card.

## License

LoyaltyCard is released under an [MIT License](http://opensource.org/licenses/MIT).

LoyaltyCard makes use of the following libraries and services:

- [jQuery](http://jquery.com/) because JQUERY. ([MIT License](http://opensource.org/licenses/MIT))
- [jsPDF](http://jspdf.com/) for generating the card PDF. ([MIT License](http://opensource.org/licenses/MIT))
- [Bootstrap](http://getbootstrap.com/) for UI widgetry. ([MIT License](http://opensource.org/licenses/MIT))
- [Holder.js](http://imsky.github.io/holder/) for little preview placeholders. ([MIT License](http://opensource.org/licenses/MIT))
- [TEC-IT Barcode Software](https://barcode.tec-it.com/en) for creating the barcode images.

## Developing

Running the LoyaltyCard app requires a web site running .NET (e.g., IIS Express) because, to generate the client-side PDF, I need to convert images from the barcode generator to base64 and I couldn't figure out how to do that cross-domain. (the Microscan generator doesn't have the right CORS support). I wrote a tiny proxy/handler for that in C#.

Run the `start-host.bat` file to start IIS Express on the `src` folder. There is a shortcut `Load Test Card.url` you can use to load the app up with some dummy data in it and see it in action.

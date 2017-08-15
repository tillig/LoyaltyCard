# LoyaltyCard

LoyaltyCard is a web application to generate a combined loyalty/club card.

I loved the (now-offline) "JustOneClubCard" application. I had created a couple of combined cards that I carried with me everywhere.

Phone-based loyalty card applications have never worked for me. About half the time, the phone is too reflective or the scanner just can't pick up the data. A card works every time. Since "JustOneClubCard" went out, I decided to tinker with client-side PDF generation and some other stuff and create this little app.

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

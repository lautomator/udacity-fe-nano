#P5 Neighborhood Map Project

##Overview
This is a single page application featuring a map of restaurant locations in my area. Additional functionality includes highlighted locations, third-party data about those locations and various ways to browse the content. Some of those include filtering results and getting additional info from the map markers.

The [FOURSQUARE](https://foursquare.com/) API is used to get the relevant data.
[Google Maps](https://developers.google.com/maps/?hl=en) is used to render the maps and markers.

##Setup
To get this running: clone or download this repo. Open `index.html` in your web browser. You can also run from a local server environment: For example, run the following in the root directory via your terminal: `python -m SimpleHTTPServer 8000` to run on port 8000 (http://localhost:8000/).

**Please Note:** You will need to provide your own *keys* from **FourSquare** by registering the app and getting the *Client ID* and *Client Secret* keys. Those are then passed into the data file in `main.js`:
```
    clientID: keys.cid, // your client ID key
    clientSecret: keys.cse // your client secret key
```
The data for these keys in not in version control.

### Working Locally
You can use the sample data called `test-data.js` while working locally or without an internet connection. You will need to set the following variable in `main.js` called `local` to **true** to enable this feature.

```
    local: true // set to true for development

```

Set this to **false** if you want to access the FOURSQUARE API data.

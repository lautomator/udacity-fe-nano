# Website Optimization

## Project 4
Optimize the performance of the Portfolio page and the Pizza page.

##Setup
Download and install [ngrok](https://ngrok.com/) to make your local server accessible remotely.

You will also need to install [Grunt](http://gruntjs.com/getting-started).

There are two directories: `source` and `production`. The **source** folder contains the development files that you can work with. The **production** folder is where everything is built by the Grunt task.

1. Clone this repo.
2. In the terminal, cd to the `production` folder.
3. Activate the localhost server (port: 8080): `python -m SimpleHTTPServer 8080`
4. In the web browser go to the url: `http://localhost:8080/` to verify that the page is working.
5. In a new tab, cd to `production` again and initialize ngrok: `ngrok http 8080`. This should give you a url that you can copy. Paste the url into a new browser tab.

Any changes reflected on the localhost will also be reflected in the external url (after refreshing). Use the external url for checking the site performance in [Page Speed Insights](https://developers.google.com/speed/pagespeed/insights/).

##Procedures
You will need to install the *grunt* task dependencies: cd to the `source` folder and type: `npm install`. This will load all of the plugins from `package.json`. You only need to do this once.

1. Only edit the files in the `source` directory.
2. After making any changes to files in the `source` directory, `grunt`. This will minify all css, js, and html. It will also copy these files to the production folder.
3. Go to the localhost and refresh (refresh the ngrok url as well). You should see your changes. You can then test Page Speed Insights again to check the performance.
5. Repeat, as necessary.
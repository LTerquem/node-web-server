const express = require("express");
const hbs = require("hbs");

const port = process.env.PORT || 3000;
var app = express()

const maintenanceUndergoing = false;

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use( (req, res, next) => {
	if(maintenanceUndergoing) {
		res.render("maintenance", {
			pageTitle: "Maintenance Page",
			maintenanceMessage: "This website is currently undergoing maintenance. Please come back later :)"
		});
	} else { 
		next(); 
	}
})

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
	return new Date().getFullYear();
})

app.get("/", (req, res) => {
	res.render("home.hbs", {
		pageTitle: "Home Page",
		currentYear: new Date().getFullYear(),
		welcomeMessage: "Welcome to my website wooooooh!"
	})
})
app.get("/bad", (req, res) => {
	res.send({
		errorMessage: "Unable to fulfill the request",
		errorCode: 30202,
		moreInfo: "Nope"
	})
})
app.get("/about", (req, res) => {
	res.render("about.hbs", {
		pageTitle: "About Page",
		currentYear: new Date().getFullYear()
	});
})
app.listen(port, () => console.log(`Server is up and running on port ${port}`));
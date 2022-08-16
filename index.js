import webdriver from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import chromedriver from "chromedriver";

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

var driver = new webdriver.Builder()
	.withCapabilities(webdriver.Capabilities.chrome())
	.build();


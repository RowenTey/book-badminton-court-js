import webdriver from "selenium-webdriver";
import { By } from "selenium-webdriver";
import fs from "fs";
import chromedriver from "chromedriver";

async function bookCourt() {
	var start = new Date();

	// instantiate the driver object
	var driver = new webdriver.Builder()
		.withCapabilities(webdriver.Capabilities.chrome())
		.build();

	try {
		// go to NTU sports booking URL
		await driver.get(
			"https://sso.wis.ntu.edu.sg/webexe88/owa/sso_login1.asp?t=1&p2=https://wis.ntu.edu.sg/pls/webexe88/srce_smain_s.Notice_O&extra=&pg="
		);

		// enter username
		const username = process.env.NTU_USERNAME;
		await driver.findElement(By.name("UserName")).sendKeys(username);
		await driver.findElement(By.name("bOption")).click();

		// enter password
		const password = process.env.PASSWORD;
		await driver.findElement(By.name("PIN")).sendKeys(password);
		await driver.findElement(By.name("bOption")).click();

		// select badminton radio
		await driver.findElement(By.xpath("//input[@value='1BB26']")).click();
		await driver.sleep(2);

		// select badminton slot
		// format -> 1BB2BB<courtnumber><date><session>
		const court_number = "01";
		const date = "23-Aug-2022";
		const session = "2";
		const xpath = `//input[@value='1BB2BB${court_number}${date}${session}']`;

		await driver.findElement(By.xpath(xpath.toString())).click();
		await driver.sleep(2);

		// select confirm
		await driver.findElement(By.xpath("//input[@value='Confirm']")).click();

		// take screenshot & save in 'screenshots' folder
		await driver.takeScreenshot().then((pic) => {
			var picData = pic.replace(/^data:image\/png;base64,/, "");

			fs.writeFile(
				`screenshots/${date}_receipt.png`,
				picData,
				"base64",
				(err) => {
					if (err) console.log(err);
					else {
						console.log("File saved successfully\n");
					}
				}
			);

			var end = new Date() - start;
			console.log("\nCourt booked successfully");
			console.log("Elapsed time: %dms", end);
		});
	} catch (error) {
		console.log(error);
	} finally {
		driver.quit();
	}
}

bookCourt();

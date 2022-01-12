const { app, BrowserWindow } = require("electron");

require("@electron/remote/main").initialize();

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteMode: true
		}
	});

	win.loadURL("http://localhost:3000");
	win.setMenuBarVisibility(false);
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

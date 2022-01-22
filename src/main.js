const electron = require("electron");
const { app, BrowserWindow } = require("electron");
require("@electron/remote/main").initialize();

function createWindow() {
	const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
	const win = new BrowserWindow({
		width,
		height,
		backgroundColor: "#888",
		webPreferences: {
			enableRemoteMode: true,
			worldSafeExecuteJavaScript: true,
			contextIsolation: true,
			sandbox: true,
			devTools: false
		}
	});
	win.loadURL("http://localhost:3000");
	win.setMenuBarVisibility(false);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("web-contents-created", (event, contents) => {
	contents.on("will-attach-webview", (event, webPreferences, params) => {
		delete webPreferences.preload;
		delete webPreferences.preloadURL;
		if (!params.src.startsWith("http://localhost:3000")) {
			event.preventDefault();
		}
	});
});

const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "../public");
const distDir = path.join(__dirname, "../dist");

// Copy manifest and icons
fs.copyFileSync(
  path.join(publicDir, "manifest.json"),
  path.join(distDir, "manifest.json")
);

const icons = ["spezi-logo-1.png"];
icons.forEach((icon) => {
  const iconPath = path.join(publicDir, icon);
  if (fs.existsSync(iconPath)) {
    fs.copyFileSync(iconPath, path.join(distDir, icon));
  }
});

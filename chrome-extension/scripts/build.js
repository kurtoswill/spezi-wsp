const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "../public");
const distDir = path.join(__dirname, "../dist");

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

const oldPath = path.join(distDir, "_next");
const newPath = path.join(distDir, "assets");

if (fs.existsSync(oldPath)) {
  fs.renameSync(oldPath, newPath);

  const htmlFiles = fs.readdirSync(distDir).filter((f) => f.endsWith(".html"));

  htmlFiles.forEach((file) => {
    const filePath = path.join(distDir, file);
    let content = fs.readFileSync(filePath, "utf8");
    content = content.replace(/_next\//g, "assets/");
    fs.writeFileSync(filePath, content);
  });
}

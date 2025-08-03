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

// Fix _next folder for Chrome extension
const oldPath = path.join(distDir, "_next");
const newPath = path.join(distDir, "assets");

if (fs.existsSync(oldPath)) {
  fs.renameSync(oldPath, newPath);
  console.log("Renamed _next to assets");
}

// Function to recursively get all files
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

// Get all files and update references
const allFiles = getAllFiles(distDir);

allFiles.forEach((filePath) => {
  const ext = path.extname(filePath);

  // Process text files that might contain references
  if ([".html", ".js", ".css", ".json"].includes(ext)) {
    try {
      let content = fs.readFileSync(filePath, "utf8");
      const originalContent = content;

      // Replace all possible _next reference patterns
      content = content.replace(/\.\/_next\//g, "./assets/");
      content = content.replace(/\/_next\//g, "/assets/");
      content = content.replace(/"_next\//g, '"assets/');
      content = content.replace(/'_next\//g, "'assets/");
      content = content.replace(/_next\//g, "assets/");
      content = content.replace(/src="\.\/_next/g, 'src="./assets');
      content = content.replace(/href="\.\/_next/g, 'href="./assets');

      // Remove inline script attributes that cause CSP issues
      if (ext === ".html") {
        content = content.replace(/\s*async=""/g, " async");
        content = content.replace(/\s*nomodule=""/g, " nomodule");
      }

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(
          `Updated references in ${path.relative(distDir, filePath)}`
        );
      }
    } catch (err) {
      // Skip binary files
    }
  }
});

// Add minimal CSP (styles only, no unsafe-inline for scripts)
const manifestPath = path.join(distDir, "manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

// Only allow styles, not scripts
manifest.content_security_policy = {
  extension_pages:
    "script-src 'self'; style-src 'self' 'unsafe-inline'; object-src 'self';",
};

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log("Build completed successfully!");

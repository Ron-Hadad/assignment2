const { execSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

// Function to run shell commands synchronously
function runCommand(command, options = {}) {
  try {
    console.log(`Running command: ${command}`);
    execSync(command, { stdio: "inherit", ...options });
  } catch (error) {
    console.error(`Error executing command: ${command}\n${error}`);
    process.exit(1);
  }
}

// Function to run a command in the background
function runCommandInBackground(command, options = {}) {
  try {
    console.log(`Running command in background: ${command}`);
    const child = spawn(command, { shell: true, stdio: "inherit", ...options });
    child.on("error", (error) => {
      console.error(`Error executing command: ${command}\n${error}`);
      process.exit(1);
    });
  } catch (error) {
    console.error(`Error executing command: ${command}\n${error}`);
    process.exit(1);
  }
}

// Get repository URL from command line arguments
const repoUrl = process.argv[2];
if (!repoUrl) {
  console.error("Repository URL is required as a command line argument.");
  process.exit(1);
}

// Clone the repository
const cloneDir = "cloned_repo";
runCommand(`git clone ${repoUrl} ${cloneDir}`);

// Change directory to the cloned repository
process.chdir(cloneDir);

// Checkout branch a2 (uncomment if needed)
runCommand("git checkout a2");

// Copy .env file to the backend directory
const backendDir = path.join(process.cwd(), "backend");
if (fs.existsSync(backendDir)) {
  fs.copyFileSync(
    path.join(process.cwd(), "..", ".env"),
    path.join(backendDir, ".env")
  );
} else {
  console.error("Backend directory does not exist.");
  process.exit(1);
}

// Install backend dependencies and run backend server
process.chdir(backendDir);
runCommand("npm install");
runCommandInBackground("node index.js");

// Install frontend dependencies and run development server
const frontendDir = path.join(process.cwd(), "..", "frontend");
if (fs.existsSync(frontendDir)) {
  process.chdir(frontendDir);
  runCommand("npm install");
  runCommand("npm run dev");
} else {
  console.error("Frontend directory does not exist.");
  process.exit(1);
}

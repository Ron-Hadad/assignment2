const fs = require('fs');
//const faker = require('faker');

// Function to generate a single post
const generatePost = (idIn) => ({
  id: idIn,
  title: `Title ${idIn}`,
  auther: {name: `name of auther ${idIn}`, email: `email of author ${idIn}`,},
  content: `Content for post ${idIn} : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."`,
});

// Function to generate N posts
const generatePosts = (N) => {
  const posts = [];
  for (let i = 1; i <= N; i++) {
    posts.push(generatePost(i));
  }
  return posts;
};

// Main function to create and save the JSON file
const main = (N) => {
  const posts = generatePosts(N);
  const data = { notes: posts };
  fs.writeFileSync('./data/notes.json', JSON.stringify(data, null, 2));
  console.log(`Generated ${N} posts and saved to ./data/notes.json`);
};

// Get the number of posts from command-line arguments
const N = parseInt(process.argv[2], 10);
if (!N || N <= 0) {
  console.error('Please provide a valid number of posts to generate.');
  process.exit(1);
}

main(N);

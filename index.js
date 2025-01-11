// A SIMPLE BLOG CLI APPLICATION
const prompt = require('prompt-sync')({ sigint: true });
const fs = require("fs");

let dbFilePath = "./database.json";

// Check if database file exists, else initialize it
if (!fs.existsSync(dbFilePath)) {
    fs.writeFileSync(dbFilePath, JSON.stringify([]), "utf-8");
}

let db = fs.readFileSync(dbFilePath, "utf-8");
let blogs = db ? JSON.parse(db) : [];

const lineBreak = '\n✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭\n';
const appTitle = 'Your Blog App';
console.log(`${lineBreak} Welcome to ${appTitle} ${lineBreak}`);

function createPost({title,content,author}){
    // Validating the inputs provided by the user
    const errors = [];
    
    if (!title || title.length < 5 || title.length > 100) {
        errors.push("Title must be between 5 and 100 characters.");
    }
    if (!content || content.length < 10) {
        errors.push("Content must be at least 10 characters long.");
    }
    if (!author || !/^[a-zA-Z\s]+$/.test(author)) {
        errors.push("Author must only contain alphabetic characters and spaces.");
    }

    if (errors.length > 0) {
        console.log(lineBreak);
        console.log("Error(s) creating post:");
        errors.forEach(error => console.log(`- ${error}`));
        console.log(lineBreak);
        return;
    }
    let post={
        "id":generate_id(),
        "title": title,
        "content":content,
        "author":author,
        "createdAt":new Date(),
        "updatedAt":new Date(),
    }
    blogs.push(post)
    console.log(lineBreak);
    console.log(`post with title ${title} is created and saved successfully`);
    console.log(lineBreak)
}

function generate_id() {
    return Math.floor(100 + Math.random() * 900);
}

function viewAllPosts() {
    if (blogs.length === 0) {
        console.log(lineBreak);
        console.log("No posts available!");
        console.log(lineBreak);
        return;
    }
    console.log("\n ✭✭✭✭ Your Blog Posts ✭✭✭✭ ")
    blogs.forEach((post, index) => {
        console.log(`\n${index + 1}. (Title: ${post.title}) (ID: ${post.id})\n`);
    });
}

function viewPostById(id) {
    // let id = parseInt(prompt("Enter the Post ID: "));
    let post = blogs.find(p => p.id === id);
    if (post) {
        console.log(`\nTitle: ${post.title}`);
        console.log(`Content: ${post.content}`);
        console.log(`Author: ${post.author}`);
        console.log(`Created At: ${post.createdAt}`);
        console.log(`Updated At: ${post.updatedAt}\n`);
    } else {
        console.log("\nPost not found!\n");
    }
}

function deletePostById(id) {
    // let id = parseInt(prompt("Enter the Post ID to delete: "));
    let index = blogs.findIndex(p => p.id === id);
    if (index !== -1) {
        blogs.splice(index, 1);
        console.log(`\n Post deleted successfully!\n`);
    } else {
        console.log(`\nPost not found!\n`);
    }
}

function editPostById(id) { 
    // let id = parseInt(prompt("Enter the Post ID: "));
    let post = blogs.find(p => p.id === id);
    let index = blogs.findIndex(p => p.id === id)
    if (post){
        let title = prompt(`Edit the title :`);
        let content = prompt('Edit the content: ');
        let author = prompt('Edit the authors name: ')

        // we only edit the field if a post if provided. 
        if(title){
        post.title=title;
        }
        if (content){
            post.content=content;
        }
        if (author){
            post.author=author;
        }
        post.updatedAt=new Date();
        blogs[index]=post
        console.log(`\n Post Edited successfully!\n`)
    }else {
        console.log(`\nPost not found!\n`);
    }
}

function saveBlog(){
    fs.writeFileSync(dbFilePath, JSON.stringify(blogs), "utf-8");
    console.log(lineBreak);
    console.log(`Thank You For Visiting ${appTitle} Today.`);
    console.log("We hope you enjoyed your time here.");
    console.log(lineBreak);
    userIsDone = true;
}

let userIsDone = false;
while (userIsDone == false) {
    console.log('MAIN MENU');
    console.log('1. Create Post');
    console.log('2. View all Post');
    console.log('3. View a Post');
    console.log('4. Edit a Post');
    console.log('5. Delete a Post');
    console.log('6. Exit');

    console.log('\n');

    let choice = parseInt(prompt('Enter your choice: '));
    if (choice == 1) {
        let title = prompt('Enter the title : ');
        let content = prompt('Enter the content: ');
        let author = prompt('Enter the authors name: ');
        createPost(
           { title,
            content,
            author,
            }
        );
    } else if (choice === 2) {
        viewAllPosts();
    } else if (choice === 3) {
        let id = parseInt(prompt("Enter the Post ID: "));
        viewPostById(id);
    } else if (choice === 4) {
        let id = parseInt(prompt("Enter the Post ID to Edit: "));
        editPostById(id);
    }else if (choice === 5) {
        let id = parseInt(prompt("Enter the Post ID to delete: "));
        deletePostById(id);
    }
        //Exit
    else if (choice === 6) {
        saveBlog()
    } else {
        console.log("Invalid choice! Please try again.\n");
    }
}
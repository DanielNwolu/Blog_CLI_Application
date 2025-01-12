// A SIMPLE BLOG CLI APPLICATION WITH EMOJIS
const prompt = require('prompt-sync')({ sigint: true });
const fs = require("fs");

let dbFilePath = "./database.json";

// Check if database file exists, else initialize it
if (!fs.existsSync(dbFilePath)) {
    fs.writeFileSync(dbFilePath, JSON.stringify([]), "utf-8");
}

let db = fs.readFileSync(dbFilePath, "utf-8");
let blogs = db ? JSON.parse(db) : [];

const appTitle = 'Your Blog App';
console.clear(); // Clears the console to keep it clean and consistent
console.log(`🚀 Welcome to ${appTitle} 🚀\n`);

function createBlog({ title, content, author }) {
    const errors = [];

    if (!title || title.length < 5 || title.length > 100) {
        errors.push("📛 Title must be between 5 and 100 characters.");
    }
    if (!content || content.length < 10) {
        errors.push("📛 Content must be at least 10 characters long.");
    }
    if (!author || !/^[a-zA-Z\s]+$/.test(author)) {
        errors.push("📛 Author must only contain alphabetic characters and spaces.");
    }

    if (errors.length > 0) {
        console.log("\n ⚠️ Error(s) creating blog:");
        errors.forEach(error => console.log(`- ${error}`));
        console.log("\n")
        return;
    }

    const blog = {
        id: generate_id(),
        title,
        content,
        author,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    blogs.push(blog);
    console.log(`\n✅ Blog with title "${title}" was created and saved successfully! 🎉\n`);
}

function generate_id() {
    return Math.floor(100 + Math.random() * 900);
}

function viewAllBlogs() {
    if (blogs.length === 0) {
        console.log("\n🗂️ No Blog available! Start by creating one. 📝\n");
        return;
    }
    console.log("\n✨✨✨ Your Blogs ✨✨✨");
    blogs.forEach((blog, index) => {
        console.log(`\n📖 ${index + 1}. Title: "${blog.title}" (ID: ${blog.id})\n`);
    });
}

function viewBlogById(id) {
    const blog = blogs.find(p => p.id === id);
    if (blog) {
        console.log(`\n📰 Title: ${blog.title}`);
        console.log(`📜 Content: ${blog.content}`);
        console.log(`✍️  Author: ${blog.author}`);
        console.log(`📅 Created At: ${blog.createdAt}`);
        console.log(`🔄 Updated At: ${blog.updatedAt}\n`);
    } else {
        console.log("\n❌ Blog not found! Please try again. 🙁\n");
    }
}

function deleteBlogById(id) {
    const index = blogs.findIndex(p => p.id === id);
    if (index !== -1) {
        blogs.splice(index, 1);
        console.log("\n🗑️  Blog deleted successfully! ✅\n");
    } else {
        console.log("\n❌ Blog not found! Please try again. 🙁\n");
    }
}

function editBlogById(id) {
    const blog = blogs.find(p => p.id === id);
    const index = blogs.findIndex(p => p.id === id);
    if (blog) {
        const title = prompt(`✏️ Edit the title: `);
        const content = prompt('✏️ Edit the content: ');
        const author = prompt('✏️ Edit the author\'s name: ');

        if (title) {
            blog.title = title;
        }
        if (content) {
            blog.content = content;
        }
        if (author) {
            blog.author = author;
        }
        blog.updatedAt = new Date();
        blogs[index] = blog;
        console.log("\n✅ Blog edited successfully! 🎉\n");
    } else {
        console.log("\n❌ Blog not found! Please try again. 🙁\n");
    }
}

function saveBlog() {
    fs.writeFileSync(dbFilePath, JSON.stringify(blogs), "utf-8");
    console.log(`\n🙏 Thank you for using ${appTitle}! See you soon. 🌟`);
    console.log("✨ Have a great day ahead! 😊");
    userIsDone = true;
}

let userIsDone = false;
while (!userIsDone) {
    console.log('🌟 MAIN MENU 🌟');
    console.log('1. 📝 Create a Blog');
    console.log('2. 📖 View All Blogs');
    console.log('3. 🔍 View a Blog');
    console.log('4. ✏️  Edit a Blog');
    console.log('5. 🗑️  Delete a Blog');
    console.log('6. 🚪 Exit');

    const choice = parseInt(prompt('🎯 Enter your choice: '));
    if (choice === 1) {
        const title = prompt('📋 Enter the title: ');
        const content = prompt('🖋️ Enter the content: ');
        const author = prompt('✍️ Enter the author\'s name: ');
        createBlog({ title, content, author });
    } else if (choice === 2) {
        viewAllBlogs();
    } else if (choice === 3) {
        const id = parseInt(prompt("🔍 Enter the Blog ID: "));
        viewBlogById(id);
    } else if (choice === 4) {
        const id = parseInt(prompt("✏️ Enter the Blog ID to Edit: "));
        editBlogById(id);
    } else if (choice === 5) {
        const id = parseInt(prompt("🗑️ Enter the Blog ID to Delete: "));
        deleteBlogById(id);
    } else if (choice === 6) {
        saveBlog();
    } else {
        console.log("❌ Invalid choice! Please try again. 🔄");
    }
}
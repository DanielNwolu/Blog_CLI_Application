//A SIMPLE BLOG CLI APPLICATION
const prompt = require('prompt-sync')({ sigint: true });
const fs = require("fs");

let dbFilePath = "./database.json";
let db = fs.readFileSync(dbFilePath, "utf-8");
let blogs = JSON.parse(db);
console.log(blogs)

const lineBreak = '\n✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭\n';
const author = 'Your Blog App';
console.log(`${lineBreak} Welcome to ${author} ${lineBreak}`)

function createPost({title,content,author,tags=[]}){
    let post={
        "id":generate_id,
        "title": title,
        "content":content,
        "author":author,
        "tags":tags,
        "createdAt":new Date(),
        "updatedAt":new Date(),
    }
    blogs.push(post)
}

function generate_id() {
    return Math.floor(100 + Math.random() * 900);
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
        let tags=prompt('Enter your tags: ');
        createPost(
            title,
            content,
            author,
            tags
        )
        console.log(`post ${title} is created and saved successfully`);
    }

    //Exit
    else if (choice == 6) {
        //Thanks User For Visiting Our Library
        postjson = JSON.stringify(blogs)
        fs.writeFileSync(dbFilePath,postjson,"utf-8")
        console.log(lineBreak);
        console.log(`Thank You For Visiting ${author} Today.`);
        console.log("We hope you enjoyed your time here.");
        console.log(lineBreak);
        userIsDone = true;
    }
}
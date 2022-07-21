import fetch from 'node-fetch'
import mongoose from 'mongoose'

mongoose.connect("mongodb://localhost:27017/PMS")

const postSchema = new mongoose.Schema({
    user_id:{
        type: Number, 
        required: true
    },
    id:{
        type: Number, 
        required: true
    },
    title:{
        type: String, 
        required: true
    },
    description:{
        type: String, 
        required: true
    },
})

const Post =  mongoose.model('Post', postSchema)

async function getPosts() {
    const myPosts = await fetch("https://jsonplaceholder.typicode.com/posts");
    const response = await myPosts.json();

    for(let i = 0; i < response.length; i++){
        const post = new Post ({
            user_id: response[i]['userId'],
            id: response[i]['id'],
            title: response[i]['title'],
            description: response[i]['body'],

        })
        post.save();
    }
}
getPosts();
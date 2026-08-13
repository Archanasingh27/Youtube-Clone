import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import connectDB from "../config/db.js";

import User from "../models/User.js";
import Channel from "../models/Channel.js";
import Video from "../models/Video.js";
import Comment from "../models/Comment.js";

dotenv.config();

// Mock users
const usersData = [
  {
    username: "codeMaster",
    email: "codemaster@gmail.com",
    password: "password123",
  },
  {
    username: "techWorld",
    email: "techworld@gmail.com",
    password: "password123",
  },
  {
    username: "travelVibes",
    email: "travelvibes@gmail.com",
    password: "password123",
  },
  {
    username: "musicZone",
    email: "musiczone@gmail.com",
    password: "password123",
  },
  {
    username: "foodieLife",
    email: "foodie@gmail.com",
    password: "password123",
  },
  {
    username: "dailyLearn",
    email: "dailylearn@gmail.com",
    password: "password123",
  },
  {
    username: "gamingHub",
    email: "gaminghub@gmail.com",
    password: "password123",
  },
  {
    username: "fitnessLife",
    email: "fitnesslife@gmail.com",
    password: "password123",
  },
  {
    username: "movieTalk",
    email: "movietalk@gmail.com",
    password: "password123",
  },
  {
    username: "creativeStudio",
    email: "creativestudio@gmail.com",
    password: "password123",
  },
];

// Mock channel information
const channelData = [
  {
    name: "Code Master",
    description: "Learn web development, JavaScript, React and Node.js.",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    bannerUrl: "https://picsum.photos/1200/300?random=1",
    subscribers: 12500,
  },
  {
    name: "Tech World",
    description: "Technology news, tutorials and programming tips.",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    bannerUrl: "https://picsum.photos/1200/300?random=2",
    subscribers: 8400,
  },
  {
    name: "Travel Vibes",
    description: "Travel guides, beautiful places and travel experiences.",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    bannerUrl: "https://picsum.photos/1200/300?random=3",
    subscribers: 18300,
  },
  {
    name: "Music Zone",
    description: "Music, playlists and entertainment.",
    avatarUrl: "https://i.pravatar.cc/150?img=4",
    bannerUrl: "https://picsum.photos/1200/300?random=4",
    subscribers: 22000,
  },
  {
    name: "Foodie Life",
    description: "Easy recipes, street food and delicious food reviews.",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    bannerUrl: "https://picsum.photos/1200/300?random=5",
    subscribers: 9700,
  },
];

// Mock video information
const videoData = [
  {
    title: "Learn React From Scratch",
    description: "Complete React tutorial for beginners.",
    category: "Programming",
    thumbnailUrl: "https://picsum.photos/640/360?random=10",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    views: 12500,
    likes: 850,
    dislikes: 20,
  },
  {
    title: "JavaScript Complete Tutorial",
    description: "Learn JavaScript concepts step by step.",
    category: "Programming",
    thumbnailUrl: "https://picsum.photos/640/360?random=11",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    views: 8400,
    likes: 620,
    dislikes: 15,
  },
  {
    title: "Node.js REST API Tutorial",
    description: "Build a REST API using Node.js and Express.",
    category: "Programming",
    thumbnailUrl: "https://picsum.photos/640/360?random=12",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    views: 15700,
    likes: 1100,
    dislikes: 25,
  },
  {
    title: "MongoDB For Beginners",
    description: "Learn MongoDB and basic database operations.",
    category: "Programming",
    thumbnailUrl: "https://picsum.photos/640/360?random=13",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    views: 9200,
    likes: 700,
    dislikes: 18,
  },
  {
    title: "Top 10 Places To Visit",
    description: "Beautiful places you should visit at least once.",
    category: "Travel",
    thumbnailUrl: "https://picsum.photos/640/360?random=14",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    views: 25000,
    likes: 1900,
    dislikes: 30,
  },
  {
    title: "My Weekend Travel Vlog",
    description: "A complete travel vlog from my weekend trip.",
    category: "Travel",
    thumbnailUrl: "https://picsum.photos/640/360?random=15",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    views: 13200,
    likes: 980,
    dislikes: 22,
  },
  {
    title: "Beautiful Mountain Views",
    description: "Relaxing views from a beautiful mountain trip.",
    category: "Travel",
    thumbnailUrl: "https://picsum.photos/640/360?random=16",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    views: 31000,
    likes: 2500,
    dislikes: 40,
  },
  {
    title: "Best Coding Playlist",
    description: "Music playlist for productive coding sessions.",
    category: "Music",
    thumbnailUrl: "https://picsum.photos/640/360?random=17",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    views: 7600,
    likes: 520,
    dislikes: 12,
  },
  {
    title: "Relaxing Music For Study",
    description: "Relaxing background music for studying.",
    category: "Music",
    thumbnailUrl: "https://picsum.photos/640/360?random=18",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    views: 45000,
    likes: 3200,
    dislikes: 55,
  },
  {
    title: "Easy Pasta Recipe",
    description: "Make delicious pasta at home with simple ingredients.",
    category: "Food",
    thumbnailUrl: "https://picsum.photos/640/360?random=19",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    views: 18500,
    likes: 1400,
    dislikes: 28,
  },
  {
    title: "Street Food Tour",
    description: "Exploring some of the best street food.",
    category: "Food",
    thumbnailUrl: "https://picsum.photos/640/360?random=20",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    views: 27000,
    likes: 2100,
    dislikes: 35,
  },
  {
    title: "Healthy Breakfast Ideas",
    description: "Quick and healthy breakfast ideas.",
    category: "Food",
    thumbnailUrl: "https://picsum.photos/640/360?random=21",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    views: 11200,
    likes: 830,
    dislikes: 16,
  },
  {
    title: "React Hooks Explained",
    description: "Understand useState and useEffect easily.",
    category: "Programming",
    thumbnailUrl: "https://picsum.photos/640/360?random=22",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    views: 22100,
    likes: 1800,
    dislikes: 32,
  },
  {
    title: "Express Middleware Explained",
    description: "Learn how middleware works in Express.",
    category: "Programming",
    thumbnailUrl: "https://picsum.photos/640/360?random=23",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    views: 6800,
    likes: 480,
    dislikes: 10,
  },
  {
    title: "Best Beaches In India",
    description: "Beautiful beaches that are perfect for your next trip.",
    category: "Travel",
    thumbnailUrl: "https://picsum.photos/640/360?random=24",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    views: 19800,
    likes: 1500,
    dislikes: 27,
  },
  {
    title: "Morning Workout Routine",
    description: "A simple workout routine for a healthy morning.",
    category: "Fitness",
    thumbnailUrl: "https://picsum.photos/640/360?random=25",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    views: 9300,
    likes: 650,
    dislikes: 14,
  },
  {
    title: "Beginner Home Workout",
    description: "Easy exercises you can do at home.",
    category: "Fitness",
    thumbnailUrl: "https://picsum.photos/640/360?random=26",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    views: 14600,
    likes: 1100,
    dislikes: 20,
  },
  {
    title: "Gaming Setup Tour",
    description: "Check out my gaming setup.",
    category: "Gaming",
    thumbnailUrl: "https://picsum.photos/640/360?random=27",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    views: 28600,
    likes: 2200,
    dislikes: 40,
  },
  {
    title: "Best Games Of The Year",
    description: "My favorite games from this year.",
    category: "Gaming",
    thumbnailUrl: "https://picsum.photos/640/360?random=28",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    views: 17500,
    likes: 1300,
    dislikes: 25,
  },
  {
    title: "How To Build A Portfolio",
    description: "Create a professional developer portfolio.",
    category: "Programming",
    thumbnailUrl: "https://picsum.photos/640/360?random=29",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    views: 10200,
    likes: 760,
    dislikes: 17,
  },
];

const seedData = async () => {
  try {
    await connectDB();

    console.log("Connected to database.");

    // Clear old seed data
    await Comment.deleteMany({});
    await Video.deleteMany({});
    await Channel.deleteMany({});
    await User.deleteMany({});

    console.log("Old data cleared.");

    // Hash passwords
    const hashedPassword = await bcrypt.hash("password123", 10);

    const users = await User.insertMany(
      usersData.map((user) => ({
        ...user,
        password: hashedPassword,
      }))
    );

    console.log(`${users.length} users created.`);

    // Create channels for first 5 users
    const channels = await Channel.insertMany(
      channelData.map((channel, index) => ({
        ...channel,
        owner: users[index]._id,
      }))
    );

    console.log(`${channels.length} channels created.`);

    // Update users with their channel IDs
    for (let i = 0; i < channels.length; i++) {
      users[i].channel = channels[i]._id;
      await users[i].save();
    }

    // Create videos
    const videos = await Video.insertMany(
      videoData.map((video, index) => {
        const channelIndex = index % channels.length;

        return {
          ...video,
          channel: channels[channelIndex]._id,
          uploader: users[channelIndex]._id,
        };
      })
    );

    console.log(`${videos.length} videos created.`);

    // Create comments
    const commentsData = [
      "This video was really helpful!",
      "Great explanation. Thanks!",
      "I learned a lot from this.",
      "Very useful tutorial.",
      "Amazing content!",
      "This is exactly what I was looking for.",
      "Can you make more videos like this?",
      "Really enjoyed watching this.",
      "Very clearly explained.",
      "Keep making great content!",
    ];

    const comments = [];

    for (let i = 0; i < 40; i++) {
      comments.push({
        text: commentsData[i % commentsData.length],
        user: users[i % users.length]._id,
        video: videos[i % videos.length]._id,
      });
    }

    await Comment.insertMany(comments);

    console.log(`${comments.length} comments created.`);

    console.log("Seed data inserted successfully.");

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedData();
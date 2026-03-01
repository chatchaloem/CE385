import express from 'express';
import {prisma} from '../lib/prisma';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get('/' , (req, res) => {
    res.send('Hello from Prisma API!');
});

app.post('/user', async (req, res) => {
    const { name, email } = req.body;
    try {
        const user = await prisma.user.create({
            data: {name, email},
        });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to ceate user'});
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/users/email/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get user' });
    }
});

app.delete('/posts/:id', async (req, res) => {
    const postId = req.params.id;

    try {
        await prisma.post.delete({
            where: { postId }
        });

        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(404).json({ error: 'Post not found' });
    }
});

app.post('/posts', async (req, res) => {
    const { title, content, authorId } = req.body;

    try {
        const post = await prisma.post.create({
            data: { title, content, authorId }
        });

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create post' });
    }
});

app.get('/posts', async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: { author: true }
        });

        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get posts' });
    }
});

app.get('/posts/:id', async (req, res) => {
    const postId = req.params.id;   // ✅ ไม่ต้อง Number()

    try {
        const post = await prisma.post.findUnique({
            where: { postId },      // ✅ ใช้ชื่อ field ให้ตรง schema
            include: { author: true }
        });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get post' });
    }
});

app.put('/posts/:id', async (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;

    try {
        const updatedPost = await prisma.post.update({
            where: { postId },
            data: { title, content }
        });

        res.json(updatedPost);
    } catch (error) {
        res.status(404).json({ error: 'Post not found' });
    }
});

app.delete('/posts/:id', async (req, res) => {
    const postId = req.params.id;   // ✅ UUID เป็น string

    try {
        await prisma.post.delete({
            where: { postId }       // ✅ ใช้ชื่อ field ให้ตรง schema
        });

        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(404).json({ error: 'Post not found' });
    }
});
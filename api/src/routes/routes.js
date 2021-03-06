import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pg from 'pg';

const pool = new pg.Pool();

// I use this function to simulate network calls
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function authenticateJwtToken(request, response, next) {
    const jwtToken = request.get('Authorization')?.split(' ')[1];

    if (!jwtToken) {
        return response.sendStatus(401);
    }

    try {
        const user = jwt.verify(jwtToken, process.env.JWT_SECRET);
        request.user = user;

        next();
    } catch (error) {
        response.sendStatus(403);
    }
}

async function preCheckPost(request, response, next) {
    try {
        const { postId } = request.params;

        const [post] = (await pool.query('SELECT * FROM posts WHERE id = $1', [postId])).rows;

        if (!post) {
            return response.sendStatus(204);
        }

        const { userId } = request.user;

        if (userId !== post.userId) {
            return response.sendStatus(400);
        }

        next();
    } catch (error) {
        response.sendStatus(500);
    }
}

function setGetRoutes(app) {
    app.get('/posts', authenticateJwtToken, async (request, response) => {
        await wait(2000);

        try {
            const { userId } = request.user;
            const result = await pool.query('SELECT * FROM posts WHERE "userId" = $1 ORDER BY "creationDate" DESC', [userId]);

            response.json({ posts: result.rows });
        } catch (error) {
            response.sendStatus(500);
        }
    });
}

function setPostRoutes(app) {
    app.post('/login', async (request, response) => {
        await wait(2000);

        try {
            const { username, password } = request.body;
            const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
            const [user] = result.rows;

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return response.sendStatus(400);
            }

            const payload = { userId: user.id, username: user.username };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

            response.json({ jwtToken: token });
        } catch (error) {
            response.sendStatus(500);
        }
    });

    app.post('/posts', authenticateJwtToken, async (request, response) => {
        await wait(2000);

        try {
            const { title, content } = request.body;

            if (!title || !content) {
                return response.sendStatus(400);
            }

            const { userId } = request.user;
            const result = await pool.query('INSERT INTO posts(title, content, "creationDate", "userId") VALUES ($1, $2, $3, $4) RETURNING *',
                [title, content, new Date(), userId]);

            response.status(201).json({ post: result.rows[0] });
        } catch (error) {
            response.sendStatus(500);
        }
    });
}

function setDeleteRoutes(app) {
    app.delete('/posts/:postId', authenticateJwtToken, preCheckPost, async (request, response) => {
        await wait(2000);

        try {
            const { postId } = request.params;

            await pool.query('DELETE FROM posts WHERE id = $1', [postId]);

            response.sendStatus(204);
        } catch (error) {
            response.sendStatus(500);
        }
    });
}

function setPutRoutes(app) {
    app.put('/posts/:postId', authenticateJwtToken, preCheckPost, async (request, response) => {
        await wait(2000);

        try {
            const { title, content } = request.body;

            if (!title || !content) {
                return response.sendStatus(400);
            }

            const { postId } = request.params;

            const result = await pool.query('UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *', [title, content, postId]);

            response.json({ post: result.rows[0] });
        } catch (error) {
            response.sendStatus(500);
        }
    });
}

function setRoutes(app) {
    setGetRoutes(app);
    setPostRoutes(app);
    setDeleteRoutes(app);
    setPutRoutes(app);
}

export default setRoutes;

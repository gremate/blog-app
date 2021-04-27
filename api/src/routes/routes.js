import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pg from 'pg';

const pool = new pg.Pool();

function setGetRoutes(app) {

}

function setPostRoutes(app) {
    app.post('/login', async (request, response) => {
        const { username, password } = request.body;

        try {
            const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
            const [user] = result.rows;

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return response.sendStatus(400);
            }

            const payload = { username: user.username };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

            response.json({ jwtToken: token });
        } catch (error) {
            response.sendStatus(500);
        }
    });
}

function setRoutes(app) {
    setGetRoutes(app);
    setPostRoutes(app);
}

export default setRoutes;

import jwt from 'jsonwebtoken';

const default_user = {
    id: 1,
    email: "usuario@email.com",
    password: "makpo",
};

export const login = (req, res) => {
    const { email, password } = req.body;

    const user = { id: 1};

    if (email === default_user.email && password === default_user.password) {
        const payload = { email };
        const expiration = { expiresIn: "1h" };

        const token = jwt.sign(payload, process.env.JWT_SECRET, expiration);

        return res.json({ token });
    } else {
        return res.status(401).json({ error: "Credenciales inválidas" });
    }
}


const bcrypt = require('bcryptjs')

module.exports = {
    register: async(req,res) => {
        const {username,password} = req.body;
        db = req.app.get('db');
        console.log(req.body);
        const foundUser = await db.check_user({username});
        if(foundUser[0]){
            return res.status(400).send(`Username already exists`);
        }

        let salt = bcrypt.genSaltSync(10),
            hash = bcrypt.hashSync(password, salt);
        let profilePic = 'https://sbly-web-prod-shareably.netdna-ssl.com/wp-content/uploads/2019/02/25153627/https://www.recoveryranch.com/wp-content/uploads/2020/03/Horse.jpg.jpg.webp'

        const newUser = await db.register_user({username,hash,profilePic})
        req.session.user = newUser[0];
        res.status(201).send(req.session.user);
    },
    login: async(req,res) => {
        const {username, password} = req.body,
        db = req.app.get('db');

        const foundUser = await db.check_user({username});
        if(!foundUser[0]){
            return res.status(400).send(`Username not found`);
        }

        const authenticated = bcrypt.compareSync(password,foundUser[0].password);
        if(!authenticated) {
            return res.status(401).send(`Password is incorrect`);
        }

        delete foundUser[0].password;
        req.session.user = foundUser[0];
        res.status(200).send(req.session.user);
    },
    logout: (req,res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    getAllPosts: (req,res) => {
        const db = req.app.get('db');

        db.get_posts()
        .then( posts => res.status(200).send(posts))
        .catch(err => res.status(500).send(err))
    },
    getSinglePost: (req,res) => {
        const {postid} = req.params;
        db = req.app.get('db')

        db.get_single_post({postid})
        .then(post => res.status(200).send(post))
        .catch(err => console.log(err))
    },
    addPost: (req,res) => {
        const {title,img,content,id} = req.body;
        db = req.app.get('db');
        console.log(req.body);

        db.add_post({title,img,content,id})
        .then(post => res.status(200).send(post))
        .catch(err => console.log(err))
    }
}
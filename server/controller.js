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
        let profilePic = 'https://robohash.org/?set=set4'

        const newUser = await db.register_user({username,hash,profilePic})
        req.session.user = newUser[0];
        //console.log(newUser);
        //so when refresh page doesn't make them login
        // req.session.userid = newUser[0].id;
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
        //so when refresh page doesn't make them login
        // req.session.userid = foundUser[0].id;
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
    },
    deletePost: (req,res) => {
        console.log(req.params);
        const {postid} = req.params;
        const db = req.app.get('db');
        db.delete_post({postid})
        .then(posts => res.status(200).send(posts))
        .catch(err => console.log(err))
    },
    getSession: (req,res) => {
        if(req.session.user){
            res.status(200).send(req.session.user);
        } else{
            res.sendStatus(200);
        }
    }

}
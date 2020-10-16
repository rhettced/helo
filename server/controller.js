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
        let profilePic = 'data:image/jpeg;base64,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'

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
    logout: async(req,res) => {
        await req.session.destroy();
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
        console.log(req.params);
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
    },
    getFilteredPosts: async(req,res) => {
        const {search, userposts} = req.query;
        const {id} = req.params;
        //console.log(req.query);
        const db = req.app.get('db');
        const sqlSearch = `%${search}%`;
        //console.log(userposts);
        if(userposts === 'false'){
            let results= await db.filtered_post_wparam({sqlSearch,id});
            res.status(200).send(results);
        } else {
            let results = await db.filtered_posts({sqlSearch});
            //console.log(results);
            res.status(200).send(results);
        }
        
        
        
     

        // db.filtered_posts({ search, })
    }

}
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
console.log("Before DB Connect");
mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE);
console.log("After DB Connect");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());



//**********************************************************/
//*----------------------MODELS----------------------------*/
//**********************************************************/

const { User } = require('./models/user');
const { Brand } = require('./models/brand');
const { Wood } = require('./models/wood');
const { Product } = require('./models/product');

//**********************************************************/
//*--------------------MIDDLEWARE--------------------------*/
//**********************************************************/

const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');



//**********************************************************/
//*----------------------USERS-----------------------------*/
//**********************************************************/

//***********************AUTH*******************************/

app.get('/api/users/auth',auth,(req,resp) => {

    resp.status(200).json({
        isAdmin : req.user.role === 0 ? false : true,
        isAuth : true,
        email : req.user.email,
        name : req.user.name,
        lastname : req.user.lastname,
        role : req.user.role,
        cart : req.user.cart,
        history : req.user.history
    })

})

//**********************REGISTER****************************/

app.post('/api/users/register',(req,res) => {
    const user = new User(req.body);
    user.save((err,doc) => {
        if (err) {
            console.log(err);
            return res.json({success:false,err})
        } 

        res.status(200).json({
            success:true
        });
    })
    
})

//************************LOGIN****************************/
app.post('/api/users/login',(req,res) => {

    User.findOne({'email':req.body.email},(err,user) => {
        if(!user) return res.json({loginSuccess:false,message:'Auth Failed, Email not Found!'});

        user.authenticate(req.body.password,(err,matched) => {
            if(!matched) {
                return res.json({loginSuccess:false,message:'Password Authentication Failed!'});
            }

            user.generateToken((err,user) => {
                if(err) return res.status(400).send(err);

                res.cookie('x_auth',user.token).status(200).json({
                    loginSuccess:true
                })
            })


        })
    })

})

//**********************LOG OUT*****************************/


app.get('/api/users/logout',auth,(req,resp) => {
    User.findOneAndUpdate({_id: req.user._id},{token: ''},(err,doc) => {
        if (err) return resp.json({ success:false, err });

        return resp.status(200).json({success:true})
    })
})


//**********************************************************/
//*----------------------END OF USERS----------------------*/
//**********************************************************/


//**********************************************************/
//*----------------------BRAND-----------------------------*/
//**********************************************************/

app.post('/api/product/brand',auth,admin,(req,resp) => {

    const brand = new Brand(req.body);

    brand.save((err,doc) => {
        if (err) return resp.json({success:false,err});

        return resp.status(200).json({
            success:true,
            brand : doc
        })
    })
})

app.get('/api/product/list_brands',auth,(req,resp) => {
    Brand.find({},(err,brands) => {
        if(err) return resp.status(400).send(err);

        return resp.status(200).send(brands)
    });
})

//**********************************************************/
//*----------------------END OF BRAND----------------------*/
//**********************************************************/

//**********************************************************/
//*----------------------WOODS-----------------------------*/
//**********************************************************/

app.post('/api/product/wood',auth,admin,(req,res) => {

    const wood = new Wood(req.body);

    wood.save((err,doc) => {
        if(err) return res.json({success:false,err});

        return res.status(200).send(wood);

    })
})

app.get('/api/product/list_woods',auth,(req,resp) => {
    Wood.find({},(err,woods) => {
        if(err) return resp.status(400).send(err);

        return resp.status(200).send(woods)
    });
})


//**********************************************************/
//*----------------------END OF WOODS----------------------*/
//**********************************************************/

//**********************************************************/
//*----------------------PRODUCTS--------------------------*/
//**********************************************************/

app.post('/api/product/article',auth,admin,(req,res) => {
    const product = new Product(req.body);

    product.save((err,doc) => {
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            article:doc
        })
    })
})

app.get('/api/product/article_by_id',(req,resp) => {
    let type = req.query.type;
    let items = req.query.id;

    if (type === 'array') {
        let ids = req.query.id.split(",");
        items = [];
        items = ids.map(item => {
            return mongoose.Types.ObjectId(item)
        })
    }
    //Can take single item or array : see 84
    Product.find({'_id':{$in:items}})
    .populate('brand')
    .populate('wood').exec((err,docs) => {
        
        return resp.status(200).send(docs);
    })

    //LIST BY ARRIVAL
    //api/products/articles?sortBy=createdAt&order=desc&limit=4&skip=2

    app.get('/api/products',(req,resp) => {
        let order = req.query.order ? req.query.order : 'asc';
        let sortBy = req.query.sortBy ? req.query.sortBy :'_id';

        let limit = req.query.limit ? req.query.limit : 5;
        let skip = req.query.limit ? req.query.skip : 0;

        Product.find()
        .populate('brand')
        .populate('wood')
        .sort([[sortBy,order]])
        .limit(limit)
        .skip(skip)
        .exec((err,articles) => {
            if(err) return resp.status(400).send(err);
            resp.send(articles)
        })



    })

    //LIMIT BY SELL
    //api/product/articles?sortBy=sold&order=desc&limit=4

}) 
//**********************************************************/
//*----------------------END OF PRODUCTS-------------------*/
//**********************************************************/

const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Server started up on : ${port}`) 
})
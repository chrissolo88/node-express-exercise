const { application } = require('express');
const express = require('express');
const ExpressError = require('./expressError')
const {convertToNumbers,writeToJson,mean,median,mode} = require('./operations')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req,res,next)=>{
    console.log("the server got a request")
    next();
})

app.get('/mean',(req,res,next)=>{
    try{
        if (!req.query.nums) throw new ExpressError("No numbers were provided",400)
        const nums = convertToNumbers(req.query.nums.split(','))
        if (nums==='error') throw new ExpressError("an input you entered is Not A Number",400)
        if(req.query.save === 'true') writeToJson({response:{operation:'mean', value: mean(nums)}})
        return res.status(200).json({response:{operation:'mean', value: mean(nums)}})
    } catch(e){
        next(e)
    }
})

app.get('/median',(req,res,next)=>{
    try{
        if (!req.query.nums) throw new ExpressError("No numbers were provided",400)
        const nums = convertToNumbers(req.query.nums.split(','))
        if (nums==='error') throw new ExpressError("an input you entered is Not A Number",400)
        if(req.query.save === 'true') writeToJson({response:{operation:'median', value: median(nums)}})
        return res.status(200).json({response:{operation:'median', value: median(nums)}})
    } catch(e){
        next(e)
    }
})

app.get('/mode',(req,res,next)=>{
    try{
        if (!req.query.nums) throw new ExpressError("No numbers were provided",400)
        const nums = convertToNumbers(req.query.nums.split(','))
        if (nums==='error') throw new ExpressError("an input you entered is Not A Number",400)
        if(req.query.save === 'true') writeToJson({response:{operation:'median', value: mode(nums)}})
        return res.status(200).json({response:{operation:'median', value: mode(nums)}})
    } catch(e){
        next(e)
    }
})

app.get('/all',(req,res,next)=>{
    try{
        if (!req.query.nums) throw new ExpressError("No numbers were provided",400)
        const nums = convertToNumbers(req.query.nums.split(','))
        if (nums==='error') throw new ExpressError("an input you entered is Not A Number",400)
        if(req.query.save === 'true') writeToJson({response:{operation:'all', mean: mean(nums), median: median(nums), mode: mode(nums)}})
        return res.status(200).json({response:{operation:'all', mean: mean(nums), median: median(nums), mode: mode(nums)}})
    } catch(e){
        next(e)
    }
})

// Page not found Response
app.use((req,res,next)=>{
    const e = new ExpressError("Page Not Found",404)
    next(e)
})

// Error Handler
app.use((error,req,res,next)=>{
    let status = error.status || 500;
    let msg = error.msg || "Unknown Error"
    return res.status(status).json({error:{msg, status}});
})

app.listen(3000, () =>{
    console.log('App on port 3000');
})
const bcrypt = require('bcryptjs');
const jwt =  require('jsonwebtoken');

const users = [];

// Register a new user
function registerUser(req, res){
    const {username, password } = req.body;
    // check if the user already exist 
    const existingUser = users.find(user => user.username === username);
    if(existingUser){
        return res.status(400).json({message: 'User already exists'});
    }
// Hash the password
    const hashedPassword = bcrypt.hashSync(password,10);

    // Create a new user object
    const newUser = {
        id: users.length + 1,
        username,
        password: hashedPassword,
        role: 'attendee'   // Default role
    };

    // Add the user to the array
    users.push(newUser);

    // Create a JWT token
     const token = jwt.sign({id: newUser.id, username:newUser.username}, 'secret', { expiresIn: '1h' });

     // Send an email (dummy response)
     sendRegistrationEmail(username);
     return res.status(201).json({message: 'User registered successfully', token});
}

function sendRegistrationEmail(username){
    console.log(`Email sent to ${username}`)
}



//Log in a user

function loginUser(req,res){
   const {username,password} = req.body;
   // Find the user by usernaame

   const user = users.find(user => user.username === username);
   if(!user){
    return res.status(400).json({message:'Invalid username or password'});
   }
   //check if the password is correct
   const isPasswordValid = bcrypt.compareSync(password,user.password);
   if(!isPasswordValid){
    return res.status(400).json({message:'Invalid username or password'});
   }

   // Create a JWT token
   const token = jwt.sign({id: user.id,username:user.username},'secret',{expiresIn:'1h'});
   return res.status(200).json({message:'Login successful', token});
}
  

function authenticateUser(req, res, next){
    const token = req.headers['authorization'];
    if(!token){
        return res.status(401).json({message: 'No token provided'})
    }
    jwt.verify(token, 'secret', (err,decoded) =>{
        if(err){
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        req.userId = decoded.id;
        next();
    });


}

module.exports = { registerUser , loginUser,authenticateUser};
const db = require('./db')

let currentUser;
let accountDetails = {
    1000: { acno: 1000, username: "userone", password: "userone", balance: 50000 },
    1001: { acno: 1001, username: "usertwo", password: "usertwo", balance: 5000 },
    1002: { acno: 1002, username: "userthree", password: "userthree", balance: 10000 },
    1003: { acno: 1003, username: "userfour", password: "userfour", balance: 6000 }
}


const register = (uname, acno, pswd) => {

    return db.User.findOne({acno})
        .then(user => {
            if (user) {
                return {
                    statusCode: 422,
                    status: false,
                    message: "User Exists... Please Login"
                }
            }
            else {
                const newUser = new db.User({
                    acno,
                    username: uname,
                    password: pswd,
                    balance: 0
                })
                newUser.save();
                return {
                    statusCode: 200,
                    status: true,
                    message: "Sucessfully Registered"
                }
            }
        })

    // let users = accountDetails;
    // if (acno in users) {
    //     return {
    //         statusCode: 422,
    //         status: false,
    //         message: "User Exists... Please Login"
    //     }
    // }
    // else {
    //     users[acno] = { acno, username: uname, password: pswd, balance: 0 }
    //     return {
    //         statusCode: 200,
    //         status: true,
    //         message: "Sucessfully Registered"
    //     }
    // }
}


const login = (req, acno, password) => {

    var acno = parseInt(acno);
    return db.User.findOne({acno,password})
    .then(user=>{
        
        if (user) {
            req.session.currentUser = user.acno;
            return {
                statusCode: 200,
                status: true,
                message: "Sucessfully Login",
                name: user.username,
                acno: user.acno
            }            
        }
        else {
            return {
                statusCode: 422,
                status: false,
                message: "Invalid Credentials"
            }
        }

    })

    // let users = accountDetails;
    // if (acno in users) {
    //     if (pswd == users[acno]["password"]) {
    //         req.session.currentUser = users[acno]
    //         return {
    //             statusCode: 200,
    //             status: true,
    //             message: "Sucessfully Login"
    //         }
    //     }
    //     else {
    //         return {
    //             statusCode: 422,
    //             status: false,
    //             message: "Incorrect Password"
    //         }
    //     }
    // }
    // else {
    //     return {
    //         statusCode: 422,
    //         status: false,
    //         message: "Invalid Account"
    //     }
    // }
}



const deposit = (acno, password, amt) => {

    var amount = parseInt(amt);

    return db.User.findOne({acno,password})
    .then(user=>{
        
        if (!user) {
            return {
                statusCode: 422,
                status: false,
                message: "Invalid Credentials"
            }            
        }
        user.balance+=amount;
        user.save();
        return {
            statusCode: 200,
            status: true,
            balance: user.balance,
            message: amount + " is credited and the new balance is " + user.balance
        }
    })


    // let user = accountDetails;
    // if (acno in user) {
    //     if (pswd == user[acno]["password"]) {

    //         user[acno]["balance"] += amount;
    //         return {
    //             statusCode: 200,
    //             status: true,
    //             balance: user[acno]["balance"],
    //             message: amount + " is credited and the new balance is " + user[acno]["balance"]
    //         }
    //     }
    //     else {
    //         return {
    //             statusCode: 422,
    //             status: false,
    //             message: "Incorrect Password"
    //         }
    //     }
    // }
    // else {
    //     return {
    //         statusCode: 422,
    //         status: false,
    //         message: "Invalid Account"
    //     }
    // }
}


const withdrawal = (req, acno, password, amt) => {

    var amount = parseInt(amt);

    return db.User.findOne({acno,password})
    .then(user=>{
        
        if (!user) {
            return {
                statusCode: 422,
                status: false,
                message: "Invalid Credentials"
            }            
        }

        if(req.session.currentUser != acno){
            return {
                statusCode: 422,
                status: false,
                message: "Permission Denied"
            }    
        }


        if(user.balance<amount){
            return {
                statusCode: 422,
                status: false,
                message: "Insufficient balance"
            }
        }
        user.balance-=amount;
        user.save();
        return {
            statusCode: 200,
            status: true,
            balance: user.balance,
            message: amount + " is credited and the new balance is " + user.balance
        }
    })


    // let user = accountDetails;
    // if (acno in user) {
    //     if (pswd == user[acno]["password"]) {

    //         if (user[acno]["balance"] > amount) {
    //             user[acno]["balance"] -= amount;
    //             return {
    //                 statusCode: 200,
    //                 status: true,
    //                 balance: user[acno]["balance"],
    //                 message: amount + " is debited and the new balance is " + user[acno]["balance"]
    //             }
    //         }
    //         else {
    //             return {
    //                 statusCode: 422,
    //                 status: false,
    //                 message: "Insufficient balance"
    //             }
    //         }
    //     }
    //     else {
    //         return {
    //             statusCode: 422,
    //             status: false,
    //             message: "Incorrect Password"
    //         }
    //     }
    // }
    // else {
    //     return {
    //         statusCode: 422,
    //         status: false,
    //         message: "invalid Account"
    //     }
    // }

}


const deleteAccDetails=(acno)=>{
    return db.User.deleteOne({
        acno:acno
    }).then(user=>{
        
        if (!user) {
            return {
                statusCode: 422,
                status: false,
                message: "Operation Failed"
            }            
        }
        return {
            statusCode: 200,
            status: true,
            message: "Account number "+acno +" deleted successfully",
        }   

    })
}




module.exports = {
    register,
    login,
    deposit,
    withdrawal,
    deleteAccDetails
    
}
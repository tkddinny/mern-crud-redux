import jwt from 'jsonwebtoken'

const userToken = (user) =>{
  const payload = {
    id : user._id,
    email: user.email
  }

  const token = jwt.sign(payload, process.env.SECRET_KEY)
  return token;
}

export default userToken;
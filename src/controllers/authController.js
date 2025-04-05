import {
  createUser,
  getUserByEmail,
  getUserById,
} from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateAccessAndRefreshToken } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { makeNullRefreshToken } from "../models/userModel.js";

export const register = async (req, res) => {
  
  try {
    const { name, email, password, role } = req.body;

    //validation
    if ((!name || !email || !password, !role)) {
      console.log(name);
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userAlreadyExist = await getUserByEmail(email);
    if (userAlreadyExist) {
      return res
        .status(400)
        .json({ success: false, message: "user already registered!" });
    }

    const result = await createUser(name, email, password, role);

    if (!result) {
      return res
        .status(500)
        .json({ success: fslse, message: "somthing wrong while registring" });
    }
    delete result.password;
    console.log(result);
    res
      .status(201)
      .json({ success: true, message: "registration succesfull", result });
  } catch (error) {
    console.error("registration error", error);
    return res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

export const login = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "invalid credentials" });
    }

    const [accessToken, refreshToken] = await generateAccessAndRefreshToken(
      user.id,
      user.role
    );

    // console.log("accesss token in authControl", value);

    delete user.password;
    //setting tokens in cookies
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ success: true, message: "login successfull", user});
  } catch (error) {
    console.error("login error", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken = req.cookies?.refreshToken;
    if (!incomingRefreshToken) {
      throw new Error("Unauthorized for refresh token");
    }
    //decode tokkekn
    console.log("backend refresh token");
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    console.log("refresh token", incomingRefreshToken);

    const user = await getUserById(decodedToken.id);
    console.log("user",user);
    if (incomingRefreshToken != user.refrestoken) {
      throw new Error("refresh token expired");
    }

    const [accessToken, refreshToken] = await generateAccessAndRefreshToken(user.id, user.role);

    const options = {
      httpOnly:true,
      secure:true
    }

    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json({success:true, message:"token refreshed!"});

  } catch (error) {
    return res
      .status(401)
      .json({
        success: false,
        message: error.message || "invalid refresh Token",
      });
  }
};


export const logoutUser =async (req, res)=>{

try {
  await makeNullRefreshToken(req.user.id);
  
  const options = {
    httpOnly:true,
    secure:true
  }

res.status(200)
.clearCookie("accessToken",options)
.clearCookie("refreshToken", options)
.json({success:true, message:"user logged out"});
  
} catch (error) {
  return res.status(500).json({success:false, message:"internal server error"});
}

}
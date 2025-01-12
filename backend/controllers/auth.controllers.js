import User from '../models/users.models.js'
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/generateToken.js'
import mongoose from 'mongoose'
import { sendVerificationEmail } from '../mailtrap/emails.js'

export const signup = async (req, res) => {
    try {
        const { username, password, email, role } = req.body
        console.log("Received signup request:", { username, email });

        // check if username or password is empty
        if (!username || !password || !email) {
            return res.status(400).json({ success: false, message: "Hãy điền đủ trường thông tintin" })
        }

        // check if user already exists
        const existingUser = await User.findOne({ username: username })
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User đã tồn tại trước đóđó" })
        }

        // check password length
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password tối thiểu 6 ký tựtự" })
        }

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // check email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Sai định dạng emailemail" })
        }

        // role 
        const userRole = role || "user"

        const verificationToken = Math.random().toString(36).substring(2, 8).toUpperCase();
        console.log("Generated token:", verificationToken);

        const newUser = new User({ username, password: hashedPassword, email, role: userRole, verificationToken, isVerified: false })
      
        if (newUser) {
            // Lưu user trước
            await newUser.save();
            console.log("User saved:", newUser);

            try {
                // Gửi email xác thực
                const emailResponse = await sendVerificationEmail(email, verificationToken);
                console.log("Email sent:", emailResponse);
                
                // Trả về response thành công
                res.status(201).json({ 
                    success: true,
                    message: "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.",
                    user: {
                        _id: newUser._id,
                        username: newUser.username,
                        email: newUser.email,
                        role: newUser.role,
                        isVerified: newUser.isVerified
                    }
                });
            } catch (emailError) {
                console.error("Email sending error:", emailError);
                // Nếu gửi email thất bại, vẫn tạo user nhưng thông báo lỗi gửi email
                console.error("Error sending verification email:", emailError);
                res.status(201).json({
                    success: true,
                    message: "Đăng ký thành công nhưng không thể gửi email xác thực. Vui lòng liên hệ admin.",
                    user: {
                        _id: newUser._id,
                        username: newUser.username,
                        email: newUser.email,
                        role: newUser.role,
                        isVerified: newUser.isVerified
                    }
                });
            }
        }
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(400).json({ 
                success: false, 
                message: "Sai tên đăng nhập hoặc mật khẩu" 
            });
        }

        // Kiểm tra xác thực email
        if (!user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng xác thực email trước khi đăng nhập"
            });
        }

        const token = await generateTokenAndSetCookie(user._id, res);
        
        res.status(200).json({ 
            success: true,
            token: token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                favorites: user.favorites,
                isVerified: user.isVerified
            }
        });
    } catch (error) {
        console.log("Login error:", error);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt")
        res.status(200).json({ success: true, message: "Logout Thành Công" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Lỗi Server" })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); 
        res.status(200).json({ success: true, data: users }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Updating user with ID:', id);
        console.log('Request body:', req.body);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ success: false, message: "No such user" });
        }

        // Tìm user hiện tại để kiểm tra
        const currentUser = await User.findById(id);
        if (!currentUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Update user với dữ liệu mới
        const updatedUser = await User.findByIdAndUpdate(
            id, 
            { ...req.body }, 
            { new: true }
        ).select('-password'); // Không trả về password

        res.status(200).json({ 
            success: true, 
            data: updatedUser 
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const { email, token } = req.body;

        // Tìm user với email và token tương ứng
        const user = await User.findOne({ 
            email, 
            verificationToken: token
        });

        if (!user) {
            return res.status(400).json({ 
                success: false, 
                message: "Token không hợp lệ hoặc đã hết hạn" 
            });
        }

        // Cập nhật trạng thái xác thực
        user.isVerified = true;
        user.verificationToken = undefined; // Xóa token sau khi xác thực
        await user.save();

        res.status(200).json({ 
            success: true, 
            message: "Email đã được xác thực thành công"
        });
    } catch (error) {
        console.error("Email verification error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Lỗi trong quá trình xác thực email" 
        });
    }
};